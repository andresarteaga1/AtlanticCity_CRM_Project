import axios from 'axios';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 
import '../index.css';

const Login = () => {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post('http://https://atlanticcity-crm-project.onrender.com/api/login/', {
                username: username, 
                password: password
            });

            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');

        } catch (error) {
            console.error("Error en el login:", error);
            setError("Usuario o contraseña incorrectos."); 
        }
    };

    return (
        <div className="login-bg">
            <Card className="card-glass p-4" style={{ width: '400px', borderRadius: '15px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4 text-white">
                        ATLANTIC <span className="text-gold">CITY</span>
                    </h2>
                    <p className="text-center text-secondary mb-4">Gestión de Clientes CRM</p>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-gold">Usuario</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Tu usuario (ej: Nurprynce)" 
                                className="input-dark" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="text-gold">Contraseña</Form.Label>
                            <div style={{ position: 'relative' }}>
                                <Form.Control 
                                    // Aquí ocurre la magia: si mostrarPassword es true, es texto; si no, es password
                                    type={mostrarPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="input-dark"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ paddingRight: '40px' }} // Espacio para que el texto no toque el icono
                                />
                                
                                {/* BOTÓN DEL OJO */}
                                <button
                                    type="button" // Importante: para que no envíe el formulario
                                    onClick={() => setMostrarPassword(!mostrarPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: '#d4af37', // Color dorado
                                        cursor: 'pointer',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </Form.Group>

                        {error && (
                            <div className="login-error-message">
                                {error}
                            </div>
                        )}

                        <Button variant="primary" type="submit" className="w-100 btn-gold py-2 mt-2">
                            INICIAR SESIÓN
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;