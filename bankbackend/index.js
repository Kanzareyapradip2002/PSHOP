const express = require("express");
const cors = require("cors");
const  cookieParser = require('cookie-parser')
require("dotenv").config();
const connectDB = require('./config/dbs');
const PORT = process.env.PORT || 8002; 
const app = express();
const bodyParser = require('body-parser');
const router = require("./routes");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json())
app.use(cookieParser())
app.use("/", router);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log("Connected to DB");
    });
}).catch(err => {
    console.error("Database connection failed:", err);
});
