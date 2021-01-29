require("dotenv").config();

const express = require("express");
const path = require("path");

const api = require("./routes/api");
const auth = require('./routes/auth');

const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use('/api', api);
app.use('/auth', auth);
app.use((req,res,next)=>{
    return res.status(404).send('Not found');
})

require("./config/steam")(app);


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));