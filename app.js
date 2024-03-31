const express = require("express")

const app = express()
const PORT = 8080

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/api", (req, res) => {
  res.send("user on path /api")
})

app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`)
})

module.exports = app
