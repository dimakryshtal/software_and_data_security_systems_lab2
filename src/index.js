import { getCommands, rl} from "./commandLine/commandLine.js"
import { getName, getPassword, checkPasswordAuthenticity } from "./commandLine/getNameAndPass.js"
import { users } from "./security/users.js"
import { loadFileSystem, createFileSystem } from "./data/fileSystem.js"
import { askQuestion } from "./commandLine/questions.js"

export const minPasswordLength = 4
export const maxNumberOfUser = 8
export const timeToChangePassword = 4
export const maxNumberOfFails = 4
let userFound = null

const main = async () => {
    createFileSystem()
    let fileSystem = loadFileSystem()
    const logbookUsers= fileSystem.filesAndDirs.find(obj => obj.name == "logBook").content
    

    while(userFound === null) {
        const name = "testuser1"//await getName()
        const password = "1234"//await getPassword()
        let userObject = logbookUsers.find(user => user.userName === name && user.password === password)
        if(userObject !== undefined && (userObject.userName == "admin" || await checkPasswordAuthenticity(userObject.passwordChangeTime))) {
            if(userObject.forbidden) {
                console.log("You have had too many mistakes proving to be the owner of the account. Ask the admin to register you again")
                process.exit(0)
            }
            userFound = name
            console.log("success")
            // console.log(logbookUsers)
        }
    }
    getCommands(userFound, fileSystem, "homeDir\\")
    
    setInterval(async () => {
        rl.write('\r')
        await askQuestion(userFound, fileSystem)
        getCommands(userFound, fileSystem, "homeDir\\")
    }, 5000)
    


}

main()

