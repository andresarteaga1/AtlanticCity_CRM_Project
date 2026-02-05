import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Users, DollarSign, Tag, LifeBuoy, TrendingUp } from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend 
} from 'recharts';

const Dashboard = () => {
    //  Estado inicial
    const [stats, setStats] = useState({
        total_clientes: 0,
        ingresos_totales: 0,
        total_promos: 0,
        tickets_abiertos: 0,
        top_clientes: [],
        visitas_grafica: [],
        distribucion_vip: []
    });

    //  Cargar datos
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/dashboard-stats/');
                setStats(response.data);
            } catch (error) {
                console.error("Error cargando dashboard:", error);
            }
        };
        fetchStats();
    }, []);

    // . Función para el color de FONDO del círculo
    const getColorFondoAvatar = (nivel) => {
        const n = nivel ? nivel.toLowerCase() : '';
        if(n === 'platinum') return '#E0F7FA';
        if(n === 'gold') return '#D4AF37';
        if(n === 'silver') return '#71717a';
        if(n === 'bronce') return '#cd7f32';
        if(n === 'vetado') return '#d40000';
        return '#3b82f6'; // Azul para Nuevo
    };

    const getColorTextoAvatar = (nivel) => {
        const n = nivel ? nivel.toLowerCase() : '';
        // Si es Platinum (fondo claro), la letra debe ser negra
        if(n === 'platinum') return '#000000';
        // Para todos los demás (fondos oscuros o intensos), letra blanca
        return '#ffffff';
    };

    //. Función para pintar los trozos del gráfico
    const getColorGrafico = (nivelName) => {
        const n = nivelName ? nivelName.toLowerCase() : '';
        if(n === 'platinum') return '#e0f7fa';
        if(n === 'gold')     return '#d4af37';
        if(n === 'silver')   return '#a1a1aa';
        if(n === 'bronce')   return '#cd7f32';
        if(n === 'vetado') return '#d40000';
        return '#3b82f6';
    };

    const customTooltipStyle = {
        backgroundColor: '#000000', 
        border: '1px solid #D4AF37', 
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.8)',
        color: '#fff'
    };

    const axisStyle = { fill: '#888', fontSize: 12 };

    return (
        <Container fluid className="p-4 dashboard-container">
            <div className="mb-4">
                <h2 className="fw-bold text-white">Dashboard</h2>
                <p className="text-muted-dark">Resumen en tiempo real del casino</p>
            </div>

            {/* KPI CARDS */}
            <Row className="g-4 mb-4">
                <Col xs={12} sm={6} lg={3}>
                    <Card className="card-dark h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div className="icon-box bg-primary-dark"><Users size={24} /></div>
                            </div>
                            <h6 className="text-muted-dark mb-1">Total Clientes</h6>
                            <h2 className="fw-bold mb-0 text-white">{stats.total_clientes}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <Card className="card-dark h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div className="icon-box bg-success-dark"><DollarSign size={24} /></div>
                            </div>
                            <h6 className="text-muted-dark mb-1">Ingresos del mes</h6>
                            <h2 className="fw-bold mb-0 text-white">
                                S/ {Number(stats.ingresos_totales).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <Card className="card-dark h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div className="icon-box bg-warning-dark"><Tag size={24} /></div>
                            </div>
                            <h6 className="text-muted-dark mb-1">Promociones</h6>
                            <h2 className="fw-bold mb-0 text-white">{stats.total_promos}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <Card className="card-dark h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div className="icon-box bg-danger-dark"><LifeBuoy size={24} /></div>
                            </div>
                            <h6 className="text-muted-dark mb-1">Tickets Soporte</h6>
                            <h2 className="fw-bold mb-0 text-white">{stats.tickets_abiertos}</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* GRÁFICOS */}
            <Row className="g-4 mb-4">
                <Col xs={12} lg={8}>
                    <Card className="card-dark h-100 p-3">
                        <Card.Title className="card-title-dark mb-4">Visitas Mensuales</Card.Title>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <LineChart data={stats.visitas_grafica}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                                    <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={axisStyle} />
                                    <YAxis axisLine={false} tickLine={false} tick={axisStyle} />
                                    <Tooltip contentStyle={customTooltipStyle} />
                                    <Line type="monotone" dataKey="visitas" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4, fill: '#D4AF37' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>

                <Col xs={12} lg={4}>
                    <Card className="card-dark h-100 p-3">
                        <Card.Title className="card-title-dark mb-4">Distribución VIP</Card.Title>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={stats.distribucion_vip}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        nameKey="name"
                                        stroke="none"
                                    >
                                        {stats.distribucion_vip && stats.distribucion_vip.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getColorGrafico(entry.name)} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#fff' }} />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#ccc' }}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {(!stats.distribucion_vip || stats.distribucion_vip.length === 0) && (
                            <p className="text-center text-muted small mt-2">Aun no hay datos de clientes.</p>
                        )}
                    </Card>
                </Col>
            </Row>

            {/* TOP CLIENTES */}
            <Row className="g-4 pb-5">
                <Col xs={12}>
                    <Card className="card-dark p-4">
                        <h5 className="card-title-dark mb-4">Top Clientes por Gasto</h5>
                        <div className="d-flex flex-column gap-3">
                            {stats.top_clientes && stats.top_clientes.length > 0 ? (
                                stats.top_clientes.map((cliente, index) => (
                                    <div key={index} className="d-flex align-items-center justify-content-between border-bottom border-secondary pb-2">
                                        <div className="d-flex align-items-center">
                                            {/* CÍRCULO CON LA INICIAL */}
                                            <div 
                                                className="d-flex align-items-center justify-content-center fw-bold rounded-circle me-3"
                                                style={{ 
                                                    width: '45px', 
                                                    height: '45px', 
                                                    backgroundColor: getColorFondoAvatar(cliente.nivel),
                                                    color: getColorTextoAvatar(cliente.nivel) // <--- ¡AQUÍ ESTÁ EL ARREGLO!
                                                }}
                                            >
                                                {cliente.nombre.charAt(0)}
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold text-white">{cliente.nombre}</h6>
                                                <small className="text-muted-dark">{cliente.nivel}</small>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <h5 className="mb-0 fw-bold" style={{color: '#D4AF37'}}>
                                                S/ {Number(cliente.gasto).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                                            </h5>
                                            <small className="text-success small d-flex align-items-center justify-content-end">
                                                <TrendingUp size={14} className="me-1"/> Top {index + 1}
                                            </small>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted text-center py-4">Aún no hay transacciones suficientes.</p>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;