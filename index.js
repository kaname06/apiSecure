const os = require('os')
const fig = require('figlet')
const fs = require('fs-extra')
const path = require('path')

PASSWORD = 'losdatossoncorrectos'

let killProcess = () => {
    fig('Error!', function(err, data) {
        if (err) {
            console.log('Exiting, unable to run the app')
        }
        console.log(data)
        process.exit()
    });
}

let check = async (ostarget) => {
    if(os.type() === ostarget) {
        let mainpath = process.cwd()
        let filepath = path.join(mainpath, 'authorization.key')
        if(fs.existsSync(filepath)) {
            let losda = fs.readFileSync(filepath, 'utf-8')
            try {
                losda = JSON.parse(losda)
                if(losda && losda.auth && losda.auth === PASSWORD && losda.date) {
                    try {
                        let lafe = new Date(losda.date)
                        let now = new Date
                        if(now > lafe) {
                            killProcess()
                        }
                        else
                            return;
                    } catch (e) {
                        killProcess()   
                    }
                }
                else
                    killProcess()
            } catch (error) {
                killProcess()
            }
            return;
        };
    }
    else
        return;
}

module.exports.check = check
