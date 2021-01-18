var scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);
scene.fog = new THREE.Fog(0x00ffff, 10, 650);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
