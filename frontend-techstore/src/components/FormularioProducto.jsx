import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://techstore-0mk4.onrender.com';

const FormularioProducto = ({ alGuardar, productoEditando, setProductoEditando }) => {
    const [producto, setProducto] = useState({ nombre: '', categoría: '', precio: '', stock: '' });
    
    useEffect(() => {
        if (productoEditando) setProducto(productoEditando);
    }, [productoEditando]);

    const enviarFormulario = async (e) => {
        e.preventDefault();
        if (!producto.nombre || !producto.categoría || producto.precio <= 0 || producto.stock < 0) {
            alert("Datos inválidos");
            return;
        }

        try {
            if (productoEditando) {
                await axios.put(`${API_URL}/productos/${producto.id}`, producto);
                setProductoEditando(null);
            } else {
                await axios.post(`${API_URL}/productos`, producto);
            }
            alGuardar();
            setProducto({ nombre: '', categoría: '', precio: '', stock: '' });
        } catch (error) {
            console.error(error);
            alert("Error al guardar el producto");
        }
    };

    return (
        <form onSubmit={enviarFormulario}>
            <input placeholder="Nombre" value={producto.nombre} onChange={(e) => setProducto({...producto, nombre: e.target.value})} />
            <input placeholder="Categoría" value={producto.categoría} onChange={(e) => setProducto({...producto, categoría: e.target.value})} />
            <input type="number" placeholder="Precio" value={producto.precio} onChange={(e) => setProducto({...producto, precio: e.target.value})} />
            <input type="number" placeholder="Stock" value={producto.stock} onChange={(e) => setProducto({...producto, stock: e.target.value})} />
            <button type="submit">{productoEditando ? 'Actualizar' : 'Guardar'}</button>
            {productoEditando && <button type="button" onClick={() => {setProductoEditando(null); setProducto({ nombre: '', categoría: '', precio: '', stock: '' })}}>Cancelar</button>}
        </form>
    );
};
export default FormularioProducto;