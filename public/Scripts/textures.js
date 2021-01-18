var loader = new THREE.TextureLoader();
oReq = []
newoReq = []
textures = []
function getMaterial(block, number) {
    oReq[number] = new XMLHttpRequest();
    date = new Date().getTime() / 1000
    oReq[number].open("get", "http://" + ip + ":8080/assets/minecraft/models/block/" + block + ".json", true);
    oReq[number].responseType = "json"
    oReq[number].send();
    opacity = block == "water" ? "opacity:0.5" : "opacity:1"
    setTimeout(`
        newoReq[${number}] = oReq[${number}].response
            textures[${number}] = newoReq[${number}].textures;
            if (textures[${number}].all)
            {
                textures[${number}].north = textures[${number}].all ;
                textures[${number}].south = textures[${number}].all ;
                textures[${number}].east = textures[${number}].all ;
                textures[${number}].west = textures[${number}].all ;
                textures[${number}].up = textures[${number}].all ;
                textures[${number}].down= textures[${number}].all ;
                textures[${number}].top= textures[${number}].all ;
                textures[${number}].bottom= textures[${number}].all ;
                textures[${number}].front= textures[${number}].all ;
            }
            
            if (textures[${number}].end)
            {
                textures[${number}].top= textures[${number}].all || textures[${number}].end;
                textures[${number}].bottom= textures[${number}].all || textures[${number}].end;
            }
            
            if (textures[${number}].cross)
            {
                textures[${number}].top = 'block\/air';
                textures[${number}].bottom = 'block\/air';
                textures[${number}].north = textures[${number}].cross;
                textures[${number}].south = textures[${number}].cross;
                textures[${number}].east = textures[${number}].cross;
                textures[${number}].west = textures[${number}].cross;
            }
            
            if ("${block}"=="water")
            {
                textures[${number}].north = 'block\/air'
                textures[${number}].south = 'block\/air'
                textures[${number}].east = 'block\/air'
                textures[${number}].west = 'block\/air'
            }
            if(textures[${number}].side){
                textures[${number}].north = textures[${number}].side
                textures[${number}].south = textures[${number}].side;
                textures[${number}].east = textures[${number}].side
                textures[${number}].west = textures[${number}].side                
            }
            
        baseUrl = "./assets/minecraft/textures/";
            materialArray[${number}] = [
			new THREE.MeshBasicMaterial({ ${opacity},transparent : true,map: loader.load(baseUrl + (textures[${number}].north.indexOf("minecraft:")!= -1 ? textures[${number}].north.split("minecraft:")[1] : textures[${number}].north) + ".png") }),
			new THREE.MeshBasicMaterial({ ${opacity},transparent : true, map: loader.load(baseUrl + (textures[${number}].east.indexOf("minecraft:")!= -1 ? textures[${number}].east.split("minecraft:")[1] : textures[${number}].east) + ".png") }),
			new THREE.MeshBasicMaterial({ ${opacity},transparent : true, map: loader.load(baseUrl + (textures[${number}].top.indexOf("minecraft:")!= -1 ? textures[${number}].top.split("minecraft:")[1] : textures[${number}].top) + ".png") }),
			new THREE.MeshBasicMaterial({ ${opacity},transparent : true, map: loader.load(baseUrl + (textures[${number}].bottom.indexOf("minecraft:")!= -1 ? textures[${number}].bottom.split("minecraft:")[1] : textures[${number}].bottom) + ".png") }),
			new THREE.MeshBasicMaterial({ transparent : true, map: loader.load(baseUrl + (textures[${number}].south.indexOf("minecraft:")!= -1 ? textures[${number}].south.split("minecraft:")[1] : textures[${number}].south) + ".png") }),
			new THREE.MeshBasicMaterial({ transparent : true, map: loader.load(baseUrl + (textures[${number}].west.indexOf("minecraft:")!= -1 ? textures[${number}].west.split("minecraft:")[1] : textures[${number}].west) + ".png") })
            ];
        `, 500)
}
