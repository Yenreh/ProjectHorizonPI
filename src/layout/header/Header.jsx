import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router"; // Import useLocation
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const location = useLocation(); 

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const deseases = [
        { name: "cataratas", verbose: "Cataratas" },
        { name: "miopia", verbose: "Miopía" },
        { name: "conjuntivitis", verbose: "Conjuntivitis" },
        { name: "desprendimiento_retina", verbose: "Desprendimiento de retina" },
    ];

    const isDeseaseActive = deseases.some((disease) =>
        location.pathname.includes(disease.name)
    ); 

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const isDropdownOpen = document.querySelector('.dropdown-menu.show');

            if (!isDropdownOpen) {
                if (window.scrollY > lastScrollY) {
                    setIsHidden(true);
                } else {
                    setIsHidden(false);
                }
            }

            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={isHidden ? "hidden" : ""}>
            <Navbar expand="lg" expanded={menuOpen}>
                <Container>
                    <Navbar.Brand href="/" className="d-flex align-items-center">
                        <img
                            src="/favicon.png"
                            alt="Logo"
                            className="me-2"
                            style={{ height: "30px" }}
                        />
                        <span>Horizon</span>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="navbarNav"
                        onClick={toggleMenu}
                    />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="ms-auto">
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/" end onClick={() => setMenuOpen(false)}>
                                    Inicio
                                </Nav.Link>
                            </Nav.Item>
                            <NavDropdown
                                title="Enfermedades"
                                id="deseases-dropdown"
                                className={isDeseaseActive ? "active" : ""}
                            >
                                {deseases.map((disease) => (
                                    <NavDropdown.Item
                                        key={disease.name}
                                        as={NavLink}
                                        to={`/${disease.name}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {disease.verbose}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/about-us" onClick={() => setMenuOpen(false)}>
                                    Sobre nosotros
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/quiz" onClick={() => setMenuOpen(false)}>
                                    Quiz
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="h-100 ms-lg-3"
                                    onClick={() => alert("Login clicked!")}
                                >
                                    Iniciar sesión
                                </Button>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;