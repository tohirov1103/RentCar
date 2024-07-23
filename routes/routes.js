// carRoutes.js
const express = require('express');
const router = express.Router();
const {
  addCar,
  removeCar,
  getAllCar,
  getPopularCars,
  getUserInfo,
  rentCar,
  getRentedCars,
  getSingleCar,
  getAvailableCars,
  getAllUsers,
  deleteUser,
  getRentalById
} = require('../controllers/operations');

const {signupUser,loginUser} = require('../controllers/login');

// Add car route
router.post('/cars', addCar);
// Remove car route
router.delete('/cars/:id', removeCar);
// Get all cars route
router.get('/cars', getAllCar);
// Get not rented cars route
router.get('/cars/notrented',getAvailableCars);
// Get popular cars route
router.get('/cars/popular', getPopularCars);
// Get user info route
router.get('/users/info', getUserInfo);
// Rent car route
router.post('/cars/rent/:id', rentCar);
// Get rented cars route
router.get('/cars/rented', getRentedCars);
// Get single car route
router.get('/cars/:id',getSingleCar)
// Get all users route
router.get('/user',getAllUsers);
// Delete user route
router.delete('/user/:id',deleteUser);
// Get RentById route
router.get('/rentals/:id',getRentalById);

router.post('/signup',signupUser);
router.post('/login',loginUser);

module.exports = router;


/*
POST /api/cars => for adding a car
DELETE /api/cars => for removing a car
GET /api/cars => for getting all cars
GET /api/cars/popular => for getting popular cars
POST /api/users/info => for getting user info
POST /api/cars/rent => for renting a car
GET /api/cars/rented => for getting rented cars
 */