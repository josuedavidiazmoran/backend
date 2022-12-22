const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require(" . /config/app. config");
const errors = require(" ./middleware/errors");

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("Database Conectada");
    }, (error) => {
        console.log("Database no Conectada" + error);
    }
);

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api", require("./routes/approutes"));
app.use(errors.errorHandler);

app.listen(process.env.port || 5000, function() {
    console.log("Listo para ir!");
});