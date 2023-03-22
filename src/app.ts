import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import userRoutes from "./routes/users.routes";
import clientRoutes from "./routes/clients.routes";
import contactRoutes from "./routes/contacts.routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/clients", clientRoutes);
app.use("/contacts", contactRoutes);

app.use(handleError);

export default app;