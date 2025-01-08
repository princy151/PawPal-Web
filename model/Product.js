const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    item_name:{
        type:String,
        required:true   
    },
    item_type:{
        type:String,
        required:true   
    },
    item_colour:{
        type:String,
        required:true   
    },
})

const Item = mongoose.model("items",customerSchema);

module.exports = Item;  