import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./src/routes/index";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import bodyParser from "body-parser";
import * as env from "env-var";
import errorMiddleware from "./src/middlewares/errorMiddleware";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

const router: Express = express();

process.env.TZ = env.get("TIMEZONE").asString();
const URL_DATABASE: any = process.env.DATABASE_URL ?? "";

mongoose
  .connect(URL_DATABASE)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

router.use(cors());
const swaggerOptions = {
  swaggerDefinition: {
    schemes: ["http", "ws"],
    info: {
      title: "ImageProcessor API",
      version: "1.0.0",
    },
    host:
      (env.get("HOST").asString() ?? "localhost") +
      ":" +
      (env.get("PORT").asString() ?? "8080"),
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
  apis: ["dist/routes/swagger.js"],
  // apis: ["src/routes/swagger.ts"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

router.use(morgan("dev")); // Logging
router.use(bodyParser.urlencoded());
router.use(
  bodyParser.json({
    verify: (request: any, response, buffer) => {
      request.rawBody = buffer.toString();
    },
  })
);
router.use(bodyParser.raw({ type: "image/*" }));
router.use(express.static("public"));
router.use(
  fileUpload({
    createParentPath: true,
  })
);

router.use("/", routes);

router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

router.use(errorMiddleware);

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
httpServer.timeout = 15000;
