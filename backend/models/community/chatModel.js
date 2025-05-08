// models/chatModel.js
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: { 
    type: String, 
<<<<<<< Updated upstream
    required: true, 
  },
  receiver: { 
    type: String, 
    required: true,
  },
  message: { 
    type: String, 
    required: true, 
=======
    required: false, 
  },
  receiver: { 
    type: String, 
    required: false,
  },
  message: { 
    type: String,  
    required: false, 
>>>>>>> Stashed changes
  },
  timestamp: { 
    type: Date, 
    default: Date.now, 
  },
});

//const Chat = mongoose.model("Chat", chatSchema);
module.exports = mongoose.model("Chat", chatSchema);
// module.exports = Chat;
