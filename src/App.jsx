import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Páginas
import Home from './pages/Home/Home';

// Componentes del Proyecto Threats
import ThreatsPanorama from './pages/Threats/Panorama';
import SQLiMaster from './pages/Threats/SQLi';
import NoSQLModern from './pages/Threats/NoSQLModern';
import Ransomware from './pages/Threats/Ransomware';
import CloudAPI from './pages/Threats/CloudAPI';
import Infra from './pages/Threats/Infra';
import Arsenal from './pages/Threats/Arsenal';
import Defense from './pages/Threats/Defense';
import Quiz from './pages/Threats/Quiz';

// Componentes del Proyecto Cryptography
import CryptoPanorama from './pages/Cryptography/Panorama';
import IntroHistoria from './pages/Cryptography/IntroHistoria';
import Matematicas from './pages/Cryptography/Matematicas';
import Simetrica from './pages/Cryptography/Simetrica';
import HashFunctions from './pages/Cryptography/HashFunctions';
import Asimetrica from './pages/Cryptography/Asimetrica';
import PKI from './pages/Cryptography/PKI';
import Protocolos from './pages/Cryptography/Protocolos';
import CryptoQuiz from './pages/Cryptography/Quiz';
import InfografiaViewer from './components/ui/InfografiaViewer'; // Viewer de infografías

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
    <Router basename={import.meta.env.BASE_URL}>
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

        {/* Rutas del Proyecto Cryptography */}
        <Route path="/cryptography" element={
          <ProjectLayout
            title="Cryptography"
            subtitle="The Art of Secret Communication"
            titleColor="success"
            links={[
              { to: "/cryptography", label: "Panorama", end: true },
              { to: "/cryptography/intro", label: "Intro & Historia" },
              { to: "/cryptography/matematicas", label: "Matemáticas" },
              { to: "/cryptography/simetrica", label: "Cifrado Simétrico" },
              { to: "/cryptography/hash", label: "Hash" },
              { to: "/cryptography/asimetrica", label: "Cifrado asimétrico" },
              { to: "/cryptography/pki", label: "Infraestructura (PKI)" },
              { to: "/cryptography/protocolos", label: "Protocolos" },
              { to: "/cryptography/cuestionario", label: "Cuestionario" }
            ]}
          />
        }>
          <Route index element={<CryptoPanorama />} />
          <Route path="intro" element={<IntroHistoria />} />
          <Route path="matematicas" element={<Matematicas />} />
          <Route path="simetrica" element={<Simetrica />} />
          <Route path="hash" element={<HashFunctions />} />
          <Route path="asimetrica" element={<Asimetrica />} />
          <Route path="pki" element={<PKI />} />
          <Route path="protocolos" element={<Protocolos />} />
          <Route path="cuestionario" element={<CryptoQuiz />} />
          <Route path="infografia" element={<InfografiaViewer />} />
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
