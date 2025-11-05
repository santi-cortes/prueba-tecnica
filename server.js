const express = require("express");
const { getTasks, addTasks, deleteTask, markTask } = require("./tasks");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/", (_, res) => {
  res.status(200).json({ message: "API de tareas activa" });
});

app.get("/tareas", async (_, res) => {
  try {
    const tasks = await getTasks();
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

app.post("/tareas", async (req, res) => {
  const paramsReq = req.body;

  if (!paramsReq || typeof paramsReq !== "object" || !("titulo" in paramsReq)) {
    return res.status(400).json({ message: "Estructura inválida" });
  }

  try {
    const resultWrite = await addTasks(paramsReq);
    console.log(resultWrite);
    res.status(201).json({ message: resultWrite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la tarea" });
  }
});

app.delete("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const resultDelete = await deleteTask(id);
    res.status(200).json({ message: resultDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
});

app.put("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const resultMark = await markTask(id);
    res.status(200).json({ message: resultMark });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(3000, () => {
  console.log("Servidor iniciado en puerto 3000");
});
