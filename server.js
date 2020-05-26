const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/champUnite", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});