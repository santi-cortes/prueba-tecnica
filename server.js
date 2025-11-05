const fs = require("fs");

const DB_PATH = "tasks.json";

const readJson = async () => {
  try {
    const data = fs.readFileSync(DB_PATH);
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

const saveJson = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data));
};

const handleError = (msg, error) => {
  console.error(`${msg}:`, error?.message || error);
  return msg;
};

const getTasks = async () => readJson();

const addTasks = async (task) => {
  try {
    const tasks = await readJson();
    const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 0;
    const newTask = { ...task, id: newId, completada: false };
    tasks.push(newTask);
    saveJson(tasks);
    return "Tarea guardada";
  } catch (err) {
    return handleError("Error al registrar una tarea", err);
  }
};

const deleteTask = async (id) => {
  try {
    const tasks = await readJson();
    const filtered = tasks.filter(t => t.id !== Number(id));
    if (filtered.length === tasks.length)
      return `No se encontró tarea con id ${id}`;
    saveJson(filtered);
    return `Tarea con id ${id} eliminada correctamente`;
  } catch (err) {
    return handleError("Error al eliminar tarea", err);
  }
};

const markTask = async (id) => {
  try {
    const tasks = await readJson();
    const index = tasks.findIndex(t => t.id === Number(id));
    if (index === -1)
      return `No se encontró tarea con id ${id}`;
    tasks[index].completada = true;
    saveJson(tasks);
    return `Tarea con id ${id} marcada como completada`;
  } catch (err) {
    return handleError("Error al marcar tarea como completada", err);
  }
};

module.exports = { getTasks, addTasks, deleteTask, markTask };
