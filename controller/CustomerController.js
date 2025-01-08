const Customer = require("../model/Customer");

const findAll = async (req, res) => {
    try{
    const customer = await Customer.find();
    res.status(200).json(customer);
    }
    catch(e){
        res.json(e);
    }
}


const save = async (req, res) => {  
    try{
        const customer = new Customer(req.body);
        await customer.save();
        res.status(200).json(customer)
    }
    catch(e){
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try{
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
    }
    catch(e){
        res.json(e)
    }

}

const deletebyId = async (req, res) => {
    try{
        const customer = await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json("data deleted");
    }
    catch(e){
        res.json(e)
    }

}

const update = async (req, res) => {
    try{
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(201).json(customer);
    }
    catch(e){
        res.json(e)
    }

}

module.exports = {findAll, save, findbyId, deletebyId, update}