const express = require("express")
const connectDB = require("./config/db")
const CustomerRouter = require("./routes/CustomerRoute")
const app =  express();

connectDB();

app.use(express.json());

app.use("/api/customers",CustomerRouter)

const port = 3000;
app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`)
})