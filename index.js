const express = require('express')
const mongoose = require('mongoose')

const port = 6080
const app = express()

const MONGOURL = "mongodb://localhost:27017/batch"

//Connect Database with node
mongoose.connect(MONGOURL)
.then(()=>{
    console.log('database connected',MONGOURL)
}).catch((err)=>{
    console.log(`not connected`,err)
})

const sales = new mongoose.Schema({

})
const salesData = mongoose.model('sales',sales)

// Find all Data Query
app.get('/findAll',async (req,res) =>{
   const mysalesdata = await salesData.find()
   res.status(200).json(mysalesdata)
})

// Find One Query
app.get('/getOne/:id',async (req,res) =>{
    console.log(req.params)
    const {id} = req.params
    const mysingledata = await salesData.findById(id)
    console.log(">>>>>>>>>>>>singleedata<<<<<<<<<",mysingledata)
    if(!mysingledata){
        return res.status(404).json({error:'record not found'})    
    }
    res.status(200).json(mysingledata)
 })

 //Delete Query

 app.get('/deleteOne/:id',async (req,res) =>{
    console.log(req.params)
    const {id} = req.params
    const Deletedata = await salesData.findByIdAndDelete(id)
    if(!Deletedata){
        res.status(404).json('id not found')
    }
    res.status(200).json('delete successfully',Deletedata)
 })

// Find By product Query
app.get('/product/:pname',async (req,res) =>{
    console.log(req.params)
    const {pname} = req.params
    const findbyproduct = await salesData.findOne({product:pname})
    if(!findbyproduct){
        res.status(404).json('product not found')
    }
    res.status(200).json(findbyproduct)
 })

// Find By Amount 
app.get('/amount/:rate',async (req,res) =>{
    console.log(req.params)
    const {rate} = req.params
    const findbyamount = await salesData.findOne({amount:parseInt(rate)})
    if(!findbyamount){
        res.status(404).json('product not found')
    }
    res.status(200).json(findbyamount)
 })

 //Find By Quantity

 app.get('/quantity/:qty',async (req,res) =>{
    console.log(req.params)
    const {qty} = req.params
    const findbyqty = await salesData.findOne({quantity:parseInt(qty)})
    if(!findbyqty){
        res.status(404).json('product not found')
    }
    res.status(200).json(findbyqty)
 })


app.listen(port,()=>{
    console.log(`server is working ${port}`)
})
