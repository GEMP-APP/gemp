const { getServer } = require("./server");
const Server = require("./server");
const PORT = process.env.PORT || 4000;

Server.getServer
  .then((server) => {
    console.log(server);
    server.listen(PORT, () => console.log("server started"));
  })
  .catch((err) => {
    console.log(err);
  });
