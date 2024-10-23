const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

const products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Mouse', price: 20 },
    { name: 'Keyboard', price: 50 },
    { name: 'Monitor', price: 150 },
];
app.get('/products', (req, res) => {
    let search = req.query.search;
    if(!search) {
        return res.render('index', { products });
    }
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    res.render('index', { products:filteredProducts });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});