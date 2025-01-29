import { app } from "./app.js";
import mongoose  from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\nMONGODB connected || DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection failed: ", error);
        process.exit(1)
    }
}

connectDB().then(() => {
    app.on("error", (err) => {
        console.error("Error in connecting MONGODB: ",err)
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Sever is running at PORT ${process.env.PORT || 8000}`);
    })
})

// // Secret key for verifying the JWT
// const secretKey = process.env.JWT_SECRET || "123#secret"; // Use an environment variable for better security

// const verifyToken = (req, res, next) => {
//     // Get the token from the request headers
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) {
//         return res.status(403).json({ message: "No token provided!" });
//     }
//     jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: "Unauthorized! Invalid token." });
//         }
//         req.userId = decoded.id;
//         next();
//     });
// };