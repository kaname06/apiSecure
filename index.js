const os = require('os')
const fig = require('figlet')
const fs = require('fs-extra')
const path = require('path')
const md5 = require('js-md5')

PASSWORD = '2a2d686e632f8f6f8695f914591e292e'

let killProcess = () => {
    fig('Error!', function(err, data) {
        if (err) {
            console.log('Exiting, unable to run the app')
        }
        else
            console.log(data)
        process.exit()
    });
}

let check = async (ostarget = 'Linux') => {
    if(os.type() === ostarget) {
        let mainpath = process.cwd()
        let filepath = path.join(mainpath, 'authorization.key')
        if(fs.existsSync(filepath)) {
            let losda = fs.readFileSync(filepath, 'utf-8')
            try {
                losda = JSON.parse(losda)
                let i = 0;
                let q = 3
                while(i < q) {
                    losda.auth = md5(losda.auth)
                    i++;
                }
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
        }
        else
            killProcess()
    }
    else
        return;
}

// module.exports.check = check
check('Windows_NT')
