import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    PieChart, 
    Tag, 
    BarChart2, 
    Headphones, 
    LogOut,
    Wallet 
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>ATLANTIC <span>CRM</span></h2>
            </div>

            <nav className="sidebar-menu">
                {/* 1. Dashboard */}
                <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>

                {/* 2. Caja */}
                <Link to="/caja" className={location.pathname === '/caja' ? 'active' : ''}>
                    <Wallet size={20} />
                    <span>Caja / Ingresos</span>
                </Link>

                {/* 3. Clientes */}
                <Link to="/clientes" className={location.pathname === '/clientes' ? 'active' : ''}>
                    <Users size={20} />
                    <span>Clientes</span>
                </Link>

                {/* 4. Segmentación */}
                <Link to="/segmentacion" className={location.pathname === '/segmentacion' ? 'active' : ''}>
                    <PieChart size={20} />
                    <span>Segmentación</span>
                </Link>

                {/* 5. Promociones */}
                <Link to="/promociones" className={location.pathname === '/promociones' ? 'active' : ''}>
                    <Tag size={20} />
                    <span>Promociones</span>
                </Link>

                {/* 6. Reportes */}
                <Link to="/reportes" className={location.pathname === '/reportes' ? 'active' : ''}>
                    <BarChart2 size={20} />
                    <span>Reportes</span>
                </Link>
                

                {/* 8. Atención al Cliente */}
                <Link to="/atencion" className={location.pathname === '/atencion' ? 'active' : ''}>
                    <Headphones size={20} />
                    <span>Atención al Cliente</span>
                </Link>
            </nav>

            <div className="sidebar-footer">
                <Link to="/" className="logout-btn">
                    <LogOut size={20} />
                    <span>Salir</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;