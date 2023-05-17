const express = require("express")
const app = express()
const PORT = 3000
const path = require("path")
const mongoose = require("mongoose")
const Food = require("./models/food")
const people = require("./models/people")


mongoose.connect("mongodb://0.0.0.0:27017/DBfood")
    .then(() => {
        console.log("Connecting to DB")
    }).catch((err) => {
        console.log(err)
    });


app.use(express.static("public"))
app.listen(PORT, ()=>console.log(`Server started listen ${PORT}`))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")
const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`)

app.get("/", (req, res)=> {
    const title = "Stolovka"
    
    res.render(createPath("home"), {title})
})

app.get("/add", (req, res)=> {
    const title = "Stolovka"
    
    res.render(createPath("add"), {title})
})

app.get("/products", (req, res)=> {
    let allFoods = []
    Food.find()
    .then((foods)=>{
        allFoods = [...foods]
        res.render(createPath("products"), {allFoods})

    })
 
})

app.get("/auto", (req, res)=> {
    const title = "auto"
    
    res.render(createPath("auto"), {title})
})


app.get("/zakaz",(req, res)=>{
    let arrPeople=[]
    people.find()
    .then((ps)=>{
        arrPeople = [...ps]
        res.render(createPath("zakaz"), {arrPeople})

    })
})

app.post("/zakaz", async(req, res)=>{
    let arrPeople = []
    let name = req.body.name
    let surname = req.body.surname
    const peoplee = new people({
        name, 
        surname
    })
     await peoplee.save()

     people.find()
     .then((ps)=>{
         arrPeople = [...ps]
         res.render(createPath("zakaz"), {arrPeople})
 
     })
})

app.post("/add", async(req, res)=>{
    allFoods = []
    let name = req.body.name
    let price = req.body.price
    let img = req.body.img
    const food = new Food({
        name, 
        price,
        img

    })
     await food.save()

     Food.find()
     .then((foods)=>{
        console.log(foods)
         allFoods = [...foods]
        res.render(createPath("products"), {allFoods})
 
     })
})


app.get("/zakaz/:id", (req, res)=>{
     people.find({_id: req.params.id})
     .then((ps)=>{
         let peop = ps[0]
         console.log(peop)
         res.render(createPath("people"), {peop})
 
     })
})

app.get("/error", (req, res)=>res.render(createPath("error")))


app.post("/zakaz/:id", (req, res)=>{
    arrPeople = []
    people.deleteOne({_id: req.params.id})
    .then((ps)=>{
        // let peop = ps[0]
        console.log(ps)
        

    })

    people.find()
        .then((ps)=>{
            arrPeople = [...ps]
            res.render(createPath("zakaz"), {arrPeople})
    
        })
})


app.delete("/zakaz/:id", (req, res)=>{
    arrPeople = []

    people.findByIdAndDelete(req.params.id)
    .then()

    people.find()
    .then((ps)=>{
        console.log(2)
        arrPeople = [...ps]
        res.render(createPath("zakaz"), {arrPeople})

    })
})



//autorization---------------------------------------------------

function auto(){

}


app.post("/auto", async(req, res)=>{
    let arrPeople = []
    let name = req.body.name
    let surname = req.body.surname
    people.find()
     .then((ps)=>{
         arrPeople = [...ps]
        for(let i = 0;i<arrPeople.length;i++){
            if(arrPeople[i].name == name && arrPeople[i].surname == surname){
                console.log(1)
                res.render(createPath("zakaz"), {arrPeople})
                return
            } else{
               console.log(2)
               res.render(createPath("error"))

               return
            }
        }
        })
    


})


