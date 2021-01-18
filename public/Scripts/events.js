document.addEventListener("keydown", function (e) {
	keys.push(e.key);
	if (e.key == " " && canJump == true) {
		ySpeed = -(((1.3 / 5) * taille) / 1.5);
		console.log(ySpeed)
		canJump = false;
	}
});
document.addEventListener("keyup", function (e) {
	var newArr = [];
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] != e.key) {
			newArr.push(keys[i]);
		}
	}
	keys = newArr;
});
document.body.addEventListener("click", function () {
	controls.lock();
});
controls.addEventListener("lock", function () {

});
controls.addEventListener("unlock", function () {

});
