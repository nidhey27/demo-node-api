const express = require("express");
const app = express();
const _PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  return res.status(200).json({
    status: true,
    message: "Nodejs Docker App v1",
  });s
});



app.listen(_PORT, () => {
  console.log(`App is UP and Running at PORT: ${_PORT}`);
});