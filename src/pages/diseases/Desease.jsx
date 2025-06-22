/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState, useEffect, Suspense } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import './Desease.css';
import useModelStore from '../stores/useModelStore';

function Desease({ desease, tabs, Definitions }) {
    const [key, setKey] = useState('definition');
    const setKeyPressed = useModelStore((state) => state.setKeyPressed);

    const preloadTab = (tab) => {
        const component = Definitions[tab];
        if (component) component.preload?.();
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            setKeyPressed(event.key.toUpperCase(), true);
        };

        const handleKeyUp = (event) => {
            setKeyPressed(event.key.toUpperCase(), false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [setKeyPressed]);

    return (
        <Container fluid className="desease-container px-0">
            <Row className="g-0">
                <Col>
                    <section className="desease-header">
                        <img
                            src={desease.banner_src}
                            alt={`Banner de ${desease.name}`}
                            className="desease-header-bg"
                        />
                        <div className="desease-title-overlay">
                            <span>{desease.title}</span>
                        </div>
                    </section>
                </Col>
            </Row>
            <Row className="justify-content-center g-0">
                <Col xs={12} md={10} lg={10}>
                    <Tabs
                        id={`${desease.name}-info-tabs`}
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        onMouseEnter={(e) => preloadTab(e.target.getAttribute("eventKey"))}
                        className={`desease-tabs mb-4 mt-4`}
                        variant="underline"
                        fill
                    >
                        {tabs.map(({ eventKey, title }) => {
                            // pull out the dynamically‐named component
                            const SelectedDefinition = Definitions[eventKey];
                            return (
                                <Tab eventKey={eventKey} title={title} key={eventKey}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        {SelectedDefinition ? <SelectedDefinition /> : null}
                                    </Suspense>
                                </Tab>
                            );
                        })}
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default Desease
