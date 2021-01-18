var showInv;
var keypressed;
coolDown = 0
function keysCheck() {
	if (keys.includes("z")) {
		controls.moveForward(movingSpeed);
		if (autoJump == false) {
			for (var i = 0; i < chunks.length; i++) {
				for (var j = 0; j < chunks[i].length; j++) {
					if (camera.position.x <= chunks[i][j].x + 2.5 && camera.position.x >= chunks[i][j].x - 2.5 && camera.position.z <= chunks[i][j].z + 2.5 && camera.position.z >= chunks[i][j].z - 2.5) {
						if (camera.position.y == chunks[i][j].y - 2.5) {
							controls.moveForward(-1 * movingSpeed);
						}
					}
				}
			}
		}
	}
	if (keys.includes("i")) {
//         if(keypressed==0){
//             keypressed=1
// 		        showInv= showInv==1?0:1
// 				document.getElementById("invUi").style.display = showInv==1?"block":"none"
// 			   if(showInv==0)
// 				document.getElementById("invUi").src="inventory.html"
//         }
		location.href = "inventory.html?to="+location.href
	}
	if (keys.includes("q")) {
		controls.moveRight(-1 * movingSpeed);
		if (autoJump == false) {
			for (var i = 0; i < chunks.length; i++) {
				for (var j = 0; j < chunks[i].length; j++) {
					if (camera.position.x <= chunks[i][j].x + 2.5 && camera.position.x >= chunks[i][j].x - 2.5 && camera.position.z <= chunks[i][j].z + 2.5 && camera.position.z >= chunks[i][j].z - 2.5) {
						if (camera.position.y == chunks[i][j].y - 2.5) {
							controls.moveRight(movingSpeed);
						}
					}
				}
			}
		}
	}
	if (keys.includes("s")) {
		controls.moveForward(-1 * movingSpeed);
		if (autoJump == false) {
			for (var i = 0; i < chunks.length; i++) {
				for (var j = 0; j < chunks[i].length; j++) {
					if (camera.position.x <= chunks[i][j].x + 2.5 && camera.position.x >= chunks[i][j].x - 2.5 && camera.position.z <= chunks[i][j].z + 2.5 && camera.position.z >= chunks[i][j].z - 2.5) {
						if (camera.position.y == chunks[i][j].y - 2.5) {
							controls.moveForward(movingSpeed);
						}
					}
				}
			}
		}
	}
	if (keys.includes("d")) {
		controls.moveRight(movingSpeed);
		if (autoJump == false) {
			for (var i = 0; i < chunks.length; i++) {
				for (var j = 0; j < chunks[i].length; j++) {
					if (camera.position.x <= chunks[i][j].x + 2.5 && camera.position.x >= chunks[i][j].x - 2.5 && camera.position.z <= chunks[i][j].z + 2.5 && camera.position.z >= chunks[i][j].z - 2.5) {
						if (camera.position.y == chunks[i][j].y - 2.5) {
							controls.moveRight(-1 * movingSpeed);
						}
					}
				}
			}
		}
	}
	var newX = coords.coords.x + -(((chunkSize / 2) * taille - camera.position.x) / taille)
	var newY = coords.coords.y + -(((chunkSize / 2) * taille - camera.position.y) / taille) - 0.5
	var newZ = coords.coords.z + -(((chunkSize / 2) * taille - camera.position.z) / taille)
	xhr.open("GET", `http://${ip}:8080/Coordinates/${newX}/${newY}/${newZ}`, true);
	xhr.send()
}
