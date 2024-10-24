const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const items = [
    'The Matrix',
    'The Godfather',
    'The Shawshank Redemption',
    'The Lord of the Rings',
    'The Dark Knight',
];
app.get('/search', (req, res) => {
    const query = req.query.q;
    //filter the results
    const result = query ? items.filter((item) => item.toLowerCase().includes(query.toLowerCase())): items;

    res.render('search', { result });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

