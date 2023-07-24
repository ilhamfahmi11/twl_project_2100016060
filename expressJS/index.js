const express = require("express");
const mongoose = require("mongoose");
const pendudukroute = require("./router/pendudukroute");
const userroute = require("./router/userroute");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

// Replace <password> with your actual password
const uri = "mongodb+srv://ilhamfahmi011:if111202@cluster0.9sxx3vm.mongodb.net/?retryWrites=true&w=majority";

app.use("/data", pendudukroute);
app.use("/user", userroute);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Menghentikan server jika terjadi kesalahan saat terhubung ke MongoDB
  });
