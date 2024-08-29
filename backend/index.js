const express = require("express")
const signIn = require('./controllers/SignIn')
const signUp = require('./controllers/SignUp')
const createEvent = require('./controllers/events/createEvent')
const addParticipants = require('./controllers/events/addParticipates')
const addVolunteer = require('./controllers/events/addVolunteer')
const addStaff = require('./controllers/events/addStaff')
const deleteStaff = require("./controllers/events/deleteStaff")
const addMember =require("./controllers/projects/addMember")
const createProject =require("./controllers/projects/createProject")
const deleteMember = require("./controllers/projects/deleteMember")

const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express()
app.use(express.json())
app.use(cors());

// Secret key for verifying the JWT
const secretKey = process.env.JWT_SECRET || "123#secret"; // Use an environment variable for better security

const verifyToken = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized! Invalid token." });
        }
        req.userId = decoded.id;
        next();
    });
};

app.post("/signIn",verifyToken,signIn);
app.post("/createEvent",createEvent);
app.post("/signUp",signUp);
app.post("/addParticipates",addParticipants);
app.post("/addVolunteer",addVolunteer);
app.post("/addStaff",addStaff);
app.delete("/deleteStaff",deleteStaff);
app.post("/createProject",createProject);
app.post("/addMember",addMember);
app.delete("/deleteMember",deleteMember);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.listen(4200,()=>console.log("Server is running"))

