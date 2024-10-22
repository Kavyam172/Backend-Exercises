const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index',{name:'John Doe'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
