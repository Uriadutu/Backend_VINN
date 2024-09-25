import express from "express";
import FileUpload from "express-fileupload";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/Auth.js";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import ProductRoute from "./routes/ProductRoute.js";
import db from "./config/Database.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db,
});

// store.sync();

// (async () => {
//   await db.sync();
// })(); 

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(ProductRoute);
app.use(authRoutes);


app.listen(process.env.APP_PORT, () => {
  console.log("server started", process.env.APP_PORT);
});
