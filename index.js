import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
const scene = new THREE.Scene()
const textureLoader = new THREE.TextureLoader()
const textures=[
    '2k_mercury.jpg',
    '2k_venus_surface.jpg',
    '2k_earth_daymap.jpg',
    '2k_mars.jpg',
    '2k_jupiter.jpg',
    '2k_saturn.jpg',
    '2k_uranus.jpg',
    '2k_neptune.jpg',
    '2k_sun.jpg'
]
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(108.49845488868118,50.06046846195937,300.2095668359693)
camera.rotation.set(-0.5866327458818762,0.1699606173815889,0.17647978789089527)
const renderer=new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
const light = new THREE.PointLight(0xffffff, 50000, 500);
light.position.set(0, 0, 0); 
scene.add(light);
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);
const geometrysun = new THREE.SphereGeometry(25, 32, 32)
const materialsun = new THREE.MeshBasicMaterial({ color: 0xffff00, map: textureLoader.load(textures[8]) })
const sun= new THREE.Mesh(geometrysun, materialsun)
scene.add(sun)
const geometrymercury = new THREE.SphereGeometry(3.8, 32, 32)
const materialmercury = new THREE.MeshStandardMaterial({ color: 0x8c8c8c, map: textureLoader.load(textures[0]) })
const mercury = new THREE.Mesh(geometrymercury, materialmercury)
mercury.position.x = 40
scene.add(mercury)
const geometryvenus = new THREE.SphereGeometry(6.8, 32, 32)
const materialvenus = new THREE.MeshStandardMaterial({ color: 0xe3bb76, map: textureLoader.load(textures[1]) })
const venus = new THREE.Mesh(geometryvenus, materialvenus)
venus.position.x = 60
scene.add(venus)
const geometryearth = new THREE.SphereGeometry(7, 32, 32)
const materialearth = new THREE.MeshStandardMaterial({ color: 0x2277ff , map: textureLoader.load(textures[2]) })
const earth = new THREE.Mesh(geometryearth, materialearth)
earth.position.x = 85
scene.add(earth)
const geometrymars = new THREE.SphereGeometry(8.3, 32, 32)
const materialmars = new THREE.MeshStandardMaterial({ color: 0xff3300, map: textureLoader.load(textures[3]) })
const mars = new THREE.Mesh(geometrymars, materialmars)
mars.position.x = 110
scene.add(mars)

const geometryjupiter = new THREE.SphereGeometry(15, 32, 32)
const materialjupiter = new THREE.MeshStandardMaterial({ color: 0xd39c7e, map: textureLoader.load(textures[4]) })
const jupiter = new THREE.Mesh(geometryjupiter, materialjupiter)
jupiter.position.x = 160
scene.add(jupiter)


const geometrysaturn = new THREE.SphereGeometry(8.5, 32, 32)
const materialsaturn = new THREE.MeshStandardMaterial({ color: 0xc5ab6e, map: textureLoader.load(textures[5]) })
const saturn = new THREE.Mesh(geometrysaturn, materialsaturn)
saturn.position.x = 210
scene.add(saturn)

const geometryuranus = new THREE.SphereGeometry(4.5, 32, 32)
const materialuranus = new THREE.MeshStandardMaterial({ color: 0xbbe1e4, map: textureLoader.load(textures[6]) })
const uranus = new THREE.Mesh(geometryuranus, materialuranus)
uranus.position.x = 260
scene.add(uranus)

const geometryneptune = new THREE.SphereGeometry(4.3, 32, 32)
const materialneptune = new THREE.MeshStandardMaterial({ color: 0x6081ff, map: textureLoader.load(textures[7]) })
const neptune = new THREE.Mesh(geometryneptune, materialneptune)
neptune.position.x = 310
scene.add(neptune)
const planets=[mercury,venus,earth,mars,jupiter,saturn,uranus,neptune]
const distances=[40,60,85,110,160,210,260,310]
const offsets=[Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI+Math.PI] 
var speed = 10
const orbitSpeeds = [
  0.25,     //mercury
  0.098,    //venus  
  0.06,     //earth  
  0.032,    //mars   
  0.03,    //jupiter
  0.029,    //saturn 
  0.028,   //uranus 
  0.0236   //neptune
];function createOrbit(distance) {
    const geometry = new THREE.RingGeometry(distance, distance + 0.2, 64);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x444444, 
        side: THREE.DoubleSide 
    });
    const orbit = new THREE.Mesh(geometry, material);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);
}
distances.forEach(distance => createOrbit(distance))

const clock = new THREE.Clock()
function animate() {
    requestAnimationFrame(animate)
    controls.update()
    const t=clock.getElapsedTime()
    planets.forEach((planet, index) => {
        var angle = t * orbitSpeeds[index] * speed + offsets[index]
        planet.position.x = distances[index] * Math.cos(angle)
        planet.position.z = distances[index] * Math.sin(angle)
    })
    renderer.render(scene, camera)
}
animate()
window.addEventListener('keydown', (e) => {
    if (e.key === 'p') {
        console.log('Camera Position:', camera.position);
        console.log('Camera Rotation:', camera.rotation);
    }
});
