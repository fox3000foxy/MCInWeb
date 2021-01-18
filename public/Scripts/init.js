ip = location.href.split("http://")[1].split(":")[0] || "localhost"
// ip = "localhost"
taille = 4
function initTerrain(type, material) {
    var t = taille
    blockBox = new THREE.BoxGeometry(t, t, t)
    var instancedChunk = new THREE.InstancedMesh(blockBox, material, renderDistance * renderDistance * chunkSize * chunkSize);
    count = 0;
    for (var i = 0; i < renderDistance; i++) {
        for (j = 0; j < renderDistance; j++) {
            for (k = 0; k < renderDistance; k++) {
                chunk = [];
                for (var x = i * chunkSize; x < (i * chunkSize) + chunkSize; x++) {
                    for (var z = j * chunkSize; z < (j * chunkSize) + chunkSize; z++) {
                        for (var y = k * chunkSize; y < (k * chunkSize) + chunkSize; y++) {
                            xoff = inc * x;
                            zoff = inc * z;
                            if (x < block.length && z < block[x][0].length) {
                                if (block[x][z][y] == type) {
                                    let matrix = new THREE.Matrix4().makeTranslation(
                                        x * t,
                                        z * t,
                                        y * t
                                    );
                                    instancedChunk.setMatrixAt(count, matrix);
                                }
                                if (alldirt[x][z][y] == "dirt") {
                                    chunk.push(new Block(x * t, z * t, y * t));
                                }
                            }
                            count++;
                        }
                    }
                }
//                 if(chunks.length>=chunkSize)
                chunks.push(chunk);
            }
        }
    }
    return instancedChunk
}

function lookBlockType() {
    blockType = []
     for (x = 0; x < block.length; x++) {
         for (z = 0; z < block[x].length; z++) {
             for (y = 0; y < block[x][z].length; y++) {
                if (!blockType.includes(block[x][z][y]) &&
                    block[x][z][y] != "air" &&
                    block[x][z][y] != "cave_air" &&
                    block[x][z][y] != "grass") {
                    blockType.push(block[x][z][y])
                }
            }
        }
    }
}

oReq3 = new XMLHttpRequest();
// oReq3.setRequestHeader('Access-Control-Allow-Origin', '*');
var isOk1 = 0
var isOk2 = 0
oReq3.responseType = "json"
oReq3.open("get", "http://" + ip + ":8080/coords", true);
oReq3.send();
isOk4 = 0
setTimeout(() => {
    interv2 = setInterval(() => {
        if (isOk2 == 1) return null
        if (oReq3.response) {
            coords = oReq3.response
//             coords.coords.y += 4
            isOk2 = 1
        }
        //         else eval(`coords = {"coords":{"x":-239,"y":72,"z":-195}}`)
    }, 50)
})

oReq2 = new XMLHttpRequest();
// oReq2.setRequestHeader('Access-Control-Allow-Origin', '*');
oReq2.responseType = "json"
oReq2.open("get", "http://" + ip + ":8080/blocks", true);
oReq2.send();
function interval1()
{
interv1 = setInterval(() => {
    if (isOk1 == 1) return null
    if (oReq2.response) {
        block = JSON.parse(JSON.stringify(oReq2.response))
        //         console.log(block)
        alldirt = JSON.parse(JSON.stringify(oReq2.response))
        for (i = 0; i < alldirt.length; i++) {
            for (j = 0; j < alldirt[0].length; j++) {
                for (k = 0; k < alldirt[0][0].length; k++) {
                    if (
                        alldirt[i][j][k] != "air" &&
                        alldirt[i][j][k] != "grass" &&
                        alldirt[i][j][k] != "cave_air" &&
                        alldirt[i][j][k] != "water") {
                        alldirt[i][j][k] = "dirt"
                    }
                }
            }
        }
        lookBlockType()
        isOk1 = 1
    }
    //         else oReq2.open("get", "http://"+ip+":8080/test.map", true);
}, 50)
}
interval1()
