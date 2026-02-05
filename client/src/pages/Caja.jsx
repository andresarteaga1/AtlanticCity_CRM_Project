import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Search, CreditCard, Coins, UserCheck } from 'lucide-react';
import '../index.css'; 

const Caja = () => {
    const [busqueda, setBusqueda] = useState('');
    const [clienteEncontrado, setClienteEncontrado] = useState(null);
    const [errorBusqueda, setErrorBusqueda] = useState('');
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState('RECARGA_TARJETA');

    // 1. BUSCAR CLIENTE
    const buscarCliente = async (e) => {
        e.preventDefault();
        setErrorBusqueda('');
        setClienteEncontrado(null);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/clientes/?search=${busqueda}`);
            
            if (response.data.length > 0) {
                setClienteEncontrado(response.data[0]);
            } else {
                setErrorBusqueda('No se encontró el DNI.');
            }
        } catch (error) {
            console.error(error);
            setErrorBusqueda('Error buscando cliente.');
        }
    };

    // 2. PROCESAR TRANSACCIÓN (Con Alerta Corregida)
    const procesarTransaccion = async (e) => {
        e.preventDefault();
        if (!clienteEncontrado) return;

        // A. Guardamos el nivel ANTES de la operación
        const nivelAnterior = clienteEncontrado.nivel;

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/transacciones/', {
                cliente: clienteEncontrado.idcliente, 
                monto: monto,
                tipo: tipo
            });

            // B. Verificamos si subió de nivel
            // (El backend debe devolver cliente_nivel_actual en el serializer, o usamos el response data si lo incluye)
            const nuevoNivel = response.data.cliente_nivel_actual || nivelAnterior;

            // C. Lógica de Notificación
            if (nuevoNivel !== nivelAnterior) {
                // aviso de asenso de cliente
                Swal.fire({
                    title: '¡FELICIDADES!',
                    html: `
                        <h3 style="color: #d4af37; margin-bottom: 15px;">¡NUEVO NIVEL ALCANZADO!</h3>
                        <p style="color: #e0e0e0; font-size: 1.1rem;">
                            El cliente ha ascendido a la categoría:
                        </p>
                        <br/>
                        <div style="
                            font-size: 2rem; 
                            font-weight: bold; 
                            text-transform: uppercase; 
                            color: #fff;
                            text-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
                            border: 1px solid #d4af37;
                            display: inline-block;
                            padding: 10px 30px;
                            border-radius: 8px;
                            background: rgba(212, 175, 55, 0.1);
                        ">
                            ${nuevoNivel}
                        </div>
                    `,
                    icon: 'success',
                    background: '#1a1a1a', // Fondo de la tarjeta 
                    confirmButtonText: 'Continuar',
                    confirmButtonColor: '#d4af37',
                    color: '#fff',
                    backdrop: `rgba(0,0,0,0.85)`,
                    allowOutsideClick: false
                });

                // Actualizamos el nivel en la vista actual sin tener que buscar de nuevo
                setClienteEncontrado({ ...clienteEncontrado, nivel: nuevoNivel });

            } else {
                // CASO NORMAL: Solo confirmación de pago
                Swal.fire({
                    title: 'Operación Exitosa',
                    text: `Ingreso de S/ ${monto} registrado correctamente.`,
                    icon: 'success',
                    confirmButtonColor: '#d4af37',
                    background: '#1a1a1a',
                    color: '#fff'
                });
            }

            setMonto('');
            
        } catch (error) {
            Swal.fire({ 
                title: 'Error', 
                text: 'No se pudo guardar la transacción.', 
                icon: 'error', 
                background: '#1a1a1a', 
                color: '#fff' 
            });
        }
    };

    return (
        <div className="caja-container" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
            <div className="caja-header">
                <h1>Caja Principal</h1>
                <p className="caja-subtitle">Registro de ingresos: Fichas y Recargas</p>
            </div>

            <div className="caja-grid">
                
                {/* --- CARD IZQUIERDA: BUSCADOR --- */}
                <div className="caja-card">
                    <h2 className="card-title">
                        <Search size={20} /> Identificar Cliente
                    </h2>
                    
                    <form onSubmit={buscarCliente}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Ingrese DNI..." 
                                className="caja-input"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            <button type="submit" className="btn-gold">Buscar</button>
                        </div>
                    </form>

                    {errorBusqueda && <p className="text-error">{errorBusqueda}</p>}

                    {clienteEncontrado && (
                        <div className="client-result">
                            <div className="client-icon">
                                <UserCheck size={24} />
                            </div>
                            <div>
                                <p style={{color:'#888', fontSize:'0.9rem'}}>Cliente seleccionado:</p>
                                <h3 style={{color:'white', margin:0}}>
                                    {clienteEncontrado.nombres} {clienteEncontrado.apellidos}
                                </h3>
                                <div style={{marginTop:'5px'}}>
                                    <span style={{color:'#d4af37', fontSize:'0.9rem'}}>Nivel Actual: </span>
                                    <span style={{
                                        color: '#fff', 
                                        fontWeight: 'bold', 
                                        textTransform: 'uppercase',
                                        border: '1px solid #444',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        marginLeft: '5px'
                                    }}>
                                        {clienteEncontrado.nivel}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- CARD DERECHA: TRANSACCIÓN --- */}
                <div className={`caja-card ${!clienteEncontrado ? 'disabled' : ''}`}>
                    <h2 className="card-title">
                        <Coins size={20} /> Detalle de Ingreso
                    </h2>

                    <form onSubmit={procesarTransaccion}>
                        <label style={{display:'block', marginBottom:'10px', color:'#ccc'}}>Tipo de Operación</label>
                        
                        <div className="type-selector">
                            <button 
                                type="button"
                                className={`type-btn ${tipo === 'RECARGA_TARJETA' ? 'active' : ''}`}
                                onClick={() => setTipo('RECARGA_TARJETA')}
                            >
                                <CreditCard size={24} />
                                <span>Recarga Tarjeta</span>
                            </button>

                            <button 
                                type="button"
                                className={`type-btn ${tipo === 'COMPRA_FICHAS' ? 'active' : ''}`}
                                onClick={() => setTipo('COMPRA_FICHAS')}
                            >
                                <Coins size={24} />
                                <span>Compra Fichas</span>
                            </button>
                        </div>

                        <label style={{display:'block', marginBottom:'10px', color:'#ccc'}}>Monto (S/)</label>
                        <input 
                            type="number" 
                            placeholder="0.00" 
                            className="caja-input money-input"
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            required
                            min="1"
                        />

                        <button type="submit" className="btn-gold btn-block" style={{marginTop:'20px'}}>
                            CONFIRMAR INGRESO
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Caja;