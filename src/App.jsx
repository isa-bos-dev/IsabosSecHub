import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Páginas
import Home from './pages/Home/Home';

// Componentes del Proyecto Threats
import ThreatsPanorama from './pages/Threats/Panorama';
import SQLiMaster from './pages/Threats/SQLiMaster';
import NoSQLModern from './pages/Threats/NoSQLModern';
import Ransomware from './pages/Threats/Ransomware';
import CloudAPI from './pages/Threats/CloudAPI';
import Infra from './pages/Threats/Infra';
import Arsenal from './pages/Threats/Arsenal';
import Defense from './pages/Threats/Defense';
import Quiz from './pages/Threats/Quiz';

// Componentes de la App Network
import ProjectLayout from './components/layout/ProjectLayout';
import Panorama from './pages/Network/Panorama';
import Capas from './pages/Network/Capas';
import Reconocimiento from './pages/Network/Reconocimiento';
import Ataques from './pages/Network/Ataques';
import DoS from './pages/Network/DoS';
import NetworkQuiz from './pages/Network/Quiz';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Página de Inicio */}
        <Route path="/" element={<Home />} />

        {/* Rutas del Proyecto Threats */}
        <Route path="/threats" element={
          <ProjectLayout
            title="Security Research"
            subtitle="Full Spectrum Data Threats"
            titleColor="secondary"
            links={[
              { to: "/threats", label: "Panorama", end: true },
              { to: "/threats/sqli", label: "SQLi Master" },
              { to: "/threats/nosql", label: "NoSQL & Modern" },
              { to: "/threats/ransomware", label: "Ransomware" },
              { to: "/threats/cloud", label: "Cloud & API" },
              { to: "/threats/infra", label: "Infra Física/Red" },
              { to: "/threats/herramientas", label: "Arsenal" },
              { to: "/threats/mitigacion", label: "Defensa" },
              { to: "/threats/cuestionario", label: "Cuestionario" }
            ]}
          />
        }>
          <Route index element={<ThreatsPanorama />} />
          <Route path="sqli" element={<SQLiMaster />} />
          <Route path="nosql" element={<NoSQLModern />} />
          <Route path="ransomware" element={<Ransomware />} />
          <Route path="cloud" element={<CloudAPI />} />
          <Route path="infra" element={<Infra />} />
          <Route path="herramientas" element={<Arsenal />} />
          <Route path="mitigacion" element={<Defense />} />
          <Route path="cuestionario" element={<Quiz />} />
        </Route>

        {/* Rutas del Proyecto Network */}
        <Route path="/network" element={
          <ProjectLayout
            title="CyberSecTCP/IP"
            subtitle="Full Spectrum Network Threats"
            titleColor="primary"
            links={[
              { to: "/network", label: "Panorama", end: true },
              { to: "/network/capas", label: "Capas TCP/IP" },
              { to: "/network/reconocimiento", label: "Reconocimiento" },
              { to: "/network/ataques", label: "Ataques de red" },
              { to: "/network/dos", label: "DoS & DDoS" },
              { to: "/network/cuestionario", label: "Quiz" }
            ]}
          />
        }>
          <Route index element={<Panorama />} /> {/* Default: /network */}
          <Route path="capas" element={<Capas />} />
          <Route path="reconocimiento" element={<Reconocimiento />} />
          <Route path="ataques" element={<Ataques />} />
          <Route path="dos" element={<DoS />} />
          <Route path="cuestionario" element={<NetworkQuiz />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
