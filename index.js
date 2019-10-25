const os = require('os')
const fig = require('figlet')
const fs = require('fs-extra')
const path = require('path')
const cjs = require('crypto-ts')

PASSWORD = 'los5datos10son15correctos0'
VALIDKEYS = ["myh4sh", "c0mpl1c4t3dh45h", "4h4s5hm05tc0mpl1c4t3dth4npr3v"]

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

let Dec = async (data, opt) => {
    let bytes = await cjs.AES.decrypt(data.toString(), VALIDKEYS[opt]);
    return JSON.parse(bytes.toString(cjs.enc.Utf8));
}

let check = async (ostarget = 'Linux', opt = 0) => {
    if(os.type() === ostarget) {
        let mainpath = process.cwd()
        let filepath = path.join(mainpath, 'authorization.key')
        if(fs.existsSync(filepath)) {
            let losda = fs.readFileSync(filepath, 'utf-8')
            try {
                losda = await Dec(losda, opt)
                //should be works
                if(losda && losda.auth && losda.opt && typeof losda.opt == 'number' && losda.opt < 3 && ((losda.opt%1) == 0) && losda.date) {                    
                    if(losda.auth === PASSWORD) {
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

module.exports = {check}