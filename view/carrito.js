document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const carritoContainer = document.getElementById('carrito');
    const carritoItemsContainer = document.getElementById('carrito-items');
    const carritoTotalEl = document.getElementById('carrito-total');
    const contadorCarrito = document.getElementById('contador-carrito');
    const verCarritoBtn = document.getElementById('ver-carrito');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
    const carritoOverlay = document.getElementById('carrito-overlay');
    const comprarBtn = document.getElementById('comprar-btn');
    const botonesAgregar = document.querySelectorAll('.producto button');

    // Cargar carrito desde LocalStorage o inicializarlo vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // --- FUNCIONES ---

    /**
     * Actualiza la vista del carrito (items, total y contador)
     * y guarda el estado en LocalStorage.
     */
    const actualizarCarrito = () => {
        carritoItemsContainer.innerHTML = ''; // Limpiar para no duplicar
        let total = 0;

        if (carrito.length === 0) {
            carritoItemsContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 20px 0;">Tu carrito está vacío.</p>';
        } else {
            carrito.forEach((producto, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('carrito-item');
                itemDiv.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="carrito-item-info">
                        <h4>${producto.nombre}</h4>
                        <span>${producto.precio}</span>
                    </div>
                    <button class="quitar-item-btn" data-index="${index}" title="Quitar producto">X</button>
                `;
                carritoItemsContainer.appendChild(itemDiv);

                // Extraer el valor numérico del precio y sumarlo al total
                const precioNumerico = parseFloat(producto.precio.replace(/[^0-9]/g, ''));
                total += precioNumerico;
            });
        }
        
        // Formatear el total a pesos colombianos y actualizar el DOM
        carritoTotalEl.textContent = total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
        contadorCarrito.textContent = carrito.length;
        
        // Guardar el carrito actualizado en LocalStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    /**
     * Muestra u oculta el panel del carrito y el overlay.
     */
    const toggleCarrito = () => {
        carritoContainer.classList.toggle('visible');
        carritoOverlay.classList.toggle('visible');
    };

    /**
     * Extrae la información de un producto y lo añade al carrito.
     * @param {Event} e - El evento de click del botón.
     */
    const agregarAlCarrito = (e) => {
        const productoDiv = e.target.closest('.producto');
        const producto = {
            nombre: productoDiv.querySelector('h3').textContent,
            precio: productoDiv.querySelector('span').textContent,
            imagen: productoDiv.querySelector('img').src,
        };
        carrito.push(producto);
        actualizarCarrito();
        // Mostrar el carrito al agregar un nuevo producto
        if (!carritoContainer.classList.contains('visible')) {
            toggleCarrito();
        }
    };

    /**
     * Quita un producto del carrito basado en su índice.
     * @param {Event} e - El evento de click del botón "Quitar".
     */
    const quitarDelCarrito = (e) => {
        if (e.target.classList.contains('quitar-item-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    };
    
    /**
     * Simula la compra, vacía el carrito y muestra un mensaje.
     */
    const finalizarCompra = () => {
        if (carrito.length > 0) {
            alert('✅ ¡Compra hecha con éxito!');
            carrito = []; // Vaciar el array
            actualizarCarrito(); // Actualizar la vista
            toggleCarrito(); // Ocultar el carrito
        } else {
            alert('Tu carrito está vacío. ¡Añade productos antes de comprar!');
        }
    };

    // --- EVENT LISTENERS ---

    // Abrir el carrito
    verCarritoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCarrito();
    });

    // Cerrar el carrito
    cerrarCarritoBtn.addEventListener('click', toggleCarrito);
    carritoOverlay.addEventListener('click', toggleCarrito);

    // Agregar productos al carrito
    botonesAgregar.forEach(button => button.addEventListener('click', agregarAlCarrito));

    // Quitar productos (usando delegación de eventos para los botones que se crean dinámicamente)
    carritoItemsContainer.addEventListener('click', quitarDelCarrito);
    
    // Botón de Comprar
    comprarBtn.addEventListener('click', finalizarCompra);

    // Cargar el estado del carrito al iniciar la página por primera vez
    actualizarCarrito();
});