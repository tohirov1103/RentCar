const {Client,Rent,CarRent} = require('../models/models');

const addCar = async (req, res) => {
    try {
      let cars = await CarRent.find({});
      let id;
      if (cars.length > 0) {
        let last_product_array = cars.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
      } else {
        id = 1;
      }
      const product = new CarRent({
        id: id,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        year: req.body.year,
        color: req.body.color,
        numOfseats: req.body.numOfseats,
        fuelType: req.body.fuelType,
      });
      console.log(product);
      await product.save();
      console.log("Saved");
      res.json({
        success: true,
        name: req.body.name,
      });
    } catch (error) {
      console.error("Error adding car:", error);
      res.status(500).json({
        success: false,
        error: "An error occurred while adding the car.",
      });
    }
};

// const removeCar = async(req,res)=>{
//     const findId = Number(req.params.id);
//     await CarRent.findOneAndDelete({id:findId});
//     console.log("Removed");
//     res.json({
//         success:true,
//         name:req.body.name,
//     })
// }
const removeCar = async (req, res) => {
    try {
      const carId = Number(req.params.id);
      const deletedCar = await CarRent.findOneAndDelete({ id: carId });
      if (!deletedCar) {
        return res.status(404).json({ error: "Car not found" });
      }
      console.log(`Car with ID ${carId} has been removed.`);
      res.json({
        success: true,
        message: "Car has been removed",
        car: {
          id: deletedCar.id,
          name: deletedCar.name,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
};

const getAllCar = async(req,res)=>{
    let cars = await CarRent.find({});
    if(cars){
     res.send(cars);
    }
}

const getAvailableCars = async (req, res) => {
    try {
      const availableCars = await CarRent.find({ available: true });
      res.json({ data: availableCars });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getPopularCars = async(req,res)=>{
    let cars = await CarRent.find({});
    let popularcars = cars.slice(1).slice(-8);
    res.json(popularcars); 
}

const getUserInfo = async(req,res)=>{
    try{
        const email = req.body.email;
        const user = await Client.findOne({email:email});
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        res.json({
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            phonenumber:user.phonenumber
        })
    }catch(error){
        console.error(error)
    }
}

const rentCar = async(req,res)=>{
    let carId = Number(req.params.id)
    let car = await CarRent.findOne({id:carId});
    if(!car){
        res.json({error:"Car not found"})
    }
    // Find the user
    let user = await Client.findOne({ id: req.body.userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { id, dateOfRent, timeOfRent, dateOfReturn, timeOfReturn } = req.body;
    const newRent = new Rent({
        car:car._id,
        user:user._id,
        dateOfRent,
        timeOfRent,
        dateOfReturn,
        timeOfReturn
    })
    await CarRent.updateOne({ _id: car._id }, { available: false });
    await newRent.save();

    res.status(201).json({
        success:true,
        message:"Car booked"
    });
}

const getRentedCars = async (req, res) => {
    try {
      let rentedCars = await Rent.find({});
      res.json(rentedCars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching rented cars' });
    }
}

const getSingleCar = async(req,res)=>{
    try {
        const carId = Number(req.params.id);
        const findCar = await CarRent.findOne({id:carId})
        if (!carId) {
          return res.status(404).json({ error: "Car not found" });
        }
        console.log(`Car with ID ${carId} has been found.`);
        res.json({
          success: true,
          message: "Car has been found",
          findCar
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
}

module.exports = {addCar,removeCar,getAllCar,getPopularCars,getUserInfo,rentCar,getRentedCars,getSingleCar,getAvailableCars}