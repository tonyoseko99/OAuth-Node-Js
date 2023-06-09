const express = require("express");
const app = express();

const authenticateToken = require("./middleware/authenticate");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/protected", authenticateToken);

module.exports = app;

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
