const express = require('express');
const router = express.Router();
const stockController = require('../../controllers/distributors/stockController');

// Add a new process record
router.post("/add", stockController.addstock);

// Retrieve all process records
router.get("/", stockController.getAllstock);

// Retrieve a specific process record by ID
router.get("/get/:id", stockController.getstockById);

// Update a process record
router.patch("/update/:id", stockController.updatestock);

// Delete a process record
router.delete("/delete/:id", stockController.deletestock);

router.get("/fertilizers", stockController.getFertilizerNames);

// Route for getting stores by selected fertilizer name
router.get('/stores', stockController.getStoresByFertilizer);


module.exports = router;
