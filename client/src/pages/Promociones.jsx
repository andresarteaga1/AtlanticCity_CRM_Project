import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Form,
    Badge,
} from "react-bootstrap";
import { Tag, Calendar, Plus, Trash2, Megaphone } from "lucide-react";

const Promociones = () => {
    const [promociones, setPromociones] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Estado para nueva promoción
    const [nuevaPromo, setNuevaPromo] = useState({
        nombrepromocion: "",
        descripcion: "",
        fechainicio: "",
        fechafin: "",
    });

    useEffect(() => {
        obtenerPromociones();
    }, []);

    const obtenerPromociones = async () => {
        try {
            const res = await axios.get("http://https://atlanticcity-crm-project.onrender.com/api/promociones/");
            setPromociones(res.data);
        } catch (error) {
            console.error("Error al cargar promociones", error);
        }
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://https://atlanticcity-crm-project.onrender.com/api/promociones/", nuevaPromo);
            Swal.fire({
                title: "¡Creada!",
                text: "Campaña registrada correctamente.",
                icon: "success",
                background: "#1a1a1a",
                color: "#fff",
                confirmButtonColor: "#d4af37",
            });
            setShowModal(false);
            setNuevaPromo({
                nombrepromocion: "",
                descripcion: "",
                fechainicio: "",
                fechafin: "",
            });
            obtenerPromociones();
        } catch (error) {
            Swal.fire({ title: "Error", text: "Revisa los campos", icon: "error" });
        }
    };

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar Campaña?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            background: "#1a1a1a",
            color: "#fff",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://atlanticcity-crm-project.onrender.com/api/promociones/${id}/`);
                obtenerPromociones();
                Swal.fire({
                    title: "Eliminado",
                    icon: "success",
                    background: "#1a1a1a",
                    color: "#fff",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Función para verificar si está activa
    const esActiva = (fechaFin) => {
        const hoy = new Date();
        const fin = new Date(fechaFin);
        // Ajustamos la fecha fin al final del día para que no venza a las 00:00
        fin.setHours(23, 59, 59);
        return hoy <= fin;
    };

    return (
        <Container fluid className="p-4 dashboard-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-white">Campañas y Promociones</h2>
                    <p className="text-muted-dark">
                        Gestiona beneficios para fidelizar clientes
                    </p>
                </div>
                <button className="btn btn-gold" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> Nueva Campaña
                </button>
            </div>

            <Row className="g-4">
                {promociones.map((promo) => {
                    const activa = esActiva(promo.fechafin);
                    return (
                        <Col md={4} key={promo.idpromocion}>
                            <Card
                                className={`card-dark h-100 ${activa ? "border-gold-subtle" : "opacity-75"}`}
                            >
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="icon-box bg-dark-subtle">
                                            <Megaphone size={20} className="text-gold" />
                                        </div>
                                        {activa ? (
                                            <Badge bg="success">ACTIVA</Badge>
                                        ) : (
                                            <Badge bg="secondary">FINALIZADA</Badge>
                                        )}
                                    </div>

                                    <h5 className="text-white fw-bold mt-2">
                                        {promo.nombrepromocion}
                                    </h5>
                                    <p className="small" style={{ minHeight: '40px', color: '#cccccc' }}>
                                        {promo.descripcion || "Sin descripción adicional."}
                                    </p>

                                    <div className="d-flex align-items-center gap-2 text-gold small mb-3">
                                        <Calendar size={14} />
                                        <span>Hasta: {promo.fechafin}</span>
                                    </div>

                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="w-100 d-flex justify-content-center align-items-center gap-2"
                                        onClick={() => handleEliminar(promo.idpromocion)}
                                    >
                                        <Trash2 size={14} /> Eliminar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}

                {promociones.length === 0 && (
                    <div className="text-center text-muted mt-5">
                        <Tag size={48} className="mb-3 opacity-50" />
                        <p>No hay promociones registradas. ¡Crea la primera!</p>
                    </div>
                )}
            </Row>

            {/* MODAL DE CREACIÓN */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                contentClassName="card-dark border-gold"
            >
                <Modal.Header
                    closeButton
                    closeVariant="white"
                    className="border-bottom-0"
                >
                    <Modal.Title className="text-white">Nueva Promoción</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleGuardar}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-gold">
                                Nombre de la Campaña
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="input-dark"
                                required
                                value={nuevaPromo.nombrepromocion}
                                onChange={(e) =>
                                    setNuevaPromo({
                                        ...nuevaPromo,
                                        nombrepromocion: e.target.value,
                                    })
                                }
                                placeholder="Ej: Bono Fin de Mes"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-gold">
                                Descripción / Objetivo
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className="input-dark"
                                value={nuevaPromo.descripcion}
                                onChange={(e) =>
                                    setNuevaPromo({ ...nuevaPromo, descripcion: e.target.value })
                                }
                                placeholder="Ej: Válido solo para clientes Platinum..."
                                style={{
                                    backgroundColor: "#222",
                                    color: "white",
                                    border: "1px solid #444",
                                }}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white small">Inicio</Form.Label>
                                    <Form.Control
                                        type="date"
                                        className="input-dark"
                                        required
                                        value={nuevaPromo.fechainicio}
                                        onChange={(e) =>
                                            setNuevaPromo({
                                                ...nuevaPromo,
                                                fechainicio: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white small">Fin</Form.Label>
                                    <Form.Control
                                        type="date"
                                        className="input-dark"
                                        required
                                        value={nuevaPromo.fechafin}
                                        onChange={(e) =>
                                            setNuevaPromo({ ...nuevaPromo, fechafin: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" className="btn-gold w-100 mt-3">
                            Guardar Campaña
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Promociones;
