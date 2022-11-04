const app = require("./src/app");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const URI_DB = process.env.MONGO_URI;

(async () => {
  try {
    if (!URI_DB) {
      throw new Error("URI doesn't exist");
    }
    await mongoose.connect(URI_DB);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.error("Server start failed with the following error:", err.message);
    process.exit(1);
  }
})();
