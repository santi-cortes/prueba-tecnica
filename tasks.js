const { json } = require("body-parser")
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
        console.log(dataJson.lenght)
        dataJson.push({...obj, id: dataJson.lenght, completada: false})
        let document = fs.writeFileSync(dataBase, JSON.stringify(dataJson))
        console.log(document)
    } catch (error) {
        console.error("Hubo un error al registrar una tarea")
        error = true
    }
    return error
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