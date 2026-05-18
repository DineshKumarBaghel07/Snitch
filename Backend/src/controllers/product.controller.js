import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"





export const handleCreateProduct = async (req, res) => {
  try {

    const {
      title,
      description,
      priceAmount,
      currency,
      stock,
      attributes
    } = req.body;

    const seller = req.user;

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname
        });
      })
    );

    const parsedAttributes = JSON.parse(attributes || "{}");

    const product = await productModel.create({
      title,
      description,
      seller: seller._id,

      variants: [
        {
          images: uploadedImages,

          stock: stock || 0,

          attributes: parsedAttributes,

          price: {
            amount: priceAmount,
            currency: currency || "INR"
          }
        }
      ]
    });

    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      product
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
      success: false
    });

  }
};


export const handleGetProductSeller = async (req, res) => {
  try {

    const seller = req.user

    if (!seller) {
      return res.status(401).json({ message: "bad Request", success: false })
    }
    const products = await productModel.find({ seller: seller._id })
    if (!products) {
      return res.
      status(404).
      json(
        { 
          message: "Products not available",
           success: false 
        })
    }

    return res.status(200).json({ message: "Products fetch successfully", success: true, products })
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false })
  }

}


export const handleGetAllProducts = async (req,res) => {
    try{
      const products = await productModel.find({});
      if(!products){
        return res.status(404).json({message:"Products not available.",success:false})
      }
      return res.status(200).json({message:"Products available",success:true,products})
    }catch(err){
      return res.status(500).json({message:err.message,success:false})
    }
}


export const handleGetProductDetails = async (req,res) => {
  try{
    const {id} = req.params;

    if(!id){
      return res.status(404).json({message:"Id not Define",success:false})
    }

    const product = await productModel.findById(id)
    if(!product){
      return res.status(404).json({message:"product not Found.",success:false})
    }

    return res.status(200).json({message:"Product found",success:true,product})
  }catch(err){
    return res.status(500).json({message:err.message,success:false})
  }
}

export const handleAddProductVariant = async(req,res) => {
  const productId = req.params.productId;
 
  const product = await productModel.findOne({_id:productId,seller:req.user._id})
   
  if(!product){
    return res.status(404).json({
      messgae:"Product not found",
      success:false
    })
  }
  const files = req.files;
  const images =[];
  if(files && files.length !==0){
     (await Promise.all(files.map(async(file)=>{
      const image = await uploadFile({
        buffer: file.buffer,
        fileName:file.originalname
      })
    return image
    }))).map(image => images.push(image))
  }

  const price = req.body.priceAmount;
  const stock = req.body.stock
  const attributes = JSON.parse(req.body.attributes || "{}")

  console.log(images,price,stock,attributes)
  product.variants.push({
    images,
    price:{
      amount:price,
      currency:req.body.priceCurrency || "INR"
    },
    stock,
    attributes
  })
 
  await product.save();

  return res.status(200).json({
    message:"variants successfully added",
    success:true,
    product
  })
  
}