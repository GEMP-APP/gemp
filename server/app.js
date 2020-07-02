const Server = require("./server");
const PORT = process.env.PORT || 4000;
const Gemp = require("./gemp");

Server.getServer
  .then((server) => {
    console.log(Gemp.getRooms());
    server.listen(PORT, () => console.log("server started"));
  })
  .catch((err) => {
    console.log(err);
  });
