const WebSocket = require("ws");

const ws = new WebSocket(
  "https://8080-plum-tick-p7hr4okm.ws-us11.gitpod.io//",
  {
    origin: "https://websocket.org",
  }
);

ws.on("open", function open() {
  console.log("connected");
  ws.send(Date.now());
});

ws.on("close", function close() {
  console.log("disconnected");
});

ws.on("message", function incoming(data) {
  console.log(`Roundtrip time: ${Date.now() - data} ms`);

  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
});
