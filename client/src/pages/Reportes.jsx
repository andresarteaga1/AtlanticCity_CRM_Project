import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { Download, Filter, Calendar, CalendarRange } from 'lucide-react';
import '../index.css';

const Reportes = () => {
    const [transacciones, setTransacciones] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        cargarReporte(); 
    }, []);

    const cargarReporte = async (inicioOverride = null, finOverride = null) => {
        try {
            const inicio = inicioOverride !== null ? inicioOverride : fechaInicio;
            const fin = finOverride !== null ? finOverride : fechaFin;

            let url = 'http://https://atlanticcity-crm-project.onrender.com/api/reportes/data/';
            
            if (inicio && fin) {
                url += `?inicio=${inicio}&fin=${fin}`;
            }

            const response = await axios.get(url);
            setTransacciones(response.data);

            const suma = response.data.reduce((acc, curr) => acc + curr.monto, 0);
            setTotal(suma);

        } catch (error) {
            console.error("Error cargando reporte:", error);
        }
    };

    const filtrarEsteMes = () => {
        const date = new Date();
        const primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
        const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const inicioStr = primerDia.toISOString().split('T')[0];
        const finStr = ultimoDia.toISOString().split('T')[0];

        setFechaInicio(inicioStr);
        setFechaFin(finStr);
        cargarReporte(inicioStr, finStr);
    };

    const descargarExcel = () => {
        let url = 'http://https://atlanticcity-crm-project.onrender.com/api/reportes/excel/';
        if (fechaInicio && fechaFin) {
            url += `?inicio=${fechaInicio}&fin=${fechaFin}`;
        }
        window.open(url, '_blank');
    };

    //  FUNCIÓN PARA FORMATO DE MONEDA 
    const formatoMoneda = (cantidad) => {
        return Number(cantidad).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const getBadgeStyle = (tipo) => {
        if (tipo === 'RECARGA_TARJETA') {
            return {
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                color: '#d4af37',
                border: '1px solid #d4af37',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '500'
            };
        } else {
            return {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#e0e0e0',
                border: '1px solid #777',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '500'
            };
        }
    };

    const dateInputStyle = {
        backgroundColor: '#ffffff', 
        color: '#000000',           
        border: '1px solid #ced4da',
        fontWeight: 'bold'          
    };

    return (
        <Container fluid className="p-4 dashboard-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-white">Reportes Financieros</h2>
                    <p className="text-muted-dark">Historial de transacciones y auditoría</p>
                </div>
                <Button variant="success" onClick={descargarExcel} className="d-flex align-items-center gap-2">
                    <Download size={18} /> Exportar Excel
                </Button>
            </div>

            {/* BARRA DE FILTROS */}
            <Card className="card-dark mb-4 p-3">
                <Row className="align-items-end g-3">
                    <Col md={3}>
                        <Form.Label className="text-gold"><Calendar size={14}/> Fecha Inicio</Form.Label>
                        <Form.Control 
                            type="date" 
                            style={dateInputStyle} 
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Label className="text-gold"><Calendar size={14}/> Fecha Fin</Form.Label>
                        <Form.Control 
                            type="date" 
                            style={dateInputStyle} 
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    </Col>
                    
                    <Col md={6} className="d-flex gap-2">
                        <Button 
                            className="btn-gold flex-grow-1" 
                            onClick={() => cargarReporte()} 
                        >
                            <Filter size={18} className="me-2"/> Filtrar
                        </Button>

                        <Button 
                            variant="outline-warning" 
                            className="d-flex align-items-center gap-2"
                            onClick={filtrarEsteMes}
                            style={{ whiteSpace: 'nowrap', borderColor: '#d4af37', color: '#d4af37' }}
                        >
                            <CalendarRange size={18} /> Este Mes
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* TABLA DE RESULTADOS */}
            <Card className="card-dark">
                <Card.Body>
                    <div className="table-responsive">
                        <Table hover variant="dark" className="align-middle">
                            <thead>
                                <tr className="text-gold">
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>DNI</th>
                                    <th>Tipo</th>
                                    <th className="text-end">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transacciones.length > 0 ? (
                                    transacciones.map((t) => (
                                        <tr key={t.id}>
                                            <td style={{ color: '#fff' }}>{t.fecha}</td>
                                            <td className="fw-bold text-white">{t.cliente}</td>
                                            <td style={{ color: '#cccccc' }}>{t.dni}</td>
                                            <td>
                                                <span style={getBadgeStyle(t.tipo)}>
                                                    {t.tipo.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="text-end fw-bold text-success">
                                                S/ {formatoMoneda(t.monto)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-muted">
                                            No hay movimientos registrados en este periodo.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    <div className="d-flex justify-content-end mt-3 pt-3 border-top border-secondary">
                        <h4 className="text-white">Total Periodo: <span className="text-gold">S/ {formatoMoneda(total)}</span></h4>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Reportes;