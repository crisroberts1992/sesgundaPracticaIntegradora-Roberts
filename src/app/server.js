// Libery
import express from "express";
import { engine } from "express-handlebars";
import { Server as socketIOServer } from "socket.io";
import cors from "cors"; 
import session from "../mid/session.js";

//root
import { apiRouter } from "../routers/router.api.js";
import { viewsRouter } from "../routers/router.views.js";

//config
import { PORT } from "../config/config.server.js";

//mid
import { errorFn } from "../mid/error.js";
import { socketFn } from "../mid/socketio.productrt.js";
//DDBB
import { conectar } from "../database/mongoose.js";

import cookieParser from 'cookie-parser'
import { COOKIE_SECRET } from '../config/auth.config.js'


const app = express();

await conectar();

app.use(cors({ origin: "*" }));
app.use("/public", express.static("public"));
app.use(express.json())

app.use(cookieParser(COOKIE_SECRET))

app.use(session)

app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use("/api", apiRouter);
app.use("/", viewsRouter);
app.use(errorFn);

const httpServer = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Path to dinamic view: ", "http://localhost:8080/");
  console.log("Path to paginate view: ","http://localhost:8080/products?limit=10&page=1");
  console.log("Path to cart view: ", "http://localhost:8080/carts/:cid}");
  console.log("Path to create products: ", "http://localhost:8080/newproducts");
  console.log("Path to API-Products: ", "http://localhost:8080/api/products");
  console.log("Path to Register: ", "http://localhost:8080/register");
  console.log("Path to Login: ", "http://localhost:8080/login");
  console.log("Path to Profile: ", "http://localhost:8080/profile");
  console.log("Path to Users: ", "http://localhost:8080/users");

});

export const io = new socketIOServer(httpServer);

io.on("connection", async (clientSocket) => {
  console.log(`New connection: ${clientSocket.id}`);
  await socketFn();
});