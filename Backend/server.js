const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/user");
const Task = require("./models/task");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const dotenv = require("dotenv");
const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();
/*mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});*/
mongoose.connect("mongodb://localhost:27017/todoapp", {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Kullanıcı kayıt olma (Sign Up)
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
      userId: makeid(10), // Kullanıcı ID'sini string olarak oluşturuyoruz
    });
    await user.save();
    res.status(201).send({
      message: "User registered successfully",
      userId: user.userId,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Kullanıcı giriş yapma (Login)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "Invalid login credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).send({ error: "Invalid login credentials" });
    }

    const token = jwt.sign({ userId: user.userId }, "your_jwt_secret");
    res.send({ token, userId: user.userId });
  } catch (err) {
    res.status(400).send(err);
  }
});
// Kullanıcı bilgilerini dönen endpoint
app.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.userId }).select(
      "username email"
    );
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Kullanıcı şifre değiştirme
app.post("/change-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Find the user
    const user = await User.findOne({ userId: req.userId });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Verify the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Incorrect old password" });
    }

    // Hash the new password
    user.password = newPassword; // Don't hash it here

    await user.save();

    res.send({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// İş ekleme (Add Task)
app.post("/tasks", auth, async (req, res) => {
  const { title, description, priority, type, reminderFrequency } = req.body;
  const userId = req.userId; // auth middleware'den gelen userId
  const _id = makeid(15);
  console.log("UserID from middleware:", userId); // Debug log
  const task = new Task({
    _id,
    title,
    description,
    priority,
    type,
    reminderFrequency,
    userId,
  });

  try {
    await task.save();
    console.log("Task saved:", task); // Debug log
    res.status(201).send(task);
  } catch (err) {
    console.log("Error saving task:", err); // Debug log
    res.status(400).send(err);
  }
});

// Kullanıcıya özel iş listesi (Get User Tasks)
app.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({
      priority: 1, // Önceliğe göre sıralama (High, Medium, Low)
    });
    res.send(tasks);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Görev silme (Delete Task)
app.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Belirli bir ID'ye sahip görevi almak (Get Task by ID)
app.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});
//Belirli bir ID'ye sahip görevi tamamlanma durumunu güncelleme
app.put("/tasks/:id/complete", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // Görevi ID ve kullanıcıya göre bul
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });

    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }

    // `completed` alanını güncelle
    task.completed = req.body.completed;

    // Görevi kaydet
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
// Belirli bir ID'ye sahip görevi güncellemek (Update Task by ID)
app.put("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "description",
    "priority",
    "type",
    "reminderFrequency",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });

    if (!task) {
      return res.status(404).send();
    }

    task.completed = false;

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Sunucuyu başlatıyoruz
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
