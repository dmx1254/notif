const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4000", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  // ibytrade order get event
  socket.on(
    "user order",
    ({ commendOrderID, commendNum, orderedName, dateCreated }) => {
      // Traiter les données ici (par exemple, les stocker dans une base de données)

    //   console.log(commendOrderID, commendNum, orderedName, dateCreated);

      // Envoyer les données à tous les clients connectés
      io.emit("new order", {
        commendOrderID,
        commendNum,
        orderedName,
        dateCreated
      });
    }
  );

  // ibytrade order get eventt



  // ibytrade exchange get event
  socket.on(
    "user exchange",
    ({ exchangeID, exchangeNum, exchangedName, dateCreated }) => {
      // Traiter les données ici (par exemple, les stocker dans une base de données)

    //   console.log(commendOrderID, commendNum, orderedName, dateCreated);

      // Envoyer les données à tous les clients connectés
      io.emit("receive exchange", {
        exchangeID,
        exchangeNum,
        exchangedName,
        dateCreated
      });
    }
  );

  // ibytrade exchange get event

  socket.on("disconnect", () =>
    console.log(`a user disconnected ${socket.id}`)
  );
});

server.listen(process.env.PORT || 4001, () =>
  console.log("Socket server listening on port 4001")
);

module.exports = server;
