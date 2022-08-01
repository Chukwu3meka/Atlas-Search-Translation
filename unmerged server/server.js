require("dotenv").config(); // enable reading from .env file
require("./models"); // enable app access database

const app = require("express")();

const port = process.env.PORT;

app.use(
  require("cors")({
    origin: ["http://localhost:3000", "https://atlassearchtranslation.com"],
    credentials: true, //access-control-allow-credentials:true
  })
);

app.use(require("express").json());
app.use(require("cookie-parser")());

app.use(require("body-parser").json({ limit: "50mb" }));
app.use(require("body-parser").urlencoded({ extended: true }));

app.use("/API/textTranslations/", require("./routes/textTranslations"));
app.use("/API/auth/", require("./routes/auth"));
app.use("/API/admin/", require("./routes/admin"));

app.listen(port, () => console.log(`AtlasSearchTranslation:::listening on port ${port}`));
