const mongoose = require('mongoose');
const {Schema}=mongoose;
const productSchema = new mongoose.Schema({
  category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
  name: { type: String, required: true },
  productCount: { type: String, required: true },
  specs: { type: [String], required: true },
  originalPrice: { type: String, required: true }, 
  currentPrice: { type: String, required: true }, 
  image: { type: String, required: false }
});

module.exports = mongoose.model('Product', productSchema);

// const mongoose=require('mongoose');
// const {Schema}=mongoose;

// const productSchema=new Schema({
//     category:{
//         type:Schema.Types.ObjectId,
//         ref:'Category',
//         required:true
//     },
//     name:{
//         type:String,
//         required:true
//     },
//     productCount:{
//         type:String,
//         required:true
//     },
//     specs:{
//         type:String,
//         required:true
//     },
//     originalPrice:{
//         type:String,
//         required:true
//     },

//     currentPrice:{
//         type:String,
//         required:true
//     },
//     image: { type: String, required: true }
// });

// const Product=mongoose.model('Product',productSchema);
// module.exports=Product;