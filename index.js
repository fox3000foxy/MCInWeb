import mineflayer from 'mineflayer';
import http from 'http';
import express from 'express';
import cors from 'cors';
import Vec3 from 'Vec3';
import ip from 'ip';
import readline from 'readline';
import * as fs from 'fs';
import __dirname from 'path';
console.clear();
var app = express();
app.use(cors());
const PORT = 8080;
let username = process.argv[4] || `WebPlayer`
let bot = mineflayer.createBot({ host: process.argv[2] || "localhost", port: process.argv[3] || 25565, username: username });
// app.get("/connect/:h/:p/:un",(req,res)=>{
// bot.quit()
// username = req.params.un
// bot = mineflayer.createBot({ host: req.params.h, port: parseInt(req.params.p), username: req.params.un });
// res.status(200).send("Connected")
// })

const pathServer = process.cwd().split("/nodejs")[0]
console.log(pathServer)
const db = process.cwd().indexOf("nodejs")!=-1?".":""
function blockCursor() {
    var maxDistance = 256
    return bot.blockAtCursor(maxDistance)
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let types = []


 const typeFolder = db+'./public/assets/minecraft/textures/block/';



fs.readdir(typeFolder, (err, files) => {
    files.forEach(file => {
        if (file.indexOf(".png") != -1)
            types.push(file.split(".png")[0])
    });
    fs.writeFileSync(db+'./buffers/types.json', JSON.stringify(types))
});

function consoleTyper() {
    rl.question(`<${username}> `, function (data) {
        
        if(!data.startsWith("!"))
        bot.chat(data)
        else
        eval(data)
        consoleTyper()
    });
}
consoleTyper()
//res.send(200).json({"name":""})
app.use('/', express.static(pathServer+'/public'));
// app.use('/', express.static('public'));
var httpSocket = http.createServer(app);
httpSocket.listen(PORT, () => { console.log(`listening on *:${PORT}`); });

//let bot = 'nan'
//if (bot != 'nan') {
rl.on("close", function () {
    console.log("Server stopped");
    console.log(`${username || "Bot"} was disconnected`);
    process.exit(0)
});
function dismoitout() {
    app.get('/coords', (req, res) => {
        var pos = {
            x: bot.entity.position.x,
            y: bot.entity.position.y,
            z: bot.entity.position.z
        }
        var buffer = { "coords": { "x": parseInt(pos.x + 0.5), "y": parseInt(pos.y + 0.5), "z": parseInt(pos.z + 0.5) } }
         fs.writeFileSync(db+'./buffers/coords.json', JSON.stringify(buffer))
         res.status(200).sendFile(pathServer+`/buffers/coords.json`)
    })
    app.get('/inventory', (req, res) => {
        var buffer = bot.inventory
         fs.writeFileSync(db+'./buffers/inventory.json', JSON.stringify(buffer))
         res.status(200).sendFile(pathServer+`/buffers/inventory.json`)
    })

    //     console.log(bot.navigate)
}

    var selectedItemType;
app.get('/blocks', (req, res) => {
    var Position = {
        x: bot.entity.position.x,
        y: bot.entity.position.y,
        z: bot.entity.position.z
    }
    const radius = 4
    blockNames = new Array()
    for (let x = -radius; x <= radius; x++) {
        blockNames[x + radius] = new Array()
        for (let y = -radius; y <= radius + 3; y++) {
            blockNames[x + radius][y + radius] = new Array()
            for (let z = -radius; z <= radius; z++) {
                blockNames[x + radius][y + radius][z + radius] = bot.blockAt(new Vec3(Position.x + x, Position.y + y, Position.z + z)).name
            }
        }
    }
    var buffer = blockNames
         fs.writeFileSync(db+'./buffers/blocks.json', JSON.stringify(buffer))
        res.status(200).sendFile(pathServer+`/buffers/blocks.json`)
})

app.get('/blockType', (req, res) => {
         fs.writeFileSync(db+'./buffers/types.json', JSON.stringify(buffer))
         res.status(200).sendFile(pathServer+`/buffers/types.json`)
})

let blockNames = []

bot.on('spawn', () => {
    //         console.log(blockCursor())
    bot.on('chat', (p, msg) => console.log(`<${p}> ${msg}`))
    dismoitout()
    bot.on('blockUpdate', () => { dismoitout() })
    app.get("/lookAt/:x/:y/:z", (req, res) => {
        //console.log(req.params)
        bot.lookAt(new Vec3(req.params.x, req.params.y, req.params.z));
        res.send({ "message": "ok" })
    })
    app.get("/dig/:x/:y/:z", (req, res) => {
        //             bot.chat("/summon minecraft:bat ~ ~ ~ {Silent:1,ActiveEffects:[{Id:14,Amplifier:0,Duration:2147483647,ShowParticles:0b}]}")
        const filter = e => e.type === 'player'
        var entityPlayer = bot.nearestEntity(filter)
        //         console.log(entityPlayer.type)
        //             console.log(entityPlayer)
        var x = parseInt(req.params.x)
        var y = parseInt(req.params.y)
        var z = parseInt(req.params.z)

        bot.chat(`/setblock ${parseInt(blockCursor().position.x)} ${parseInt(blockCursor().position.y)} ${parseInt(blockCursor().position.z)} air destroy`)
        setTimeout(() => {
            bot.attack(entityPlayer, true)
            //             bot.chat("/tp @e[type=bat,sort=nearest,limit=1] ~ 256 ~")
            //             bot.chat("/execute positioned ~ 256 ~ run kill @e[type=bat,sort=nearest,limit=1]")
        }, 75)
        //             bot.dig(req.params.x, req.params.y, req.params.z);
        res.send({ "message": "ok" })
    })
    app.get("/place/:x/:y/:z/:face", (req, res) => {
        var direc = req.params.face
        //             console.log(direc)
        if (direc == "top") { y -= 1 }
        if (direc == "bottom") { y += 1 }
        if (direc == "left") { x += 1 }
        if (direc == "right") { x -= 1 }
        if (direc == "front") { z -= 1 }
        if (direc == "back") { z += 1 }
        const filter = e => e.type === 'player'
        var entityPlayer = bot.nearestEntity(filter)
        bot.chat(`/setblock ${parseInt(blockCursor().position.x) + x} ${parseInt(blockCursor().position.y) + y} ${parseInt(blockCursor().position.z) + z} dirt replace`)
        bot.attack(entityPlayer, true)
        res.send({ "message": "ok" })
    })
            app.get("/selectItem/:item",(req,res)=>{
            bot.equip(parseInt(req.params.item),"hand")
            selectedItemType=req.params.item
        })
          app.get("/equipItem/:item/:slot",(req,res)=>{
              if(req.params.item=="0") return
              let slot;
            switch(req.params.slot)
            {
                case '5':slot="head";break;
                case '6':slot="torso";break;
                case '7':slot="legs";break;
                case '8':slot="feet";break;
            }
            try{bot.equip(parseInt(req.params.item),slot)}
            catch(e){console.log(e)}
        })
        app.get("/unequipItem/:slot",(req,res)=>{
              let slot;
            switch(req.params.slot)
            {
                case '5':slot="head";break;
                case '6':slot="torso";break;
                case '7':slot="legs";break;
                case '8':slot="feet";break;
            }
//             console.log(req.params.slot)
//             console.log(slot)
            try{bot.unequip(slot)}
            catch(e){console.log(e)}
        })
            app.get("/dropItem/:item",(req,res)=>{
                bot.toss(parseInt(req.params.item),0,1)
        })
            
            app.get("/selectedItem",(req,res)=>{
                res.status(200).json(bot.quickBarSlot)
        })
            app.get("/invertItem/:item",(req,res)=>{
//             bot.equip(parseInt(req.params.item),"hand")
//                 console.log(parseInt(req.params.item))
            bot.equip(parseInt(selectedItemType),"off-hand")
            selectedItemType = req.params.item
        })
            
        app.get("/name",(req,res)=>{
                res.status(200).send(username)
        })            
        app.get("/trueAcc",(req,res)=>{
                res.status(200).send(process.argv[5])
        })
            
    app.get("/Coordinates/:x/:y/:z", (req, res) => {
        var ActualPosition = {
            x: bot.entity.position.x,
            y: bot.entity.position.y,
            z: bot.entity.position.z
        }

        
        var NewPosition = {
            x: req.params.x,
            y: req.params.y,
            z: req.params.z
        }
        bot.chat(`/tp ${NewPosition.x} ${NewPosition.y} ${NewPosition.z}`)

    })

})
//}
