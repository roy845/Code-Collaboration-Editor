import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/dbConn";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import corsOptions from "./config/corsOptions";
import { Server, Socket } from "socket.io";
import credentials from "./middlewares/credentials";
import Room from "./models/room.model";
import env from "./config/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerSpec";
import path from "path";

const app = express();
const PORT = env.PORT || 8080;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(credentials);
app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, TypeScript with Express!");
// });

app.use(errorHandler);

// Server and Socket.io Setup
const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "https://server-codecollaborateapi.onrender.com",
    ],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("New client connected");

  // ** Join Room **
  socket.on("join-room", async (room: string) => {
    if (!room) return;

    try {
      // Check if room exists in MongoDB
      const existingRoom = await Room.findOne({ name: room });

      if (!existingRoom) {
        socket.emit("room-status", {
          room: room,
          message: `Room "${room}" does not exist.`,
        });

        socket.emit("room-not-found", {
          message: `Room "${room}" does not exist.`,
        });

        return;
      }

      // Join the room and send initial data
      socket.join(room);

      socket.on(
        "user-join",
        ({ room, username }: { room: string; username: string }) => {}
      );

      socket.emit("room-initial-data", {
        language: existingRoom.language,
        code: existingRoom.code,
      });
      socket.emit("room-status", {
        room: room,
        message: `Joined existing room "${room}".`,
      });
    } catch (error) {
      console.error(`Error joining room: ${error}`);
    }
  });

  // ** Create New Room **
  socket.on("create-room", async (room: string) => {
    if (!room) return;

    try {
      // Check if room already exists
      const existingRoom = await Room.findOne({ name: room });

      if (existingRoom) {
        socket.emit("room-status", {
          room: room,
          message: `Room "${room}" already exists.`,
        });
        return;
      }

      // Create a new room in MongoDB
      const newRoom = new Room({ name: room });
      await newRoom.save();

      console.log(`Room "${room}" created.`);

      socket.emit("room-status", {
        room: room,
        message: `Room "${room}" has been created.`,
      });
    } catch (error) {
      console.error(`Error creating room: ${error}`);
    }
  });

  // ** Code Change **
  socket.on(
    "code-change",
    async ({ room, code }: { room: string; code: string }) => {
      try {
        // Update the code in MongoDB
        await Room.findOneAndUpdate({ name: room }, { code });
        socket.to(room).emit("code-update", code);
      } catch (error) {
        console.error(`Error updating code: ${error}`);
      }
    }
  );

  // ** Handle Language Change **
  socket.on(
    "language-change",
    async ({
      room,
      language,
      code,
    }: {
      room: string;
      language: string;
      code: string;
    }) => {
      try {
        // Update the language in MongoDB
        await Room.findOneAndUpdate({ name: room }, { language, code });
        socket.to(room).emit("language-update", language, code);
      } catch (error) {
        console.error(`Error updating language: ${error}`);
      }
    }
  );

  // ** Disconnect Event **
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
