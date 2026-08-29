// Snippet 1: Import carLib.js
const Car = require("./carLib");

// Snippet 2: Get All Cars
const getAllCars = (req, res) => {
  const cars = Car.getAll();
  res.json(cars);
};

// Snippet 3: Create a New Car
const createCar = (req, res) => {
  const { model, color, age } = req.body;
  const newCar = Car.addOne(model, color, age);

  if (newCar) {
    res.json(newCar);
  } else {
    res.status(500).json({ message: "Failed to create car" });
  }
};

// Snippet 4: Get a Car by ID
const getCarById = (req, res) => {
  const carId = req.params.carId;
  const car = Car.findById(carId);
  
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
};

// Snippet 5: Update a Car by ID
const updateCar = (req, res) => {
  const carId = req.params.carId;
  const { model, color, age } = req.body;
  const updatedCar = Car.updateOneById(carId, { model, color, age });

  if (updatedCar) {
    res.json(updatedCar);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
};

// Snippet 6: Delete a Car by ID
const deleteCar = (req, res) => {
  const carId = req.params.carId;
  const isDeleted = Car.deleteOneById(carId);

  if (isDeleted) {
    res.json({ message: "Car deleted successfully" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
};

// Snippet 7: Export the Handlers
module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
