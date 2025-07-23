const API_URL = 'https://backend-pizzeria-jcbr.onrender.com/productos'; // ← cámbialo por tu URL real

const form = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const precioInput = document.getElementById('precio');
const imagenInput = document.getElementById('imagen');
const idInput = document.getElementById('producto-id');
const btnCancelar = document.getElementById('cancelar');
const productosDiv = document.getElementById('productos');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const producto = {
    nombre: nombreInput.value,
    precio: parseFloat(precioInput.value),
    imagen: imagenInput.value
  };

  const id = idInput.value;

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
  }

  resetForm();
  cargarProductos();
});

btnCancelar.addEventListener('click', resetForm);

function resetForm() {
  idInput.value = '';
  nombreInput.value = '';
  precioInput.value = '';
  imagenInput.value = '';
  btnCancelar.style.display = 'none';
}

async function cargarProductos() {
  const res = await fetch(API_URL);
  const productos = await res.json();
  productosDiv.innerHTML = '';

  productos.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <strong>${prod.nombre}</strong> - R$ ${prod.precio.toFixed(2)}
      <br />
      ${prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" />` : ''}
      <br />
      <button onclick="editarProducto('${prod._id}', '${prod.nombre}', ${prod.precio}, '${prod.imagen || ''}')">Editar</button>
      <button onclick="eliminarProducto('${prod._id}')">Eliminar</button>
    `;
    productosDiv.appendChild(div);
  });
}

function editarProducto(id, nombre, precio, imagen) {
  idInput.value = id;
  nombreInput.value = nombre;
  precioInput.value = precio;
  imagenInput.value = imagen;
  btnCancelar.style.display = 'inline-block';
}

async function eliminarProducto(id) {
  if (confirm('¿Eliminar este producto?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargarProductos();
  }
}

window.onload = cargarProductos;
