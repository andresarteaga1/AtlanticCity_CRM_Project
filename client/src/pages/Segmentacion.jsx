import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importamos Axios
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Filter, Users, Trophy, UserPlus, UserX } from 'lucide-react';

const Segmentacion = () => {
    // 1. ESTADOS PARA GUARDAR DATOS REALES
    const [chartData, setChartData] = useState([]);
    const [kpis, setKpis] = useState({
        vip_total: 0,
        nuevos_qty: 0,
        regulares: 0,
        riesgo: 0
    });
    const [loading, setLoading] = useState(true);

    // 2. CONECTAR CON EL BACKEND AL CARGAR
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://https://atlanticcity-crm-project.onrender.com/api/segmentacion/');
                setChartData(response.data.chart); 
                setKpis(response.data.kpis);       
                setLoading(false);
            } catch (error) {
                console.error("Error cargando segmentación:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <Container fluid className="p-4 dashboard-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-white">Segmentación de Clientes</h2>
                    <p className="text-muted-dark">Análisis de grupos</p>
                </div>
            </div>

            {/* Tarjetas de Resumen de Grupos  */}
            <Row className="g-4 mb-4">
                {/* 1. VIP TOTAL */}
                <Col md={3}>
                    <Card className="card-dark h-100 text-center p-3">
                        <Card.Body>
                            <div className="icon-box bg-warning-dark mx-auto mb-3">
                                <Trophy size={24} />
                            </div>
                            <h5 className="text-white">VIP Total</h5>
                            <h2 className="fw-bold text-gold">
                                {loading ? "..." : kpis.vip_total}
                            </h2>
                            <small className="text-muted-dark">Gold + Platinum</small>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="card-dark h-100 text-center p-3">
                        <Card.Body>
                            <div className="icon-box bg-primary-dark mx-auto mb-3">
                                <UserPlus size={24} />
                            </div>
                            <h5 className="text-white">Nuevos</h5>
                            <h2 className="fw-bold text-white">
                                {loading ? "..." : kpis.nuevos_qty}
                            </h2>
                            <small className="text-muted-dark">Nivel Inicial</small>
                        </Card.Body>
                    </Card>
                </Col>

                {/* 3. REGULARES */}
                <Col md={3}>
                    <Card className="card-dark h-100 text-center p-3">
                        <Card.Body>
                            <div className="icon-box mx-auto mb-3" style={{background: 'rgba(255, 255, 255, 0.1)'}}>
                                <Users size={24} color="white" />
                            </div>
                            <h5 className="text-white">Regulares</h5>
                            <h2 className="fw-bold text-white">
                                {loading ? "..." : kpis.regulares}
                            </h2>
                            <small className="text-muted-dark">Silver + Bronce</small>
                        </Card.Body>
                    </Card>
                </Col>

                {/* 4. EN RIESGO / VETADOS */}
                <Col md={3}>
                    <Card className="card-dark h-100 text-center p-3">
                        <Card.Body>
                            <div className="icon-box bg-danger-dark mx-auto mb-3">
                                <UserX size={24} />
                            </div>
                            <h5 className="text-white">Vetados / Inactivos</h5>
                            <h2 className="fw-bold text-danger">
                                {loading ? "..." : kpis.riesgo}
                            </h2>
                            <small className="text-muted-dark">Acceso Bloqueado</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Gráfico Principal (CON DATOS REALES) */}
            <Row className="mb-4">
                <Col md={12}>
                    <Card className="card-dark p-4">
                        <h4 className="card-title-dark">Distribución de la Base de Datos</h4>
                        <div style={{ width: '100%', height: 400 }}>
                            {loading ? (
                                <p className="text-center text-white mt-5">Cargando gráfico...</p>
                            ) : (
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={100}
                                            outerRadius={140}
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            stroke="none"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                            ))}
                                        </Pie>
                                        
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#111', 
                                                border: '1px solid #D4AF37', 
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                                            }} 
                                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                        />
                                        
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#ccc', marginTop: '20px' }}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Segmentacion;