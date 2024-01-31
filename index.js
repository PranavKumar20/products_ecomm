const express = require('express');
const {zod} = require('zod');
const Product = require("./db");

const app = express();
app.use(express.json());

const createBody = zod.object({
    name:zod.string().min(1),
    description:zod.string().min(1),
    price:zod.number().positive(),
    varients:zod.array(zod.string())
})

app.post("/create", async (req,res)=>{
    const {success} = req.body.safeParse(createBody);
    if(!success){
        res.status(403).json({
            msg:"Incorrect Inputs"
        })
    }
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        print: req.body.price,
        varients: req.body.varients
    })
    
    res.status(200).json({
        msg:"Product Created successfullly"
    })
})

const UpdateBody = zod.object({
    name: zod.string().optional(),
    description: zod.string().optional(),
    price: zod.number().optional(),
    varients: zod.array(zod.string()).optional()
})

app.put("/update/:id", async (req,res)=>{
    const {success} = req.body.safeParse(UpdateBody);
    if(!success){
        res.status(403).json({
            msg:"Incorrect Inputs"
        })
    }
    const result = await Product.updateOne(req.body,{
        _id:req.params.id
    })

    if(result.n === 0){
        return res.status(404).json({
            msg:"Product not found"
        })
    }

    res.status(200).json({
        msg:"Product updated successfully"
    })
})

app.delete("/delete/:id", async(req,res)=>{
    const productId=req.params.id;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        msg: "Product not found"
      });
    }

    await Product.deleteOne({ _id: productId });

    res.status(200).json({
      msg: "Product deleted successfully"
    });
})


app.listen(port,()=>{
    console.log(`server is listening on port: ${port}`);
})