const express = require('express')
const app = express()
const fs = require('fs')
app.listen(3000, console.log("¡Servidor encendido!"))
app.get("/productos", (req, res) => {
const productos = JSON.parse(fs.readFileSync("productos.json"))
res.json(productos)
})