// opportune-backend/src/middleware/multer.js
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const getUploadPath = async (userType, userId, folder) => {
    const uploadDir = path.join(__dirname, "../../uploads", userType, userId, folder);
    await fs.ensureDir(uploadDir);
    return uploadDir;
};

const FILE_TYPES = {
    img: ['image/jpeg', 'image/png', 'image/gif'],
    cv: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    resume: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

const formatFilename = async (userId, file) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const folder = file.fieldname;
    return `${folder}_${timestamp}${ext}`;
};

const fileFilter = (req, file, cb) => {
    try {
        const folder = file.fieldname;
        const allowedTypes = FILE_TYPES[folder];

        if (!allowedTypes || !allowedTypes.includes(file.mimetype)) {
            const allowedExts = allowedTypes.map(type => {
                switch (type) {
                    case 'image/jpeg': return '.jpg,.jpeg';
                    case 'image/png': return '.png';
                    case 'image/gif': return '.gif';
                    case 'application/pdf': return '.pdf';
                    case 'application/msword': return '.doc';
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return '.docx';
                    default: return '';
                }
            }).filter(ext => ext).join(',');
            cb(new Error(`Invalid file type. Allowed types: ${allowedExts}`), false);
            return;
        }
        cb(null, true);
    } catch (err) {
        cb(err, null);
    }
};

const limits = {
    fileSize: 5 * 1024 * 1024 // 5MB limit
};

// Define storage for user files
const userStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            if (!req.user) return cb(new Error("Unauthorized"), null);
            const userId = req.params.userId || req.user.id;
            if (userId !== req.user.id) return cb(new Error("Unauthorized: You can only upload files to your own account"), null);

            const folder = ['cv', 'resume'].includes(file.fieldname) ? file.fieldname : 'img';
            const uploadDir = await getUploadPath("user", userId, folder);
            cb(null, uploadDir);
        } catch (err) {
            cb(err, null);
        }
    },
    filename: async (req, file, cb) => {
        try {
            const filename = await formatFilename(req.user.id, file);
            cb(null, filename);
        } catch (err) {
            cb(err, null);
        }
    }
});

// Define storage for company files
const companyStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            if (!req.user) return cb(new Error("Unauthorized"), null);
            const companyId = req.params.companyId || req.user.companyId;
            if (!req.user.companyId || companyId !== req.user.companyId) {
                return cb(new Error("Unauthorized: You can only upload files to your own company"), null);
            }

            const uploadDir = await getUploadPath("company", companyId, "img");
            cb(null, uploadDir);
        } catch (err) {
            cb(err, null);
        }
    },
    filename: async (req, file, cb) => {
        try {
            const filename = await formatFilename(req.user.companyId, file);
            cb(null, filename);
        } catch (err) {
            cb(err, null);
        }
    }
});

// Initialize multer for user and company
const uploadUser = multer({
    storage: userStorage,
    fileFilter,
    limits
});

const uploadCompany = multer({
    storage: companyStorage,
    fileFilter,
    limits
});

module.exports = { uploadUser, uploadCompany };