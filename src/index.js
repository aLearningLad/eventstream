const app = require("./app");

// port
const PORT = process.env.DEV_PORT;

// start app
app.listen(PORT, () => {
  console.log(`Server instance is listening on PORT: ${PORT}`);
});
