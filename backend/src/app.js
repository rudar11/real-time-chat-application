// require('dotenv').config();
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const connectdb = require('./db/db');
// const authRouter = require('./routes/auth.routes');
// const app = express();
// const roomRouter = require('./routes/room.routes');


// const multer = require('multer');
// const uploadfile = require('../src/services/storage.services')






// const upload = multer({ storage: multer.memoryStorage() });




// app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, "public")))




// app.post('/create-post', upload.single("image"), async function (req, res) {

//     console.log(req.body)
//     console.log(req.file)



//     const result = await uploadfile(req.file.buffer)


//     const post = await postModel.create({
//         image: result.url,
//         caption: req.body.caption
//     })


//     res.status(201).json({ message: "post created successfully", post })


// })









// // --- CORS CONFIGURATIONy //  ---
// app.use(cors({
//     origin: [
//         "http://localhost:5173", 
//         "https://real-time-chat-application-coral-chi.vercel.app" //  live Vercel link
//     ], 
//     credentials: true,               
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]//jo data laya hu wo JSON format mein hai
// }));

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Database connection
// connectdb();

// // Test Route
// app.get('/', (req, res) => {
//     res.send("Chat Server is running...");
// });

// app.use('/api/auth', authRouter);
// app.use('/api/rooms', roomRouter);

// module.exports = app;







require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path'); 
const connectdb = require('./db/db');
const authRouter = require('./routes/auth.routes');
const roomRouter = require('./routes/room.routes');
const multer = require('multer');

// Service Import
const uploadfile = require('./services/storage.services'); 

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// CORS CONFIGURATION
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://real-time-chat-application-coral-chi.vercel.app" 
    ], 
    credentials: true,               
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔥 TEST ROUTE: Image Upload via API
app.post('/create-post', upload.single("image"), async function (req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        console.log("File received:", req.file.originalname);

        // Service ko call karke ImageKit par bheja
        const result = await uploadfile(req.file.buffer);

        // URL frontend ko wapas bhej diya
        res.status(201).json({ 
            message: "Image uploaded successfully", 
            imageUrl: result.url 
        });

    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
});

// Database connection
connectdb();

// Test Route
app.get('/', (req, res) => {
    res.send("Chat Server is running...");
});

app.use('/api/auth', authRouter);
app.use('/api/rooms', roomRouter);

module.exports = app;