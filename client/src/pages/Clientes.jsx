import Swal from 'sweetalert2';
import axios from "axios";
import { MoreHorizontal, Plus, Search, X, Trash2, Ban } from "lucide-react";
import { useEffect, useState } from "react";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(false);
  
  //  ESTADO PARA EL BUSCADOR
  const [busqueda, setBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    email: "",
    celular: "",
    nivel: "Nuevo",
  });

  // BUSCAR AUTOMÁTICAMENTE CUANDO ESCRIBES
  useEffect(() => {
    // Usamos un pequeño retraso (debounce) para no saturar la API
    const delayDebounceFn = setTimeout(() => {
      obtenerClientes();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [busqueda]); // Se ejecuta cada vez que cambia 'busqueda'

  const obtenerClientes = async () => {
    try {
      setCargando(true);
      // 4. LÓGICA DE BÚSQUEDA EN LA URL
      let url = "https://atlanticcity-crm-project.onrender.com/api/clientes/";
      if (busqueda.trim() !== "") {
        url += `?search=${encodeURIComponent(busqueda)}`;
      }
      
      const response = await axios.get(url);
      setClientes(response.data);
    } catch (error) {
      console.error("Error cargando clientes:", error);
    } finally {
      setCargando(false);
    }
  };

  // --- FUNCIÓN: ELIMINAR CLIENTE ---
  const handleEliminar = async (id, nombre) => {
    const result = await Swal.fire({
        title: '¿Eliminar Cliente?',
        text: `Se borrará a ${nombre} permanentemente.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar',
        background: '#1a1a1a', color: '#fff'
    });

    if (result.isConfirmed) {
        try {
            await axios.delete(`https://atlanticcity-crm-project.onrender.com/api/clientes/${id}/`);
            obtenerClientes(); // Recargar lista
            Swal.fire({title:'Eliminado', icon:'success', background: '#1a1a1a', color: '#fff', timer: 1500, showConfirmButton: false});
        } catch (error) {
            Swal.fire({title:'Error', text:'No se pudo eliminar.', icon:'error', background: '#1a1a1a', color: '#fff'});
        }
    }
  };

  // --- FUNCIÓN: VETAR CLIENTE ---
  const handleVetar = async (id, nombre) => {
    const result = await Swal.fire({
        title: '¿Bloquear Acceso?',
        text: `Se vetará el DNI de ${nombre}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, VETAR',
        background: '#1a1a1a', color: '#fff'
    });

    if (result.isConfirmed) {
        try {
            await axios.patch(`https://atlanticcity-crm-project.onrender.com/api/clientes/${id}/`, { accion: 'vetar' });
            obtenerClientes(); // Recargar lista
            Swal.fire({title:'VETADO', icon:'success', background: '#1a1a1a', color: '#fff', timer: 1500, showConfirmButton: false});
        } catch (error) {
            Swal.fire({title:'Error', text:'No se pudo vetar.', icon:'error', background: '#1a1a1a', color: '#fff'});
        }
    }
  };

// --- FUNCIÓN GUARDAR (INTELIGENTE) ---
  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://atlanticcity-crm-project.onrender.com/api/clientes/", nuevoCliente);
      
      // ÉXITO
      Swal.fire({
        title: '¡Registrado!',
        text: 'Cliente registrado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#d4af37',
        background: '#1a1a1a',
        color: '#ffffff'
      });

      setMostrarModal(false);
      setNuevoCliente({ nombres: "", apellidos: "", dni: "", email: "", celular: "", nivel: "Nuevo" });
      obtenerClientes();

    } catch (error) {
      // Definimos un mensaje por defecto
      let mensajeError = 'No se pudo guardar. Verifica los datos.';

      if (error.response && error.response.data) {
          // CASO 1: CLIENTE VETADO (El backend envía una clave "error")
          if (error.response.data.error) {
              mensajeError = error.response.data.error; 
          } 
          // CASO 2: DNI DUPLICADO (Django envía una clave "dni")
          else if (error.response.data.dni) {
              mensajeError = ' Este DNI ya está registrado en el sistema.';
          }
      }

      Swal.fire({
        title: 'Atención',
        text: mensajeError, // <--- Mostramos el mensaje real
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d4af37',
        background: '#1a1a1a',
        color: '#ffffff'
      });
    }
  };

const getNivelColor = (nivel, vetado) => {
    if (vetado) return "badge-vetado"; // Rojo
    
    // Normalizamos a minúsculas para evitar errores de tipeo
    const n = nivel ? nivel.toLowerCase() : ''; 

    if (n === 'platinum') return "badge-platinum"; // Blanco Brillante
    if (n === 'gold')     return "badge-gold";     // Dorado
    if (n === 'silver')   return "badge-silver";   // Gris Acero
    if (n === 'bronce')   return "badge-bronce";   // bbronce
    
    return "badge-nuevo"; // Azul (Por defecto)
  };

  return (
    <div className='clientes-container'>
      <div className='page-header'>
        <div>
          <h1 className='page-title'>Cartera de Clientes</h1>
          <p className='page-subtitle'>Gestión de jugadores VIP</p>
        </div>
        <button className='btn-gold' onClick={() => setMostrarModal(true)}>
          <Plus size={18} /> Nuevo Cliente
        </button>
      </div>

      {/* --- EL MODAL --- */}
      {mostrarModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>Registro de Cliente</h2>
              <X
                className='close-icon'
                onClick={() => setMostrarModal(false)}
                style={{ cursor: 'pointer' }} 
              />
            </div>
            <form onSubmit={handleGuardar}>
              <div className='form-grid'>
                <input
                  type='text'
                  placeholder='Nombres'
                  required
                  value={nuevoCliente.nombres}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, nombres: e.target.value })
                  }
                />
                <input
                  type='text'
                  placeholder='Apellidos'
                  required
                  value={nuevoCliente.apellidos}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, apellidos: e.target.value })
                  }
                />
                <input
                  type='text'
                  placeholder='DNI'
                  required
                  value={nuevoCliente.dni}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, dni: e.target.value })
                  }
                />
                <input
                  type='email'
                  placeholder='Email'
                  value={nuevoCliente.email}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, email: e.target.value })
                  }
                />
                <input
                  type='text'
                  placeholder='Celular'
                  value={nuevoCliente.celular}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, celular: e.target.value })
                  }
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button 
                    type='button' 
                    onClick={() => setMostrarModal(false)}
                    style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: 'transparent',
                        border: '1px solid #555',
                        color: '#aaa',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                    onMouseOver={(e) => { e.target.style.borderColor = '#fff'; e.target.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.target.style.borderColor = '#555'; e.target.style.color = '#aaa'; }}
                >
                    CANCELAR
                </button>
                <button 
                    type='submit' 
                    className='btn-gold' 
                    style={{ flex: 1, marginTop: 0 }}
                >
                    GUARDAR
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 5. BARRA DE BÚSQUEDA ACTIVA */}
      <div className='toolbar'>
        <div className='search-bar'>
          <Search size={18} color='#666' />
          <input 
            type='text' 
            placeholder='Buscar por nombre o DNI...' 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className='table-container'>
        <table className='clients-table'>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>DNI</th>
              <th>Nivel</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan='6' className='text-center'>
                  Cargando...
                </td>
              </tr>
            ) : clientes.length === 0 ? (
              <tr>
                <td colSpan='6' className='text-center'>
                  {busqueda ? 'No se encontraron resultados.' : 'No hay clientes. Usa el botón "Nuevo Cliente".'}
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr key={cliente.idcliente}>
                  <td>
                    {cliente.nombres} {cliente.apellidos}
                  </td>
                  <td>{cliente.dni}</td>
                  <td>
                    {/* Soporte visual para Vetados */}
                    {cliente.es_vetado ? (
                        <span className="badge" style={{backgroundColor: '#ef4444', color: 'white'}}>VETADO</span>
                    ) : (
                        <span className={`badge ${getNivelColor(cliente.nivel)}`}>
                        {cliente.nivel}
                        </span>
                    )}
                  </td>
                  <td>{cliente.email}</td>
                  <td>{cliente.celular}</td>
                  
                  {/* 6. NUEVA COLUMNA DE ACCIONES */}
                  <td>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <button 
                            className='btn-icon' 
                            title="Vetar / Bloquear"
                            onClick={() => handleVetar(cliente.idcliente, cliente.nombres)}
                            style={{color: '#fbbf24'}} // Amarillo para vetar
                        >
                            <Ban size={18} />
                        </button>
                        <button 
                            className='btn-icon' 
                            title="Eliminar Cliente"
                            onClick={() => handleEliminar(cliente.idcliente, cliente.nombres)}
                            style={{color: '#ef4444'}} // Rojo para eliminar
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;