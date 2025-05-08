const budgetPlan = require('../../models/finance/budgetModel');
const budgetPlan2 = require('../../models/finance/budgetModel2');


// Add a new budgetPlan record
exports.addBudgetPlan = async (req, res) => {
    try {
        console.log(req.body); 
        const {title, crop, startDate, endDate, seedsCost,fertilizerCost,pesticidesCost,otherCost,estimatedYield,estimatedRevenue,climateZone,areaOfLand,totalExpenditure,totalYield,estimatedIncome,profit} = req.body;

        const newBudgetPlan = new budgetPlan({
            title,
            crop,
            startDate,
            endDate,
            seedsCost,
            fertilizerCost,
            pesticidesCost,
            otherCost,
            estimatedYield,
            estimatedRevenue,
            climateZone,
            areaOfLand,
            totalExpenditure,
            totalYield,
            estimatedIncome,
            profit
        });

        await newBudgetPlan.save();
        res.json("Plan Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding plan record", error: err.message });
    }
};

// Add a new budgetPlan record
exports.addBudgetPlan2 = async (req, res) => {
    try {
        console.log(req.body); 
        const {title, crop, startDate, endDate, seedsCost,fertilizerCost,pesticidesCost,otherCost,estimatedYield,estimatedRevenue,climateZone,areaOfLand,totalExpenditure,totalYield,estimatedIncome,profit} = req.body;

        const newBudgetPlan = new budgetPlan2({
            title,
            crop,
            startDate,
            endDate,
            seedsCost,
            fertilizerCost,
            pesticidesCost,
            otherCost,
            estimatedYield,
            estimatedRevenue,
            climateZone,
            areaOfLand,
            totalExpenditure,
            totalYield,
            estimatedIncome,
            profit
        });

        await newBudgetPlan.save();
        res.json("Plan Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding plan record", error: err.message });
    }
};

// Retrieve all budgetPlan records
exports.getAllBudgetPlans = async (req, res) => {
    try {
        const budgetPlans = await budgetPlan.find();
        res.json(budgetPlans);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving plan records", error: err.message });
    }
};

// Retrieve all budgetPlan records2
exports.getAllBudgetPlans2 = async (req, res) => {
    try {
        const budgetPlans = await budgetPlan2.find();
        res.json(budgetPlans);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving plan records", error: err.message });
    }
};

// Retrieve a specific budgetPlan record by ID
exports.getBudgetPlanById = async (req, res) => {
    try {
        const budgetPlanId = req.params.id
        const BudgetPlan = await budgetPlan.findById(budgetPlanId);
        
        if (!BudgetPlan) {
            return res.status(404).json({ status: "plan not found" });
        }
        
        res.status(200).json({ status: "plan fetched", BudgetPlan });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving budgetPlan record", error: err.message });
    }
};

// Retrieve a specific budgetPlan record by ID
exports.getBudgetPlanById2 = async (req, res) => {
    try {
        const budgetPlanId = req.params.id
        const BudgetPlan = await budgetPlan2.findById(budgetPlanId);
        
        if (!BudgetPlan) {
            return res.status(404).json({ status: "plan not found" });
        }
        
        res.status(200).json({ status: "plan fetched", BudgetPlan });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving budgetPlan record", error: err.message });
    }
};

// Update a budgetPlan record
exports.updateBudgetPlan = async (req, res) => {
    try {
        const budgetPlanId = req.params.id;
        const {title, crop, startDate, endDate, seedsCost,fertilizerCost,pesticidesCost,otherCost,aseedsCost,afertilizerCost,apesticidesCost,aotherCost,actualYield,actualRevenue} = req.body;

        const updateBudgetPlan = {
            title,
            crop,
            startDate,
            endDate,
            seedsCost,
            fertilizerCost,
            pesticidesCost,
            otherCost,
            aseedsCost,
            afertilizerCost,
            apesticidesCost,
            aotherCost,
            actualYield,
            actualRevenue
        };

        const updatedBudgetPlan = await budgetPlan.findByIdAndUpdate(budgetPlanId, updateBudgetPlan, { new: true });

        if (!updatedBudgetPlan) {
            return res.status(404).json({ status: "plan not found" });
        }

        res.status(200).json({ status: "plan record updated", updatedBudgetPlan });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating plan record", error: err.message });
    }
};

// Delete a distribute record
exports.deleteBudgetPlan = async (req, res) => {
    try {
        const budgetPlanId = req.params.id;
        await budgetPlan.findByIdAndDelete(budgetPlanId);
        res.status(200).json({ status: "plan record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting plan record", error: err.message });
    }
};

// Delete a distribute record2
exports.deleteBudgetPlan2 = async (req, res) => {
    try {
        const budgetPlanId = req.params.id;
        await budgetPlan2.findByIdAndDelete(budgetPlanId);
        res.status(200).json({ status: "plan record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting plan record", error: err.message });
    }
};



