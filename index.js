const WebSocket = require("ws");
const fs = require("fs");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    try {
      const obj = JSON.parse(message);
      const { content, path } = obj;
      fs.writeFile(__dirname + path, content, (err) => {
        if (err) {
          console.error("error writing file", err);
          ws.send(JSON.stringify({ path, result: "failed", err }));
          return;
        }
        console.log("written", path);
        ws.send(JSON.stringify({ path, result: "success" }));
      });
    } catch (err) {
      console.error("error", err);
      ws.send(JSON.stringify({ path, result: "failed", err }));
    }
  });
  ws.send(JSON.stringify({ connected: true }));
  console.log("client connection");
});

console.log("starting");
