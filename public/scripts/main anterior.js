document.addEventListener('DOMContentLoaded', () => {
    // Hacer una solicitud GET al servidor para obtener la información de productos
    try {
        fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            // Manipular los datos en el frontend, por ejemplo, mostrarlos en la lista
            const productList = document.getElementById('product-list');
  
            // Lista de las 4 imágenes proporcionadas
            const images = [
                "https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg",
                "https://www.laespanolaaceites.com/wp-content/uploads/2019/05/pizza-al-ajo-con-tomates-frescos-1080x671.jpg",
                "https://www.laespanolaaceites.com/wp-content/uploads/2019/06/empanadas-de-carne-de-cerdo-1080x671.jpg",
                "https://media.istockphoto.com/id/1171946922/es/foto/empanadas.jpg?s=612x612&w=0&k=20&c=Lo5Ybk5FbjjvdJcE12fSandBIdZI45P0wEVSQRzvuT8="
            ];
  
            // Mostrar los productos (en este caso las imágenes de forma estática)
            images.forEach((imgUrl, index) => {
                const listItem = document.createElement('div');
                listItem.classList.add('col-lg-3', 'col-sm-6', 'my-3');
  
                listItem.innerHTML = `
                    <div class='col-12 bg-white text-center h-100 product-item'>
                        <div class='row h-100'>
                            <div class='col-12 p-0 mb-3'>
                                <a href="#">
                                    <!-- Usando la URL de la imagen -->
                                    <img src="${imgUrl}" class="img-fluid" alt="Imagen ${index + 1}">
                                </a>
                            </div>
                            <div class="col-12 mb-3">
                                <a href="#" class="product-name">Producto ${index + 1}</a>
                            </div>
                            <div class="col-12 mb-3">
                                <span class="product-price-old">$100</span>
                                <br>
                                <span class="product-price">$80</span>
                            </div>
                            <div class="col-12 mb-3 align-self-end">
                                <button class="btn btn-outline-dark add-to-cart" data-name="Producto ${index + 1}" data-price="80" data-image="${imgUrl}">
                                    <i class="fas fa-cart-plus me-2"></i>Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                productList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    } catch (e) {
        console.log('Error en el try-catch');
        console.log(e);
    }

    // Manejar la adición de productos al carrito
    document.getElementById('product-list').addEventListener('click', function(event) {
        if (event.target && event.target.matches('.add-to-cart')) {
            // Obtener los datos del producto (nombre, precio, imagen)
            const productName = event.target.dataset.name;
            const productPrice = event.target.dataset.price;
            const productImage = event.target.dataset.image;

            // Crear el elemento del carrito
            const cartItem = `
                <div class="cart-item d-flex justify-content-between mb-2">
                    <img src="${productImage}" alt="${productName}" class="cart-item-image" style="width: 50px;">
                    <div class="cart-item-info d-flex flex-column justify-content-center">
                        <span>${productName}</span>
                        <span>$${productPrice}</span>
                    </div>
                    <button class="btn btn-danger btn-sm remove-item" onclick="removeItem(this)">X</button>
                </div>
            `;

            // Agregar el producto al carrito
            document.getElementById("cart-items").insertAdjacentHTML('beforeend', cartItem);

            // Mostrar el carrito de compras (modal)
            $("#shopping-cart").modal("show");
        }
    });
});

// Función para eliminar un producto del carrito
function removeItem(button) {
    button.closest(".cart-item").remove();
}

