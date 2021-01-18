function Block(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}
var chunks = [];
var xoff = 0;
var zoff = 0;
var inc = 0.05;
var amplitude = 30 + (Math.random() * 70);
var renderDistance = 10;
materialArray = []
keys = [];
canJump = true;
controls = new THREE.PointerLockControls(camera, document.body);
isOk3 = 0
interv3 = setInterval(() => {
	if (isOk3 == 1) return null

	if (isOk1 == 1 && isOk2 == 1) {
		chunkSize = block.length;
		for (i = 0; i < blockType.length; i++) {
			getMaterial(blockType[i], i)
		}
		camera.position.x = ((chunkSize / 2) - 0.5) * taille;
		camera.position.z = ((chunkSize / 2) - 0.5) * taille;
		camera.position.y = ((chunkSize / 2) + 0.5) * taille;
		if (location.hash) {
			camRot = location.hash.replace("#", "").split("/")
			camera.rotation.x = camRot[0]
			camera.rotation.y = camRot[1]
			camera.rotation.z = camRot[2]
		}
		isOk3 = 1
	}
}, 50)
interv4 = setInterval(() => {
	if (isOk4 == 1) return null
	if (isOk3 == 1 && materialArray.length == blockType.length) {
		init()
		isOk4 = 1
	}

}, 500)
// xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
xhr = new XMLHttpRequest();

