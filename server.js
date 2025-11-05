const express = require("express")
const { getTasks, addTasks } = require("./tasks")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send({ message: "API de tareas activa" })
})

app.get("/tareas", async (req, res) => {
    let tasks = await getTasks()
    res.send(tasks)
})

app.post("/tareas", (req, res) => {
    const paramsReq = req.body
    console.log(paramsReq)
    const errorWrite = addTasks(req.body)
    errorWrite ? res.send({ message: "Error al guardar tarea" }) : res.send({ message: "Tarea guardada" })
})
app.put("/tareas/:id", (req, res) => {
    
})
app.delete("/tareas/:id", (req, res) => {
    
})


console.log("Servidor iniciado")
app.listen(3000)