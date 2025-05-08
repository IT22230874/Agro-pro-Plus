// controllers/noticeController.js
const Notice = require("../../models/community/noticeModel");

// Get all notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all notice
exports.getNotice = async (req, res) => {
    try {
      const notice = await Notice.findById(req.params.id);
      res.json(notice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Add a new notice
exports.addNotice = async (req, res) => {
  const notice = new Notice({
    heading: req.body.heading,
    description: req.body.description,
  });

  try {

    const newNotice = await notice.save();
    res.status(201).json(newNotice);

    //udara
        // app.use("/notice", noticeRoute);
        // app.use("/post", postRoute);
    
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a notice
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    notice.heading = req.body.heading;
    notice.description = req.body.description;

    const updatedNotice = await notice.save();
    res.json(updatedNotice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a notice
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.json({ message: "Notice deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
