const express = require("express");
const v1_api_router = require("./routes/v1.api.js");
const web_router = require("./routes/web.js");

const port = "3030"
const app =  express();

// Routes
app.use(express.json());

app.use("/api/v1", v1_api_router);

app.use("/", web_router)

app.listen(port, () => {
  console.log(`api run on localhost port ${port}, [ http://localhost:${port} ]`)
})
