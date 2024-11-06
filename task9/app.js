const express = require('express')
const fs = require('fs')
const path = require('path')
const upload = require('./config/multerConfig')
const app = express()
const port = 3000

app.use(express.static('uploads'))
app.set('view engine', 'ejs')

//read the products from a file
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/products.json'), 'utf-8'))



app.get('/', (req, res) => {
    console.log(products)
    
    res.render('index', { products })
})

//path to the upload product page
app.get('/upload', (req, res) => {
    res.render('upload')
})

//path to the upload product page
app.post('/upload',upload.single('image'), (req, res) => {
    //upload the product to the file
    const { name, description } = req.body
    const image = "/uploads/" + req.file.filename
    products.push({ name, description, image })
    fs.writeFileSync(path.join(__dirname, '/db/products.json'), JSON.stringify(products))
    res.redirect('/')
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
