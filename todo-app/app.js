const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',(req,res)=>{
    let tasklist = JSON.parse(fs.readFileSync(path.join(__dirname,"/data/tasklist.json")))
    // console.log(tasklist)
    console.log('get')
    res.render('index',{tasklist:tasklist})
})

app.post('/addtask',(req,res)=>{
    const {taskname} = req.body
    // console.log(taskname)
    let newtask = {
        id:Date.now(),
        name:taskname,
        completed:false
    }

    let tasklist = JSON.parse(fs.readFileSync(path.join(__dirname,"/data/tasklist.json")))
    tasklist.push(newtask)
    fs.writeFileSync(path.join(__dirname,"/data/tasklist.json"),JSON.stringify(tasklist))

    res.redirect("/")
})

//delete task
app.get('/remove/:id',(req,res)=>{
    const taskid = req.params.id
    let tasklist = JSON.parse(fs.readFileSync(path.join(__dirname,"/data/tasklist.json")))
    tasklist = tasklist.filter((task)=>task.id!=taskid)
    fs.writeFileSync(path.join(__dirname,"/data/tasklist.json"),JSON.stringify(tasklist))

    res.redirect("/")
})

//update task
app.post('/updatetask',(req,res)=>{
    const {taskid} = req.body
    let tasklist = JSON.parse(fs.readFileSync(path.join(__dirname,"/data/tasklist.json")))
    tasklist = tasklist.map((task)=>{
        if(task.id==taskid){
            task.completed = !task.completed
        }
        return task
    })
    fs.writeFileSync(path.join(__dirname,"/data/tasklist.json"),JSON.stringify(tasklist))

    res.redirect("/")
})

//change priority of task
app.post('/increasepriority',(req,res)=>{
    const {taskid} = req.body
    let tasklist = JSON.parse(fs.readFileSync(path.join(__dirname,"/data/tasklist.json")))
    let index = tasklist.findIndex((task)=>task.id==taskid)
    if(index>0){
        let temp = tasklist[index]
        tasklist[index] = tasklist[index-1]
        tasklist[index-1] = temp
    }
    fs.writeFileSync(path.join(__dirname,"/data/tasklist.json"),JSON.stringify(tasklist))
    res.redirect("/")
    // res.render('index',{tasklist:tasklist})
})

app.post('/decreasepriority',(req,res)=>{
    const {taskid} = req.body
    let tasklist = JSON.parse(fs.readFileSync(path.join(__dirname,"/data/tasklist.json")))
    let index = tasklist.findIndex((task)=>task.id==taskid)
    if(index<tasklist.length-1){
        let temp = tasklist[index]
        tasklist[index] = tasklist[index+1]
        tasklist[index+1] = temp
    }
    fs.writeFileSync(path.join(__dirname,"/data/tasklist.json"),JSON.stringify(tasklist))

    res.redirect("/")
})

app.listen(port,(req,res)=>{
    console.log(`Example app listening at http://localhost:${port}`)
})