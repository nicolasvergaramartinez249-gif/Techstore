import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://techstore-0mk4.onrender.com';

const TablaProductos = ({ key, onEditar }) => {
    const [productos, setProductos] = useState([]);

    const cargarProductos = async () => {
        try {
            const respuesta = await axios.get(`${API_URL}/productos`);
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    const eliminarProducto = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await axios.delete(`${API_URL}/productos/${id}`);
                cargarProductos(); 
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar el producto");
            }
        }
    };

    useEffect(() => {
        cargarProductos();
    }, [key]); 

    return (
        <div>
            <h2>Lista de Productos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>{p.categoría}</td>
                            <td>{p.precio}</td>
                            <td>{p.stock}</td>
                            <td>
                                <button onClick={() => onEditar(p)}>Editar</button>
                                <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaProductos;