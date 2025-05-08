const express = require('express');
const router = express.Router();
const financeController = require('../../controllers/finance/financeController');

// Add a new process record
router.post("/add", financeController.addBudgetPlan);
router.post("/add2", financeController.addBudgetPlan2);

// Retrieve all process records
router.get("/", financeController.getAllBudgetPlans);
router.get("/2", financeController.getAllBudgetPlans2);

// Retrieve a specific process record by ID
router.get("/get/:id", financeController.getBudgetPlanById);
router.get("/get2/:id", financeController.getBudgetPlanById2);

// Update a process record
router.patch("/update/:id", financeController.updateBudgetPlan);

// Delete a process record
router.delete("/delete/:id", financeController.deleteBudgetPlan);
router.delete("/delete2/:id", financeController.deleteBudgetPlan2);


module.exports = router;
