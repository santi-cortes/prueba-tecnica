const fs = require("fs")

const dataBase = "tasks.json"

async function readJson() {
    let jsonData = fs.readFileSync(dataBase, "utf-8")
    let result = JSON.parse(jsonData)
    return result
}

async function writeJson(obj) {
  try {
    const dataJson = await readJson();
    const newId = dataJson.reduce((max, t) => Math.max(max, t.id), -1) + 1;
    dataJson.push({ ...obj, id: newId, completada: false });
    fs.writeFileSync(dataBase, JSON.stringify(dataJson));
    return "Tarea guardada";
  } catch (error) {
    console.error("Hubo un error al registrar una tarea", error);
    return "Error al registrar una tarea";
  }
}


const getTasks = async () => {
    const resultTasks = await readJson()
    return resultTasks
}

const addTasks = async (jsonTasks) => {
    const resultWriteTasks = await writeJson(jsonTasks)
    return resultWriteTasks
}

const deleteTask = async (id) => {
  try {
    const tasks = await readJson();
    const newTasks = tasks.filter((t) => t.id !== Number(id));
    if (newTasks.length === tasks.length) {
      return `No se encontró tarea con id ${id}`;
    }

    fs.writeFileSync(dataBase, JSON.stringify(newTasks));
    return `Tarea con id ${id} eliminada correctamente`;
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    return "Error al eliminar tarea";
  }
};

const markTask = async (id) => {
  try {
    const tasks = await readJson();
    const index = tasks.findIndex((t) => t.id === Number(id));

    if (index === -1) {
      return `No se encontró tarea con id ${id}`;
    }

    tasks[index] = { ...tasks[index], completada: true };
    fs.writeFileSync(dataBase, JSON.stringify(tasks));

    return `Tarea con id ${id} marcada como completada`;
  } catch (error) {
    console.error("Error al marcar tarea:", error);
    return "Error al marcar tarea como completada";
  }
};

module.exports = { getTasks, addTasks, deleteTask, markTask }