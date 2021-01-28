const express = require("express");
const app = express();
app.use(express.static("public"));
const http = require("http").Server(app);
const port = process.env.PORT || 3000;

// socket server
const io = require("socket.io")(http);

io.on("connection", function (socket) {
  console.log("Somebody connected");

  // called when client calls socket.emit('move')
  socket.on("move", function (msg) {
    socket.broadcast.emit("move", msg);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/default.html");
});

http.listen(port, () => {
  console.log(`Listening on *: ${port}`);
});

// app.listen(port, () => {
//   console.log(`Listening on *: ${port}`);
// });
