import './style.css'
import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js'

//vars
window.buttonisActive = false

// Logic
document.getElementById("slider1").oninput = function () {
    var x = document.getElementById("slider1").value;
    document.getElementsByTagName("h1")[0].innerHTML = "Concept: " + x;


    document.getElementById("slider1").style.background = "hsl(240, 100%," + x / 2 + "%)";
}

document.getElementById("slider2").oninput = function () {
    var x = document.getElementById("slider2").value;
    document.getElementsByTagName("h2")[0].innerHTML = "Expression: " + x;

    document.getElementById("slider2").style.background = "hsl(58, 100%," + x / 2 + "%)";
}

document.getElementById("slider3").oninput = function () {
    var x = document.getElementById("slider3").value;
    document.getElementsByTagName("h3")[0].innerHTML = "Intensity: " + x;

    document.getElementById("slider3").style.background = "hsl(0, 100%," + x / 2 + "%)";
}

//toggles menu using "hide" button, using an event listenerthat listens for mouse down
document.getElementById("hide").addEventListener("mousedown", toggleMain);
document.getElementById("main").style.visibility = "visible";
function toggleMain() {
    if (document.getElementById("main").style.visibility == "visible") {
        document.getElementById("main").style.visibility = "hidden";
    } else {
        document.getElementById("main").style.visibility = "visible";
    }
}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const axis = new THREE.PlaneGeometry(2, 2); // width, height
const sphere = new THREE.SphereGeometry(0.05, 32, 32);

//Textures
const conceptTexture = new THREE.TextureLoader().load("https://i.imgur.com/mOjaTrU.jpg");
conceptTexture.wrapS = THREE.RepeatWrapping;
conceptTexture.wrapT = THREE.RepeatWrapping;
conceptTexture.rotation = Math.PI / 2 * 3;
conceptTexture.repeat.set(1, 1);

const expressionTexture = new THREE.TextureLoader().load("https://i.imgur.com/PQf9Uhr.jpg");
expressionTexture.wrapS = THREE.RepeatWrapping;
expressionTexture.wrapT = THREE.RepeatWrapping;
expressionTexture.repeat.set(1, 1);

const intensityTexture = new THREE.TextureLoader().load("https://i.imgur.com/EnV9Vfi.jpg");
    intensityTexture.wrapS = THREE.RepeatWrapping;
    intensityTexture.wrapT = THREE.RepeatWrapping;
    intensityTexture.flipY = false;
    intensityTexture.repeat.set(1, 1);


//#######################
// Materials
//#######################

//Yellow Dot
const material1 = new THREE.MeshStandardMaterial()
material1.color = new THREE.Color(0xFFFF00) //yellow
material1.transparent = true
material1.opacity = 0.3

//Blue Dot
const material2 = new THREE.MeshStandardMaterial()
material2.color = new THREE.Color(0x0000FF) //blue
material2.transparent = true
material2.opacity = 0.3

//Red Dot
const material3 = new THREE.MeshStandardMaterial()
material3.color = new THREE.Color(0xFF0000) //red
material3.transparent = true
material3.opacity = 0.3

//Dot texture
const material4 = new THREE.MeshStandardMaterial()
material4.color = new THREE.Color(0x00FFF8)
material4.transparent = true
material4.opacity = 1

//Plane textures
//Y Plane (Yellow Axis)
const material5 = new THREE.MeshStandardMaterial({map:intensityTexture})
material5.color = new THREE.Color(0xFFFFFF) //yellow
material5.transparent = true
material5.opacity = 0.8

//X Plane (Blue Axis)
const material6 = new THREE.MeshStandardMaterial({map:expressionTexture})
material6.color = new THREE.Color(0xffffff) 
material6.transparent = true
material6.opacity = 0.8

//Z Plane (Red Axis)
const material7 = new THREE.MeshStandardMaterial({map:conceptTexture})
material7.color = new THREE.Color(0xffffff) 
material7.transparent = true
material7.opacity = 0.8

// #######################
// End of Materials 
// #######################

// Mesh
const xaxis = new THREE.Mesh(axis, material5)
xaxis.material.side = THREE.DoubleSide
scene.add(xaxis)

