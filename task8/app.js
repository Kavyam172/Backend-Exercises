const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

//middleware for form validation
const validateForm = (req, res, next) => {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
        res.status(401).send('All fields are required')
    } else {
        next()
    }
}

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.post('/contact',validateForm, (req, res) => {
    const { name, email, message } = req.body
    res.render('thank-you', { name, email, message })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})