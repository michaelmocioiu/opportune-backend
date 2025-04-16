const connectDB = require('./config/db');
const { uploadRoutes } = require("./routes/uploadRoutes");

require("dotenv").config();

const app = require("./app");
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));