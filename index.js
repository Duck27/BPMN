const express = require("express");
const path = require("path");
const userRouter = require("./routes/user.routes");

const PORT = process.env.PORT || 8080;

const app = express();
//app.use(express.json);
app.use(express.static("/views/"));
app.use(express.json());
app.locals.basedir = path.join(__dirname, "views");

app.set("view engine", "pug");

app.use("/main", function (request, response) {
  response.render("main", {
    title: "Мои контакты",
    emailsVisible: true,
    emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
    phone: "+1234567890",
  });
});

app.use("/api", userRouter);

app.listen(PORT, () => console.log("server started on port " + PORT));
