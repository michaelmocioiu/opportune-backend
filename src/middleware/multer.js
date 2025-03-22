// opportune-backend/src/middleware/multer.js
const multer = require('multer');
const path = require('path');

const getUploadPath = async (userType, userId, folder) => {
    const uploadDir = path.join(__dirname, "../uploads", userType, userId, folder);
    await fs.ensureDir(uploadDir);
    return uploadDir;
};

const formatFilename = async (userId, file) => {
    const type = ["resume", "coverletter"].includes(file.fieldname) ? file.fieldname : "img";
    let filename;

    if (type === "img") {
        filename = file.fieldname + path.extname(file.originalname); 
    } else {
        const baseDir = path.join(__dirname, "../uploads", "user", userId, type);
        await fs.ensureDir(baseDir);

        const fileNumber = (await fs.readdir(baseDir)).filter(f => f.includes(type)).length + 1;
        filename = `${type}_${fileNumber}${path.extname(file.originalname)}`;
    }

    return filename;
};

// Define storage for user files
const userStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            if (!req.user) return cb(new Error("Unauthorized"), null);
            const userId = req.user.id;
            const folder = ["resume", "coverletter"].includes(file.fieldname) ? file.fieldname : "img";
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
            const companyId = req.user.companyId;
            const uploadDir = await getUploadPath("company", companyId, "img");
            cb(null, uploadDir);
        } catch (err) {
            cb(err, null);
        }
    },
    filename: (req, file, cb) => {
        const filename = `${file.fieldname}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});



// Initialize multer for user and company
const uploadUser = multer({ storage: userStorage });
const uploadCompany = multer({ storage: companyStorage });

module.exports = { uploadUser, uploadCompany };