function selectItem(type) {
	select = new XMLHttpRequest();
	select.responseType = "json"
	select.open("get", "http://" + ip + ":8080/selectItem/" + type, true);
	select.send()
	// 	console.log(type)
}
function dropItem(type) {
	window.event.preventDefault()
	select = new XMLHttpRequest();
	select.responseType = "json"
	select.open("get", "http://" + ip + ":8080/dropItem/" + type, true);
	select.send()
	//  	console.log("lol")
}
function invertItem(type) {
	window.event.preventDefault()
	select = new XMLHttpRequest();
	select.responseType = "json"
	select.open("get", "http://" + ip + ":8080/invertItem/" + type, true);
	select.send()
	//  	console.log("lol")
}
function equipItem(slot) {
	window.event.preventDefault()
	select = new XMLHttpRequest();
	select.responseType = "json"
	select.open("get", "http://" + ip + ":8080/equipItem/" + selectedItemType + "/" + slot, true);
	select.send()
}
function unequipItem(slot) {
	window.event.preventDefault()
	select = new XMLHttpRequest();
	select.responseType = "json"
	select.open("get", "http://" + ip + ":8080/unequipItem/" + slot, true);
	select.send()
	// 			 	console.log(slot)
}