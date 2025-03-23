const express = require('express');
const router = express.Router()
const multer = require('multer');
const { uploadUser, uploadCompany } = require('../middleware/multer');
const protect = require('../middleware/auth');

// Helper function to handle file upload response
const handleUploadResponse = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: 'No file uploaded'
        });
    }

    const fileUrl = `/uploads/${req.file.path.split('uploads/')[1]}`;
    res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        data: {
            filename: req.file.filename,
            url: fileUrl,
            mimetype: req.file.mimetype,
            size: req.file.size
        }
    });
};

// Error handler middleware
const uploadErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File size too large. Maximum size is 5MB'
            });
        }
    }
    res.status(400).json({
        success: false,
        error: err.message
    });
};

// User Routes
// Upload profile image
router.post('/user/:userId/img',
    protect,
    uploadUser.single('img'),
    handleUploadResponse
);

// Upload CV
router.post('/user/:userId/cv',
    protect,
    uploadUser.single('cv'),
    handleUploadResponse
);

// Upload Resume
router.post('/user/:userId/resume',
    protect,
    uploadUser.single('resume'),
    handleUploadResponse
);

// Company Routes
// Upload company image
router.post('/company/:companyId/img',
    protect,
    uploadCompany.single('img'),
    handleUploadResponse
);

// Apply error handler
// router.use(uploadErrorHandler);

module.exports = router;