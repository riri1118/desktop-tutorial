async function fetchProducts() {
    try {
        const { data, error } = await supabase
            .from('products') // Replace 'products' with your table name
            .select('*');

        if (error) {
            console.error('Error fetching products:', error);
            return;
        }

        // Populate data in your HTML
        const productList = document.getElementById('product-list');
        productList.innerHTML = data
            .map(product => `<li>${product.name} - ${product.price}</li>`)
            .join('');
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

// Call the function when the page loads
window.onload = fetchProducts;
