// opportune-backend/src/routes/upload.js
const express = require('express');
const router = express.Router();
const { uploadUser, uploadCompany } = require('../middleware/multer');
const { protect } = require('../middleware/auth')

// User file uploads
router.post("/user/upload", protect, uploadUser.single("img"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ message: "File uploaded successfully", filename: req.file.filename });
});

router.post("/user/upload/resume", protect, uploadUser.single("resume"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No resume uploaded" });
  res.json({ message: "Resume uploaded successfully", filename: req.file.filename });
});

router.post("/user/upload/coverletter", protect, uploadUser.single("coverletter"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No cover letter uploaded" });
  res.json({ message: "Cover letter uploaded successfully", filename: req.file.filename });
});

// Company file uploads
router.post("/company/upload", uploadCompany.single("img"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ message: "Company file uploaded successfully", filename: req.file.filename });
});

module.exports = router;