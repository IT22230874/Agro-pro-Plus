const mongoose = require('mongoose');



const ae = mongoose.Schema({



    seedsCost: {
        type : Number,
        required: true,
    },
    fertilizerCost: {
        type : Number,
        required: true,
    },
    pesticidesCost: {
        type : Number,
        required: true,
    },
    otherCost: {
        type : Number,
        required: true,
    },
   actualYield: {
        type : Number,
        required: true,
    },
    actualRevenue: {
        type : Number,
        required: true,
    },
   
})

const actualExpenses = mongoose.model("ae", ae);

module.exports = actualExpenses;