function init() {
	comparation = setInterval(() => {
		ip = location.href.split("http://")[1].split(":")[0] || "localhost"
		oReq4 = new XMLHttpRequest()
		// oReq4.setRequestHeader('Access-Control-Allow-Origin', '*');
		oReq4.responseType = "json"
		oReq4.open("get", "http://" + ip + ":8080/blocks", true);
		oReq4.send();
		oReq4.onreadystatechange = function (){
			if (oReq4.response) {
				comparedTmp = JSON.parse(JSON.stringify(oReq4.response))
				for (i = 0; i < block.length; i++) {
					for (j = 0; j < block[i].length; j++) {
						for (k = 0; k < block[i][j].length; k++) {
                            if (comparedTmp[i][j][k] != block[i][j][k]) 
                            {
//                                 chunks=[]
                                if(comparedTmp[i][j][k]!="air")
                                {changed = comparedTmp[i][j][k]}
                                if(!blockType.includes(changed) && changed!="air")
                                {
                                    blockType.push(changed)
                                    iCn = blockType.indexOf(changed)
                                    getMaterial(changed,iCn)
                                }
                                else if(changed!="air")
                                {
                                iCn = blockType.indexOf(changed)
                                    eval(`scene.remove(instancedChunk${iCn})`)
                                }
//                                 console.log(iCn)
                                block = JSON.parse(JSON.stringify(comparedTmp))
                                eval(`
                                    instancedChunk${iCn} = initTerrain(blockType[typeOf+${iCn}],materialArray[typeOf+${iCn}]);
                                    scene.add(instancedChunk${iCn});	
                                    `)
//                                 console.log("changé")
                                }
							else{
							 //console.log("inchangé")
							}
						}
					}
				}
			}
        }
	}, 200)
	typeOf = 0

	collisions = initTerrain(blockType[typeOf], materialArray[typeOf])
	scene.add(collisions);

	typeOf = typeOf
	for (i = 0; i < blockType.length; i++) {
		eval(`
    instancedChunk${i} = initTerrain(blockType[typeOf+${i}],materialArray[typeOf+${i}])
    scene.add(instancedChunk${i});	
	`)
	}
	movingSpeed = 1;
	ySpeed = 0;
	acc = 0.08;
	function update() {
		keysCheck()
		camera.position.y = camera.position.y - ySpeed;
		ySpeed = ySpeed + acc;
		for (var i = 0; i < chunks.length; i++) {
			for (var j = 0; j < chunks[i].length; j++) {
				if (camera.position.x <= chunks[i][j].x + 2.5 && camera.position.x >= chunks[i][j].x - 2.5 && camera.position.z <= chunks[i][j].z + 2.5 && camera.position.z >= chunks[i][j].z - 2.5) {
					if (camera.position.y <= chunks[i][j].y + (taille * 2) && camera.position.y >= chunks[i][j].y) {
						camera.position.y = chunks[i][j].y + (taille * 2);
						ySpeed = 0;
						canJump = true;
						break;
					}
				}
			}
		}

		// Resize Window
		window.addEventListener("resize", function () {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		});
	}

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();
	pointer.x = (0.5) * 2 - 1;
	pointer.y = -1 * (0.5) * 2 + 1;


	var plane;
	function render() {
		raycaster.setFromCamera(pointer, camera);
		for (i = 0; i < blockType.length; i++) {
			eval(`getLook(instancedChunk${i})`)
		}
		renderer.render(scene, camera);
	}

	function GameLoop() {
		requestAnimationFrame(GameLoop);
		update();
		render();
		location.href = `#${camera.rotation.x}/${camera.rotation.y}/${camera.rotation.z}`
		if(camera.position.x < 0 || camera.position.x > (chunkSize-1)*taille) location.reload()
		if(camera.position.y < 0 || camera.position.y > (chunkSize+2)*taille) location.reload()
		if(camera.position.z < 0 || camera.position.z > (chunkSize-1)*taille) location.reload()
	}

	function getLook(block) {
		intersection = raycaster.intersectObject(block);
		if (intersection[0] != undefined && intersection[0].distance < 40) {
			//console.log(intersection[0]);
			if (!scene.children.includes(plane)) {
				var planeG = new THREE.PlaneGeometry(taille, taille);
				var planeM = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
				planeM.transparent = true;
				planeM.opacity = 0.5;
				plane = new THREE.Mesh(planeG, planeM);
				scene.add(plane);
			} else {
				plane.visible = true;
				materialIndex = intersection[0].face.materialIndex;
				var position = intersection[0].point; // object with x, y and z coords
				var x = 0;
				var y = 0;
				var z = 0;
				const inc = 0.1;
				switch (materialIndex) {
					case 0: // right
						plane.rotation.x = 0;
						plane.rotation.y = (Math.PI / 2);
						plane.rotation.z = 0;
						x = position.x + inc;
						y = Math.round(position.y / taille) * taille;
						z = Math.round(position.z / taille) * taille;
						break;
					case 1: // left
						plane.rotation.x = 0;
						plane.rotation.y = (Math.PI / 2);
						plane.rotation.z = 0;
						x = position.x - inc;
						y = Math.round(position.y / taille) * taille;
						z = Math.round(position.z / taille) * taille;
						break;
					case 2: // top
						plane.rotation.x = (Math.PI / 2);
						plane.rotation.y = 0;
						plane.rotation.z = 0;
						x = Math.round(position.x / taille) * taille;
						y = position.y + inc;
						z = Math.round(position.z / taille) * taille;
						break;
					case 3: // bottom
						plane.rotation.x = (Math.PI / 2);
						plane.rotation.y = 0;
						plane.rotation.z = 0;
						x = Math.round(position.x / taille) * taille;
						y = position.y - inc;
						z = Math.round(position.z / taille) * taille;
						break;
					case 4: // front
						plane.rotation.x = 0;
						plane.rotation.y = 0;
						plane.rotation.z = 0;
						x = Math.round(position.x / taille) * taille;
						y = Math.round(position.y / taille) * taille;
						z = position.z + inc;
						break;
					case 5: // back
						plane.rotation.x = 0;
						plane.rotation.y = 0;
						plane.rotation.z = 0;
						x = Math.round(position.x / taille) * taille;
						y = Math.round(position.y / taille) * taille;
						z = position.z - inc;
						break;
				}
				plane.position.x = x;
				plane.position.y = y;
				plane.position.z = z;
				approX = x / taille
				approY = y / taille
				approZ = z / taille
				// 			}
				lookX = coords.coords.x + -(((chunkSize / 2) * taille - approX * taille) / taille) - 0.5
				lookY = coords.coords.y + -(((chunkSize / 2) * taille - approY * taille) / taille) + 0.5
				lookZ = coords.coords.z + -(((chunkSize / 2) * taille - approZ * taille) / taille) - 0.5

				xhr2 = new XMLHttpRequest();
				// xhr2.setRequestHeader('Access-Control-Allow-Origin', '*');
				xhr2.open("GET", `/lookAt/${lookX + 1}/${lookY}/${lookZ}`, true);
				xhr2.send()
			}
		} else {
			if (plane) {
				plane.visible = false;
			}
		}
	}
	GameLoop();
}
if (location.href.includes("devMode")) {
	function placeBlock() {
		xhr2.open("GET", `/place/${lookX}/${lookY}/${lookZ}/${faces[materialIndex].dir[3]}`, true);

		//     scene.remove(instancedChunk0)
		//     isOk1 = 0
		//     interval1()
		//     setInterval(()=>{
		//         if (isOk1==1)
		//         {
		//             instancedChunk0 = initTerrain(blockType[0],materialArray[0])
		// //             scene.add(instancedChunk0)
		//         }
		//     })
		xhr2.send()
	}

	function digBlock() {
		if (scope.isLocked == true) {
			xhr2.open("GET", `/dig/${lookX}/${lookY}/${lookZ}`, true);
			xhr2.send()
		}
	}
}
