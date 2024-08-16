import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./users/users.routes";
import { productRouter } from "./products.routes";

dotenv.config();
const port = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(helmet())
app.use("/", userRouter);
app.use("/", productRouter);
app.listen(port, () => {
 console.log(`Server is listening on port ${port}`);
})
