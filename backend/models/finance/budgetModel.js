const mongoose = require('mongoose');



const bp = mongoose.Schema({

    title: {
        type: String,
    },
    crop: {
        type: String,
    },
    startDate : {
        type : Date,
    },
    endDate: {
        type : Date,
    },
    seedsCost: {
        type : Number,
    },
    fertilizerCost: {
        type : Number,
    },
    pesticidesCost: {
        type : Number,
    },
    otherCost: {
        type : Number,
    },
    estimatedYield: {
        type : Number,
    },
    estimatedRevenue: {
        type : Number,
    },
    aseedsCost: {
        type : Number,
        default: 0,
    },
    afertilizerCost: {
        type : Number,
        default: 0,
    },
    apesticidesCost: {
        type : Number,
        default: 0,
    },
    aotherCost: {
        type : Number,
        default: 0,
    },
    actualYield: {
        type : Number,
        default: 0,
    },
    actualRevenue: {
        type : Number,
        default: 0,
    },

    climateZone: {
        type : String,
    },
   
    areaOfLand: {
        type : Number,
    },
   
    totalExpenditure: {
        type : Number,
    },
   
    totalYield: {
        type : Number,
    },
   
    estimatedIncome: {
        type : Number,
    },
   
    profit: {
        type : Number,
    },
   
   
})

const budgetPlans = mongoose.model("bp", bp);

module.exports = budgetPlans;