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

const port = 3001;
app.use(
  cors({
    origin: "*",
  }),
);
app.use(JwtMiddleware);
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
