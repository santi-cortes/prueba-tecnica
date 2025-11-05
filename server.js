const express = require("express");
const { getTasks, addTasks, deleteTask, markTask } = require("./tasks");
const app = express();
const PORT = 3000;

app.use(express.json());

const sendJSON = (res, status, data) => res.status(status).json(data);
const validateId = (id) => !isNaN(Number(id)) && Number(id) >= 0;

app.use((_, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

app.get("/", (_, res) => sendJSON(res, 200, { message: "API de tareas activa" }));

app.get("/tareas", async (_, res) => {
  try {
    const tasks = await getTasks();
    sendJSON(res, 200, { data: tasks });
  } catch {
    sendJSON(res, 500, { error: "Error al obtener las tareas" });
  }
});

app.post("/tareas", async (req, res) => {
  const { titulo } = req.body;
  if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
    return sendJSON(res, 400, { error: "Campo 'titulo' requerido y válido" });
  }

  try {
    const msg = await addTasks({ titulo: titulo.trim() });
    sendJSON(res, 201, { message: msg });
  } catch {
    sendJSON(res, 500, { error: "Error al registrar la tarea" });
  }
});

app.delete("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  if (!validateId(id)) return sendJSON(res, 400, { error: "ID inválido" });

  try {
    const msg = await deleteTask(Number(id));
    sendJSON(res, 200, { message: msg });
  } catch {
    sendJSON(res, 500, { error: "Error al eliminar la tarea" });
  }
});

app.put("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  if (!validateId(id)) return sendJSON(res, 400, { error: "ID inválido" });

  try {
    const msg = await markTask(Number(id));
    sendJSON(res, 200, { message: msg });
  } catch {
    sendJSON(res, 500, { error: "Error al actualizar la tarea" });
  }
});

app.use((_, res) => sendJSON(res, 404, { error: "Ruta no encontrada" }));

app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
