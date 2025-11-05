const fs = require("fs")

const dataBase = "tasks.json"

async function readJson() {
    let jsonData = fs.readFileSync(dataBase, "utf-8")
    let result = JSON.parse(jsonData)
    return result
}

async function writeJson(obj) {
    let error = false
    try {
        const dataJson = await readJson()
        dataJson.push({...obj, id: dataJson.length, completada: false})
        fs.writeFileSync(dataBase, JSON.stringify(dataJson))
    } catch (error) {
        console.error("Hubo un error al registrar una tarea")
        error = true
    }
    const typeMessage = error ? "Error al registrar una tarea" : "Tarea guardada"
    return typeMessage
}

const getTasks = async () => {
    const resultTasks = await readJson()
    return resultTasks
}

const addTasks = async (jsonTasks) => {
    const resultWriteTasks = await writeJson(jsonTasks)
    return resultWriteTasks
}

module.exports = { getTasks, addTasks }