const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Set up static file serving
app.use(express.static("public"));

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Set up routes
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for incoming messages and broadcast them to all connected clients
  socket.on("message", (message) => {
    console.log(`Message received from ${socket.id}: ${message}`);
    io.emit("message", message);
  });

  // Handle disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
