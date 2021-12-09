import { createNewUser } from "./objectMakers.js"
import { updateFileSystem, saveFileSystem } from "../data/fileSystem.js"

const randomlyGetQuestions = (fileSystem) => {
    const controlQuestions = fileSystem.filesAndDirs.find(obj => obj.name == "ask.txt").content
    console.log(controlQuestions.length)
    const arrayOfQuestions = []
    while (arrayOfQuestions.length != 3) {
        const indexOfQuestion = Math.floor(Math.random()*controlQuestions.length)
        if(!arrayOfQuestions.includes(indexOfQuestion)) arrayOfQuestions.push(indexOfQuestion)
    }
    return arrayOfQuestions
}

export const regAndAuthCommands = (fileSystem, command, userName, password) => new Promise ((resolve, reject) =>{
    switch(command){
        case "reguser":{
            const logBook = fileSystem.filesAndDirs.find(obj => obj.name == "logBook")
            console.log(logBook)
            logBook.content.push(createNewUser(userName, password, randomlyGetQuestions(fileSystem)))
           // fileSystem - updateFileSystem(fileSystem, oldLogBook, newLogBook)
            saveFileSystem(fileSystem)
            resolve(fileSystem)
        }

        break
    }
})