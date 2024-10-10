const express = require("express");
const cors = require("cors");
const database = require("./data/db.json");
const app = express();
const fs = require("fs");
const path = require("path");

//Middlewaer
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeader: ["Content-Type", "Authorization"],
    maxAge: 3600,
  })
);

//UI
app.use(express.static("public"));
app.get("/data", (req, res) => {
  const html = `
      <pre>${JSON.stringify(database, null, 2)}</pre>
      `;
  res.send(html);
});

app.get("/", (req, res) => {
  res.send(`<pre>Welcome to Database <br/>
  ${JSON.stringify(database, null, 2)}</pre>`);
});

//RESET API
// REST API FOR ONLY APPLICATIONS
app.get("/applications", (req, res) => {
  return res.json(database?.data);
});

app.get("/applications/:app_slug", (req, res) => {
  return res.json(database?.data);
});

app.post("/applications", (req, res) => {
  const body = req.body;
  database?.data.push(body);
  const file_path = path.join(process.cwd(), "/data/db.json");
  fs.writeFileSync(file_path, JSON.stringify(database, null, 2));
  return res.json({ message: "ok.." });
});

app.delete("/application/:app_slug", (req, res) => {
  return res.json({ message: "pedding....." });
});
// STOP REST API FOR ONLY APPLICATIONS
// REST API FOR ONLY COLLECTIONS
app
  .route("/:app_slug/:collection_slug")
  .get((req, res) => {
    const id = req.params.app_slug;
    const coll = req.params.collection_slug;
    return res.json({
      app: id,
      collection: coll,
    });
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    return res.json({ stauts: "pennding" });
  });

// STOP REST API FOR ONLY COLLECTIONS

app.listen(1337, () => console.log("server is strated on port 1337"));
