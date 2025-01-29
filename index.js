const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv");
const { paymentRouter } = require("./routes/payment.routers.js");
const {handelcors}  = require ("./midilware/handelcors.js")
const cors = require("cors");

dotenv.config({ path: "./.env" }); // Load environment variables

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON payloads
app.use(bodyParser.json());

// Test database connection
async function testDatabaseConnection() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}

testDatabaseConnection();

// CORS Configuration for all routes
const allowedOrigins = [
    'http://localhost:5173', // Allowed origin for frontend (can be localhost, domain)
];

// General CORS for all routes except for /verifypayment/:txnid
app.use(handelcors);

// Custom CORS for specific route (/verifypayment/:txnid) to allow 'null' origin
const corsForPaymentSuccess = (req, res, next) => {
    const origin = req.get('origin'); // Get origin header from the request
    
    // If the origin is null (for example, mobile apps or requests with no origin), allow it
    if (origin == "null" || allowedOrigins.includes(origin)) {
        return next(); // Allow this request
    } else {
        return res.status(403).json({ message: 'Forbidden: Unauthorized origin' });
    }
};

// Apply CORS for /verifypayment/:txnid route


// Default route
app.get('/', (req, res) => {
    res.json({
        "Health": "Health is Good",
        "Working": "Keep Working"
    });
});

// Payment routes
app.use("/api", paymentRouter);

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await prisma.$disconnect();
    process.exit(0);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
