import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Suspense, lazy } from "react";
import Layout from "./layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./index.css";

const Home = lazy(() => import("./pages/home/Home"));
const Cataracts = lazy(() => import("./pages/diseases/cataracts/Cataracts"));
const Myopia = lazy(() => import("./pages/diseases/myopia/Myopia.jsx"));
const RetinaDetachment = lazy(() => import("./pages/diseases/retina-detachment/RetinaDetachment.jsx"));
const Floaters = lazy(() => import("./pages/diseases/retina-detachment/extra-pages/Floaters.jsx"));
const Conjunctivitis = lazy(() => import("./pages/diseases/conjunctivitis/Conjunctivitis.jsx"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Rutas con Layout (header y footer) */}
        <Route element={<Layout><Outlet /></Layout>}>
            <Route index path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cataratas" element={<Cataracts />} />
            <Route path="/miopia" element={<Myopia />} />
            <Route path="/desprendimiento_retina" element={<RetinaDetachment />} />
            <Route path="/conjuntivitis" element={<Conjunctivitis />} />
        </Route>

        {/* Rutas sin Layout (pantalla completa) */}
        <Route path="/moscas-flotantes" element={<Floaters />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
