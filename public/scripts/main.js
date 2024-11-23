// public/scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Obtener la lista de productos desde el array `productsDB`
    const products = getProductos();

    // Referencia al contenedor donde se renderizarán los productos
    const productList = document.getElementById('product-list');

    if (!productList) {
        console.error("No se encontró un elemento con id='product-list' en el DOM.");
        return;
    }

    // Renderizar los productos
    products.forEach(product => {
        const listItem = document.createElement('div');
        listItem.classList.add('col-lg-3', 'col-sm-6', 'my-3');
        listItem.innerHTML = `
            <div class='col-12 bg-white text-center h-100 product-item'>
                <div class='row h-100'>
                    <div class='col-12 p-0 mb-3'>
                        <a href="#">
                            <img src="${product.urlImg}" alt="${product.name}" class="img-fluid">
                        </a>
                    </div>
                    <div class="col-12 mb-3">
                        <a href="#" class="product-name">${product.name}</a>
                    </div>
                    <div class="col-12 mb-3">
                        <span class="product-price-old">$${product.oldPrice}</span>
                        <br>
                        <span class="product-price">$${product.price}</span>
                    </div>
                     <div class="col-12 mb-3 align-self-end">
                                <button class="btn btn-outline-dark add-to-cart" data-name="${product.name}" data-price="${product.price}" data-image="${product.urlImg}">
                                    <i class="fas fa-cart-plus me-2"></i>Agregar al carrito
                                </button>
                            </div>
                </div>
                
            </div>
        `;
        productList.appendChild(listItem);
    });

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

// Base de datos simulada
const productsDB = [
    { 
      id: 1, 
      name: 'Pizza de peperoni', 
      oldPrice: 13000, 
      price: 10000, 
      urlImg: 'https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg'
    },
    {
      id: 2, 
      name: 'Pizza especial tomate y rúcula',  
      oldPrice: 16500, 
      price: 16100, 
      urlImg: 'https://www.laespanolaaceites.com/wp-content/uploads/2019/05/pizza-al-ajo-con-tomates-frescos-1080x671.jpg'
    },
    { 
      id: 3, 
      name: '12 Empanadas',  
      oldPrice: 14500, 
      price: 9000,  
      urlImg: 'https://www.laespanolaaceites.com/wp-content/uploads/2019/06/empanadas-de-carne-de-cerdo-1080x671.jpg'
    },
    { 
      id: 4, 
      name: '6 Empanadas Horno',  
      oldPrice: 5000, 
      price: 4000,  
      urlImg: 'https://media.istockphoto.com/id/1171946922/es/foto/empanadas.jpg?s=612x612&w=0&k=20&c=Lo5Ybk5FbjjvdJcE12fSandBIdZI45P0wEVSQRzvuT8='
    },
    
  
  ];
  

// Función para obtener los productos
const getProductos = () => productsDB;

// Función para eliminar un producto del carrito
function removeItem(button) {
    button.closest(".cart-item").remove();
}