import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Badge, Form, InputGroup, Modal, Button, Dropdown } from 'react-bootstrap';
import { Search, MessageSquare, AlertCircle, CheckCircle, Clock, Plus, Inbox, MoreVertical, Trash2 } from 'lucide-react'; // <--- Agregado Trash2
import Swal from 'sweetalert2';
import '../index.css';

const Atencion = () => {
    const [tickets, setTickets] = useState([]);
    const [eficacia, setEficacia] = useState(0);
    const [busqueda, setBusqueda] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [nuevoTicket, setNuevoTicket] = useState({
        dni: '',
        tipo: 'Consulta General',
        descripcion: ''
    });

    useEffect(() => {
        cargarTickets();
    }, []);

    const cargarTickets = async () => {
        try {
            const response = await axios.get('http://https://atlanticcity-crm-project.onrender.com/api/atencion/');
            setTickets(response.data.tickets);
            setEficacia(response.data.kpi_eficacia);
        } catch (error) {
            console.error("Error cargando tickets", error);
        }
    };

    const handleGuardarTicket = async () => {
        try {
            await axios.post('http://https://atlanticcity-crm-project.onrender.com/api/atencion/', nuevoTicket);

            Swal.fire({
                icon: 'success',
                title: 'Ticket Creado',
                text: 'El reclamo ha sido registrado correctamente.',
                confirmButtonColor: '#d4af37',
                background: '#1a1a1a',
                color: '#fff'
            });

            setShowModal(false);
            setNuevoTicket({ dni: '', tipo: 'Consulta General', descripcion: '' });
            cargarTickets();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.error || 'No se pudo crear el ticket. Verifique el DNI.',
                background: '#1a1a1a',
                color: '#fff'
            });
        }
    };

    const cambiarEstado = async (id, nuevoEstado) => {
        try {
            await axios.patch(`http://https://atlanticcity-crm-project.onrender.com/api/atencion/${id}/actualizar/`, {
                estado: nuevoEstado
            });
            
            cargarTickets(); 

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                background: '#1a1a1a',
                color: '#fff'
            });
            Toast.fire({
                icon: 'success',
                title: `Ticket actualizado a: ${nuevoEstado}`
            });

        } catch (error) {
            console.error("Error actualizando", error);
        }
    };

    // --- FUNCIÓN PARA ELIMINAR TIKET---
    const eliminarTicket = (id) => {
        Swal.fire({
            title: '¿Eliminar registro?',
            text: "Esta acción borrará el ticket permanentemente. Úsalo solo para limpieza.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', 
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#1a1a1a',
            color: '#fff'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://atlanticcity-crm-project.onrender.com/api/atencion/${id}/eliminar/`);
                    
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El ticket ha sido borrado del sistema.',
                        icon: 'success',
                        background: '#1a1a1a',
                        color: '#fff',
                        confirmButtonColor: '#d4af37'
                    });
                    
                    cargarTickets(); // Refrescar la lista
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el ticket.',
                        icon: 'error',
                        background: '#1a1a1a',
                        color: '#fff'
                    });
                }
            }
        });
    };

    const ticketsFiltrados = tickets.filter(t =>
        t.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.id.toString().includes(busqueda)
    );

    const pendientes = tickets.filter(t => t.estado === 'Abierto').length;

    const highContrastInput = {
        backgroundColor: '#333333',
        border: '1px solid #555',
        color: '#ffffff',
        boxShadow: 'none'
    };

    const highContrastText = {
        color: '#aaaaaa',
        fontSize: '0.9rem'
    };

    return (
        <Container fluid className="p-4 dashboard-container">
            {/* CSS INYECTADO PARA PLACEHOLDERS */}
            <style>
                {`
                    .custom-placeholder::placeholder {
                        color: #cccccc !important;
                        opacity: 1;
                    }
                    .custom-placeholder:-ms-input-placeholder {
                        color: #cccccc !important;
                    }
                `}
            </style>

            {/* CABECERA */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-white">Centro de Ayuda</h2>
                    <p style={highContrastText}>Gestión de tickets e incidencias</p>
                </div>
                <button className="btn btn-gold d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> Nuevo Ticket
                </button>
            </div>

            <Row className="g-4">
                {/* LISTA DE TICKETS */}
                <Col lg={8}>
                    <Card className="card-dark p-0 overflow-hidden" style={{ minHeight: '500px' }}>
                        <div className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <h5 className="m-0 text-white">Tickets Recientes</h5>
                            <InputGroup style={{ width: '300px' }}>
                                <InputGroup.Text style={{ backgroundColor: '#333', border: '1px solid #555', color: '#fff' }}>
                                    <Search size={16} />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Buscar por cliente o asunto..."
                                    className="custom-placeholder"
                                    style={highContrastInput}
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        <div className="ticket-list-scroll">
                            {ticketsFiltrados.length > 0 ? (
                                ticketsFiltrados.map((t, i) => (
                                    <div key={i} className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary hover-effect">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: t.estado === 'Abierto' ? 'rgba(220, 53, 69, 0.2)' :
                                                        t.estado === 'En Proceso' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(25, 135, 84, 0.2)'
                                                }}>
                                                {t.estado === 'Abierto' && <AlertCircle size={20} className="text-danger" />}
                                                {t.estado === 'En Proceso' && <Clock size={20} className="text-warning" />}
                                                {t.estado === 'Cerrado' && <CheckCircle size={20} className="text-success" />}
                                            </div>
                                            <div>
                                                <h6 className="text-white mb-0">{t.asunto}</h6>
                                                <small style={{ color: '#bbb' }}>
                                                    #{t.id} • <span className="text-gold fw-bold">{t.cliente}</span>
                                                </small>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-3">
                                            <div className="text-end">
                                                <Badge bg={t.estado === 'Abierto' ? 'danger' : t.estado === 'En Proceso' ? 'warning' : 'success'} className="mb-1 d-block">
                                                    {t.estado.toUpperCase()}
                                                </Badge>
                                                <small className={t.prioridad === 'Alta' ? 'text-danger fw-bold' : 'text-secondary'}>
                                                    {t.prioridad}
                                                </small>
                                                <div className="small mt-1" style={{ color: '#cccccc' }}>{t.fecha}</div>
                                            </div>

                                            <Dropdown align="end">
                                                <Dropdown.Toggle variant="link" className="text-secondary p-0 border-0" id={`dropdown-${t.id}`}>
                                                    <MoreVertical size={20} />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu variant="dark" className="border-secondary shadow">
                                                    <Dropdown.Header className="text-gold">Acciones</Dropdown.Header>
                                                    <Dropdown.Item onClick={() => cambiarEstado(t.id, 'En Proceso')} disabled={t.estado === 'En Proceso'}>
                                                        <Clock size={14} className="me-2 text-warning"/> En Proceso
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => cambiarEstado(t.id, 'Cerrado')} disabled={t.estado === 'Cerrado'}>
                                                        <CheckCircle size={14} className="me-2 text-success"/> Cerrar Ticket
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => cambiarEstado(t.id, 'Abierto')} className="small">
                                                        <AlertCircle size={14} className="me-2 text-primary"/> Reabrir Caso
                                                    </Dropdown.Item>
                                                    
                                                    <Dropdown.Divider className="border-secondary"/>
                                                    
                                                    {/* OPCIÓN DE ELIMINAR (ROJA) */}
                                                    <Dropdown.Item onClick={() => eliminarTicket(t.id)} className="text-danger fw-bold">
                                                        <Trash2 size={14} className="me-2"/> Eliminar
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center h-100">
                                    <div className="mb-3 p-3 rounded-circle" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                                        <Inbox size={48} color="#cccccc" />
                                    </div>
                                    <h5 className="text-white mt-2">No se encontraron tickets</h5>
                                    <small style={highContrastText}>Intenta con otro término de búsqueda</small>
                                </div>
                            )}
                        </div>
                    </Card>
                </Col>

                {/* KPI SIDEBAR */}
                <Col lg={4}>
                    <Card className="card-dark p-4 mb-4 text-center">
                        <MessageSquare size={40} className="text-gold mx-auto mb-3" />
                        <h2 className="text-white fw-bold display-4">{pendientes}</h2>
                        <span style={highContrastText}>Tickets Abiertos</span>
                    </Card>

                    <Card className="card-dark p-4">
                        <h5 className="text-white mb-3">Nivel de Servicio</h5>
                        <p style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            Porcentaje de tickets cerrados exitosamente.
                        </p>
                        <div className="d-flex justify-content-between align-items-end">
                            <h1 className={`fw-bold m-0 ${eficacia > 80 ? 'text-success' : eficacia > 50 ? 'text-warning' : 'text-danger'}`}>
                                {eficacia}%
                            </h1>
                            <span style={highContrastText} className="mb-2">Eficacia Global</span>
                        </div>
                        <div className="progress mt-2" style={{ height: '6px', backgroundColor: '#444' }}>
                            <div
                                className={`progress-bar ${eficacia > 80 ? 'bg-success' : eficacia > 50 ? 'bg-warning' : 'bg-danger'}`}
                                style={{ width: `${eficacia}%` }}
                            ></div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* MODAL */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="card-dark border-secondary">
                <Modal.Header closeButton closeVariant="white" className="border-secondary">
                    <Modal.Title className="text-white">Nuevo Ticket de Atención</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-gold">DNI del Cliente</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese DNI..."
                                className="custom-placeholder"
                                style={highContrastInput}
                                value={nuevoTicket.dni}
                                onChange={(e) => setNuevoTicket({ ...nuevoTicket, dni: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-gold">Tipo de Solicitud</Form.Label>
                            <Form.Select
                                style={highContrastInput}
                                value={nuevoTicket.tipo}
                                onChange={(e) => setNuevoTicket({ ...nuevoTicket, tipo: e.target.value })}
                            >
                                <option>Consulta General</option>
                                <option>Reclamo de Pagos</option>
                                <option>Canje de Puntos</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-gold">Descripción del Caso</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className="custom-placeholder"
                                style={highContrastInput}
                                placeholder="Detalle el problema..."
                                value={nuevoTicket.descripcion}
                                onChange={(e) => setNuevoTicket({ ...nuevoTicket, descripcion: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-secondary">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button className="btn-gold" onClick={handleGuardarTicket}>Registrar Ticket</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Atencion;