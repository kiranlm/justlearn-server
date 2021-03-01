//IMPORTS
const express = require("express");
const app = express();
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/static", express.static(__dirname + "/static"));

// ROUTES
app.get("/", (req, res) => {
  res.send("webrtc server running");
});
const PORT = process.env.PORT || "5005";

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//SOCKET CONNECT
const socketMain = require("./socket/index");

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

socketMain(io);
