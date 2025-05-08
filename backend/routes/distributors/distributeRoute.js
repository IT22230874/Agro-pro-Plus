const express = require('express');
const router = express.Router();
const distributeController = require('../../controllers/distributors/distributeController');

// Add a new process record
router.post("/add", distributeController.adddistribute);

// Retrieve all process records
router.get("/", distributeController.getAlldistribute);

// Retrieve a specific process record by ID
router.get("/get/:id", distributeController.getdistributeById);

// Update a process record
router.patch("/update/:id", distributeController.updatedistribute);

// Delete a process record
router.delete("/delete/:id", distributeController.deletedistribute);

// Route for getting nearby distributors
router.get('/nearby', distributeController.getNearbyDistributors);

module.exports = router;
