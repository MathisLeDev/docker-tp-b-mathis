import express, { Request, Response } from "express";
import { appDataSource } from "./app-data-source";
import router from "./routes/routes";
import cors from "cors";
import morgan from "morgan";
import { JwtMiddleware } from "./middleware/jwtAuth";

// establish database connection
appDataSource
  .initialize()
  .then((conn) => {
    conn.runMigrations();
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(morgan("dev"));


app.use("/media", express.static("public/images"));

// Votre route pour accéder aux images
app.get("/api/media/:imageName", (req, res) => {
  const { imageName } = req.params;
  res.sendFile(`${__dirname}/public/images/${imageName}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = 3001;
app.use(
  cors({
    origin: "*",
  }),
);
app.use(JwtMiddleware);


app.use("/media", express.static("public/images"));

// Votre route pour servir l'image
app.get("/api/media/:imageName", (req, res) => {
  const { imageName } = req.params;
  res.sendFile(`${__dirname}/public/images/${imageName}`);
});

app.use(express.json()); // Add this line to handle JSON requests
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.use(router);

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});

export default app;
//add listerer for each request
