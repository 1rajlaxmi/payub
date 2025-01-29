
import cors from "cors"

export const handelcors =  (req, res, next) => {
    if (req.originalUrl.startsWith("/api/verifypayment")) {
        // Skip CORS for /verifypayment/:txnid route
        console.log (req.originalUrl)
        next();
    } else {
        

        const allowedOrigins = [
            'http://localhost:5173', 'https://payuf.onrender.com' ,'https://reactvite-drab.vercel.app/' , 'https://reactvite-drab.vercel.app'// Allowed origin for frontend (can be localhost, domain)
        ];
        
        cors({
            origin: function (origin, callback) {
                // If the origin is null or one of the allowed origins, allow it
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true); // Allow the request
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true, // Allow cookies if needed
        })(req, res, next);
    }
}
