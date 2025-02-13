import { CastingResult } from './../node_modules/babylonjs/babylon.d';
import { Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Scene, SceneLoader, Vector3 } from 'babylonjs';
import './style.css'

// Get the canvas DOM element
const canvas = document. getElementById(
  'renderCanvas'
) as HTMLCanvasElement | null;

// Load the 3D engine
const engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

// CreateScene function that creates and return the scene
const createScene = () => {
  // Create a basic BJS Scene object
  const scene = new Scene(engine);
  // tähän ArcRoteCamera 004 vector 3 111
  // sitten camera.attacControl(canvas, false)
  // Create a FreeCamera, set name, and set its position 
  const camera = new FreeCamera(
    'camera1',
    new Vector3(0, 5, -10),
    scene
  );
  // Target the camera to scene origin
  camera.setTarget(Vector3.Zero());
  // Attach the camera to the canvas
  camera.attachControl(canvas, false);
  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
  // Create a built-in "sphere" shape using the SphereBuilder
  const sphere = MeshBuilder.CreateSphere(
    'sphere1', 
    {segments: 16, diameter: 2, sideOrientation: Mesh.FRONTSIDE}, 
    scene,
  );
  // Move the sphere upward 1/2 of its height
  sphere.position.y = 1;

  // Create a built-in "ground" shape;
  var ground = MeshBuilder.CreateGround(
    "ground1", 
    { width: 6, height: 6, subdivisions: 2, updatable: false }, 
    scene,
  );

  // Gaussian Splatting
  SceneLoader.ImportMeshAsync('splat','./', 'clstesti.splat', scene).then((result) => {
    result.meshes[0].position.y = 1.7;
  });
  // Return the created scene
  return scene;
};

// call the createScene function
const scene = createScene();
// run the render loop
engine.runRenderLoop(function(){
  scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
  engine.resize();
});

