import React from 'react';
// 1. IMPORTAMOS useLocation AQUÍ 👇
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Caja from './pages/Caja'; 
import Clientes from './pages/Clientes';
import Segmentacion from './pages/Segmentacion';
import Promociones from './pages/Promociones';
import Reportes from './pages/Reportes';
import Atencion from './pages/Atencion';

import Sidebar from './components/Sidebar';

// 2. MODIFICAMOS EL LAYOUT PARA QUE DETECTE EL CAMBIO DE PÁGINA 
const Layout = ({ children }) => {
    const location = useLocation(); // Obtenemos la ruta actual (ej: "/clientes")
    
    return (
        <div className="layout-wrapper">
            <Sidebar />
            {/* Al ponerle una 'key' distinta cada vez, React reinicia la animación */}
            <div className="layout-content" key={location.pathname}>
                {children}
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                
                {/* RUTAS DEL SISTEMA */}
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/caja" element={<Layout><Caja /></Layout>} />
                <Route path="/clientes" element={<Layout><Clientes /></Layout>} />
                <Route path="/segmentacion" element={<Layout><Segmentacion /></Layout>} />
                <Route path="/promociones" element={<Layout><Promociones /></Layout>} />
                <Route path="/reportes" element={<Layout><Reportes /></Layout>} />
                <Route path="/atencion" element={<Layout><Atencion /></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;