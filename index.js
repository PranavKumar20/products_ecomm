const express = require('express');
const zod = require('zod');
const Products = require("./db");

const app = express();
app.use(express.json());
const port = 3000;

const createBody = zod.object({
    name:zod.string().min(1),
    description:zod.string().min(1),
    price:zod.number().positive(),
    variants:zod.array(zod.string())
})

app.post("/create", async (req,res)=>{
    const {success} = createBody.safeParse(req.body);
    if(!success){
        res.status(403).json({
            msg:"Incorrect Inputs"
        })
    }
    const product = await Products.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        variants: req.body.variants
    })
    
    res.status(200).json({
        msg:"Product Created successfullly"
    })
})

app.get("/get", async (req,res)=>{
    const products = await Products.find({});
    res.status(200).json({
        products: products
    })
})

const UpdateBody = zod.object({
    name: zod.string().optional(),
    description: zod.string().optional(),
    price: zod.number().optional(),
    variants: zod.array(zod.string()).optional()
})

app.put("/update", async (req,res)=>{
    const {success,data} = UpdateBody.safeParse(req.body);
    if(!success){
        res.status(403).json({
            msg:"Incorrect Inputs"
        })
    }
    const result = await Products.updateOne({
        _id:req.query.id
    },{
        $set:data
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

app.delete("/delete", async(req,res)=>{
    const productId=req.query.id;
    const existingProduct = await Products.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        msg: "Product not found"
      });
    }

    await Products.deleteOne({ _id: productId });

    res.status(200).json({
      msg: "Product deleted successfully"
    });
})


const searchBody = zod.object({
    name:zod.string().optional(),
    description:zod.string().optional(),
    variants:zod.array(zod.string()).optional()
})

app.get("/search", async(req,res)=>{

    const { query } = req.query;

    const products = await Products.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, 
          { description: { $regex: query, $options: 'i' } }, 
          { variants: { $in: [query] } }, 
        ],
      });
  
      res.status(200).json(products);
})

app.listen(port,()=>{
    console.log(`server is listening on port: ${port}`);
})