const { urlencoded } = require("body-parser")
const { log } = require("console")
const express = require("express")

const mongoose = require("mongoose")

const app = express()

const bodyparser = require("body-parser")
const { stat } = require("fs")

app.use(bodyparser.urlencoded({extended:false}))

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/Sample").then(()=>{
    console.log("Connected to MongoDB");
    
}).catch((err) => {

    console.log(err);
    
})

//Building the product schema

const productSchema = new mongoose.Schema({

    name:String,
    description:String,
    price:String,
})

//Creating a model

const Product =  mongoose.model("Product",productSchema)

// const adder = async() => {

//     const ps = await Product.create({


//     })
// }


//koi bhi ye link yaa ye api pe jaaega, ek Product name ka Schema create hoga and body se req karega data then status show karega.
app.post("/api/v1/product/new",async(req,res) => {

    const smproduct = await Product.create(req.body)

    //show status

    res.status(201).json({

        status:true,
        smproduct
    })
})

//Read Product

app.get("/api/v1/products",async(req,res)=>{

    const rdProduct = await Product.find()

    res.status(200).json({
        
        status:true,
        rdProduct
    })
})

//Update Product

app.put("/api/v1/product/:id",async(req,res)=>{

    let upProduct = await Product.findById(req.params.id);

    upProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, useFindAndModify:true, runValidators:true})

   res.status(200).json({

    status:true,
    upProduct
   })
})

//Delete Product
app.delete("/api/v1/dlproduct/:id",async(req,res)=>{

    const dlProduct = await Product.findById(req.params.id);

    //dlProduct = await Product.findByIdAndDelete(req.params.id)
    if(!dlProduct)
    {
        return res.status(500).json({
            status:false,
            message: "Product not found"
        })
    }
    
    //await dlProduct.remove();

    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status:true,
        //after deletion does not need to send product
        // dlProduct
        message:"Producct deleted successfully'"
    })


    
})


const PORT = 4500;

app.listen(PORT, ()=>{

    console.log("Server is working on http://localhost:4500");
    
})