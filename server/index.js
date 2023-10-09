const express = require("express");
const app = express();
const ViteExpress = require("vite-express")
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const PORT = 3000;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

var storage = multer.diskStorage(
    {
        destination: './public/images',
        filename: function (req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);

const upload = multer({ storage: storage } )

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth ?? null;

  try {
    req.user = jwt.verify(token, process.env.JWT);
  } catch {
    req.user = null;
  }

  next();
});

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use("/api", require("./api"));
app.use("/auth", require("./auth"))

app.post("/uploadfile", upload.single('productImage'), (req, res, next) => {
    console.log(req.file.originalname + " file successfully uploaded !!");
    res.sendStatus(200);
});


const server = app.listen(PORT, () => {
  console.log("On port" + PORT);
});

ViteExpress.bind(app, server)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});