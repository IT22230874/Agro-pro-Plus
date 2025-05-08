const stock = require('../../models/distributors/stock');

// Add a new stock record
exports.addstock = async (req, res) => {
    try {
        const {
            business_name,
            ferti_name,
            amount,
            price,
            description,
            availability,
            location // Include location from request body
        } = req.body;

        // Validate location to ensure it includes latitude and longitude
        if (!location || !location.lat || !location.lng) {
            return res.status(400).json({ status: "Error", error: "Location is required with latitude and longitude" });
        }

        // Create a new stock object
        const newStock = new stock({
            business_name,
            ferti_name,
            amount,
            price,
            description,
            availability,
            location // Include location here
        });

        await newStock.save();
        res.status(201).json({ status: "success", message: "Stock added successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding stock record", error: err.message });
    }
};
// Retrieve all stock records
exports.getAllstock = async (req, res) => {
    try {
        const stocks = await stock.find();
        res.json(stocks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving stock records", error: err.message });
    }
};

// Retrieve a specific stock record by ID
exports.getstockById = async (req, res) => {
    try {
        const stockId = req.params.id
        const Stock = await stock_status.findById(stockId);
        
        if (!Stock) {
            return res.status(404).json({ status: "stock not found" });
        }
        
        res.status(200).json({ status: "stock fetched", Stock });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving stock record", error: err.message });
    }
};

// Update a stock record
exports.updatestock = async (req, res) => {
    try {
        const stockId = req.params.id;
        const {
            business_name,
            ferti_name,
            amount,
            price,
            description,
            availability,
            location // Include location from request body
        } = req.body;

        // Validate location to ensure it includes latitude and longitude
        if (location && (!location.lat || !location.lng)) {
            return res.status(400).json({ status: "Error", error: "Location must include latitude and longitude" });
        }

        const updatestock = {
            business_name,
            ferti_name,
            amount,
            price,
            description,
            availability,
            ...(location && { location }) // Include location if it exists
        };

        const updatedstock = await stock.findByIdAndUpdate(stockId, updatestock, { new: true });

        if (!updatedstock) {
            return res.status(404).json({ status: "Error", message: "Stock not found" });
        }

        res.status(200).json({ status: "Success", message: "Stock record updated", updatedstock });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating stock record", error: err.message });
    }
};

// Delete a stock record
exports.deletestock = async (req, res) => {
    try {
        const stockId = req.params.id;
        await stock.findByIdAndDelete(stockId);
        res.status(200).json({ status: "stock record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting stock record", error: err.message });
    }
};


exports.getFertilizerNames = async (req, res) => {
    try {
        const fertilizers = await stock.distinct("ferti_name"); // Get distinct fertilizer names
        res.json(fertilizers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving fertilizers", error: err.message });
    }
};


// Get stores based on selected fertilizer name and availability
// Controller to get stores by fertilizer name and availability status
exports.getStoresByFertilizer = async (req, res) => {
    const { ferti_name, availability } = req.query; // Get the fertilizer name and availability from query parameters

    // Validate the presence of required query parameters
    if (!ferti_name || !availability) {
        return res.status(400).json({ status: "Error", message: "Fertilizer name and availability are required." });
    }

    try {
        // Fetch stores matching the fertilizer name and availability status
        const stores = await stock.find({ ferti_name, availability });

        // Check if any stores were found
        if (stores.length === 0) {
            // Return a message indicating stocks are out
            return res.status(200).json({ status: "Warning", message: "Stocks are out of stock." });
        }

        // Map to include only the necessary information
        const availableStores = stores.map(store => ({
            business_name: store.business_name,
            location: store.location, // Ensure location is included (assuming it's stored in your stock collection)
            ferti_name: store.ferti_name,
        }));

        // Return the available stores
        res.json(availableStores);
    } catch (err) {
        console.error(err);
        // Return a server error response
        res.status(500).json({ status: "Error", message: "Error retrieving stores", error: err.message });
    }
};
