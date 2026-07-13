import { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioProducto = ({ alGuardar, productoEditando, setProductoEditando }) => {
    const [producto, setProducto] = useState({ nombre: '', categoría: '', precio: '', stock: '' });

    // Si productoEditando cambia, rellenamos el formulario
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
                // Modo Actualizar (PUT)
                await axios.put(`http://localhost:3000/productos/${producto.id}`, producto);
                setProductoEditando(null); // Limpiar modo edición
            } else {
                // Modo Crear (POST)
                await axios.post('http://localhost:3000/productos', producto);
            }
            alGuardar();
            setProducto({ nombre: '', categoría: '', precio: '', stock: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={enviarFormulario}>
            <input placeholder="Nombre" value={producto.nombre} onChange={(e) => setProducto({...producto, nombre: e.target.value})} />
            <input placeholder="Categoría" value={producto.categoría} onChange={(e) => setProducto({...producto, categoría: e.target.value})} />
            <input type="number" placeholder="Precio" value={producto.precio} onChange={(e) => setProducto({...producto, precio: e.target.value})} />
            <input type="number" placeholder="Stock" value={producto.stock} onChange={(e) => setProducto({...producto, stock: e.target.value})} />
            <button type="submit">{productoEditando ? 'Actualizar' : 'Guardar'}</button>
            {productoEditando && <button onClick={() => {setProductoEditando(null); setProducto({ nombre: '', categoría: '', precio: '', stock: '' })}}>Cancelar</button>}
        </form>
    );
};
export default FormularioProducto;