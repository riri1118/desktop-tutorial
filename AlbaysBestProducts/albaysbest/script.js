// Supabase setup
const supabaseUrl = 'YOUR_SUPABASE_URL'; // replace with your Supabase URL
const supabaseKey = 'YOUR_SUPABASE_PUBLIC_KEY'; // replace with your Supabase public API key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Cart data
let cart = [];

// Function to add product to cart
async function addToCart(button) {
    const productElement = button.closest('.product');
    const productId = productElement.getAttribute('data-id');
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));
    const userId = 'test-user-id'; // Replace with the actual user ID if using authentication

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Add the cart item to Supabase
    const { data, error } = await supabase
        .from('cart')
        .upsert({
            user_id: userId,
            product_name: productName,
            price: productPrice,
            quantity: 1 // Update this if necessary
        });

    if (error) {
        console.error("Error adding to cart:", error);
    } else {
        console.log("Item added to Supabase:", data);
    }

    updateCart();
}

// Update cart UI and recalculate total
async function updateCart() {
    const cartItemsContainer = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price-display');
    let totalPrice = 0;
    cartItemsContainer.innerHTML = '';

    // Display cart items
    cart.forEach(item => {
        const row = document.createElement('div');
        row.innerHTML = `
            <div>${item.name}</div>
            <div>₱${item.price}</div>
            <div>Quantity: ${item.quantity}</div>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItemsContainer.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    // Update total price
    totalPriceElement.textContent = `Total: ₱${totalPrice.toFixed(2)}`;
}

// Function to remove an item from the cart
async function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    // Remove from Supabase
    const { data, error } = await supabase
        .from('cart')
        .delete()
        .match({ id: productId });

    if (error) {
        console.error("Error removing from cart:", error);
    } else {
        console.log("Item removed from Supabase:", data);
    }

    updateCart();
}

// Function to handle checkout
async function checkout() {
    // Perform checkout logic, e.g., clear cart in Supabase
    const { data, error } = await supabase
        .from('cart')
        .delete()
        .match({ user_id: 'test-user-id' });

    if (error) {
        console.error("Error during checkout:", error);
    } else {
        console.log("Checkout successful:", data);
        cart = [];
        updateCart();
    }
}
