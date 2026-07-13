import { useState } from 'react';
import Navbar from './components/Navbar';
import TablaProductos from './components/TablaProductos';
import FormularioProducto from './components/FormularioProducto';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [productoEditando, setProductoEditando] = useState(null);
  const [refrescar, setRefrescar] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <FormularioProducto 
        alGuardar={() => setRefrescar(!refrescar)} 
        productoEditando={productoEditando} 
        setProductoEditando={setProductoEditando} 
      />
      <TablaProductos key={refrescar} onEditar={setProductoEditando} />
      <Footer />
    </div>
  );
}
export default App;