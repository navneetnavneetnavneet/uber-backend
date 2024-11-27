const app = require("./app");
const http = require("http");
const port = process.env.PORT || 3000;

// create server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
