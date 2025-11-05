const express = require("express")
const { getTasks, addTasks, deleteTask, markTask } = require("./tasks")
const app = express()

app.use(express.json())

app.get("/", (_, res) => {
    res.send({ message: "API de tareas activa" })
})

app.get("/tareas", async (_, res) => {
    let tasks = await getTasks()
    res.send(tasks)
})

app.post("/tareas", async (req, res) => {
    const paramsReq = req.body
    if (paramsReq === null || typeof paramsReq !== 'object' || !Object.keys(paramsReq).includes("titulo")) {
        res.send({ message: "Tu tarea no tiene la estructura requerida" })
    }
    const resultWrite = await addTasks(req.body)
    console.log(resultWrite)
    res.send({ message: resultWrite })
})

app.delete("/tareas/:id", async (req, res) => {
    const idTasks = req.params.id
    const resultDelete = await deleteTask(idTasks)
    res.send({ message: resultDelete })
})

app.put("/tareas/:id", async (req, res) => {
    const idTasks = req.params.id
    const resultDelete = await markTask(idTasks)
    res.send({ message: resultDelete })
})

console.log("Servidor iniciado")
app.listen(3000)