const yaxis = new THREE.Mesh(axis, material6)
yaxis.material.side = THREE.DoubleSide
scene.add(yaxis)

const zaxis = new THREE.Mesh(axis, material7)
zaxis.material.side = THREE.DoubleSide
scene.add(zaxis)

const origin = new THREE.Mesh(sphere, material4)
scene.add(origin)

const xdot = new THREE.Mesh(sphere, material3)
scene.add(xdot)

const ydot = new THREE.Mesh(sphere, material2)
scene.add(ydot)

const zdot = new THREE.Mesh(sphere, material1)
scene.add(zdot)

// Location / Rotation
xaxis.rotateX(1.5708) //its in fucking radians???
xaxis.translateZ(1)

yaxis.rotateY(1.5708)
yaxis.translateZ(-1)

zaxis.rotateZ(1.5708)
zaxis.translateZ(-1)

xdot.translateZ(-0.99)
ydot.translateX(-0.99)
zdot.translateY(-0.99)


// Lights
const pointLight = new THREE.PointLight(0xffffff, 1.2)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 0
scene.add(pointLight)

let ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.set
    renderer.PixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
let camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = -0.5
camera.position.y = 1.5
camera.position.z = 6
scene.add(camera)

//Resets FOV when camera is moved
canvas.addEventListener('pointerdown', () => {
    document.getElementById("checkbox").checked = false;
    camera.fov = 45
    if (window.buttonisActive == true) {

        camera.position.z = 6
        camera.position.y = 1.5
        camera.position.x = -0.5

        window.buttonisActive = false
    }
    camera.updateProjectionMatrix();

}, false);

document.getElementById("button1").onclick = button3Action;
function button3Action() {
    camera.fov = 1
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 150
    camera.updateProjectionMatrix();

    document.getElementById("checkbox").checked = false;
    window.buttonisActive = true
}
document.getElementById("button3").onclick = button2Action;
function button2Action() {
    camera.fov = 1
    camera.position.x = 0
    camera.position.y = 150
    camera.position.z = 0
    camera.updateProjectionMatrix();

    document.getElementById("checkbox").checked = false;
    window.buttonisActive = true
}
document.getElementById("button2").onclick = button1Action;
function button1Action() {
    camera.fov = 1
    camera.position.x = 150
    camera.position.y = 0
    camera.position.z = 0
    camera.updateProjectionMatrix();

    document.getElementById("checkbox").checked = false;
    window.buttonisActive = true
}

// Controls
let controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    origin.position.x = document.getElementById("slider1").value * 0.02 - 1;
    origin.position.y = document.getElementById("slider2").value * 0.02 - 1;
    origin.position.z = document.getElementById("slider3").value * 0.02 - 1;

    xdot.position.x = document.getElementById("slider1").value * 0.02 - 1;
    xdot.position.y = document.getElementById("slider2").value * 0.02 - 1;

    ydot.position.y = document.getElementById("slider2").value * 0.02 - 1;
    ydot.position.z = document.getElementById("slider3").value * 0.02 - 1;

    zdot.position.z = document.getElementById("slider3").value * 0.02 - 1;
    zdot.position.x = document.getElementById("slider1").value * 0.02 - 1;

    material4.opacity = Math.sin(elapsedTime * 3) / 2 + 0.7

    //update light
    pointLight.position.x = document.getElementById("slider1").value * 0.02 - 1;
    pointLight.position.y = document.getElementById("slider2").value * 0.02 - 1;
    pointLight.position.z = document.getElementById("slider3").value * 0.02 - 1;

    if (document.getElementById("slider1").value < 5){
        pointLight.position.x = 5*0.02-1;
    }
    if (document.getElementById("slider2").value < 5){
        pointLight.position.y = 5*0.02-1;
    }
    if (document.getElementById("slider3").value < 5){
        pointLight.position.z = 5*0.02-1;
    }



    //SpIIIIiIiIiiiIiiIin (camera controls)
    var rotSpeed = 0.005
    var x = camera.position.x
    var z = camera.position.z
    let spinCam = document.getElementById("checkbox").checked;

    if (spinCam == true) {
        camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
        camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
        controls.enabled = false
    } else {
        controls.enabled = true
    }

    controls.update()


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()