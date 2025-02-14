import { 
  ArcRotateCamera,
  Engine, 
  HemisphericLight, 
  MeshBuilder, 
  Scene, 
  SceneLoader, 
  StandardMaterial, 
  Texture, 
  Tools, 
  Vector3
} from 'babylonjs';
import "babylonjs-loaders";
import "@babylonjs/loaders";
import './style.css';


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
  
  var camera = new ArcRotateCamera(
    "camera", 
    Tools.ToRadians(90), 
    Tools.ToRadians(65), 
    10, 
    Vector3.Zero(), 
    scene);

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  new HemisphericLight('light1', new Vector3(0, 1, 0), scene);


  // Create a built-in "ground" shape;
  var ground = MeshBuilder.CreateGround(
    "ground1", 
    { width: 12, height: 12, subdivisions: 2, updatable: false }, 
    scene,
  );

  // Create material and set material texture
  const grassMaterial = new StandardMaterial("grassMaterial", scene);
  grassMaterial.diffuseTexture = new Texture("./aerial_grass_rock_diff_1k.jpg", scene);

  ground.material = grassMaterial;

  SceneLoader.ImportMeshAsync('', './red_angry_bird_plush/', 'scene.gltf', scene).then(
    (result) => {
      const rose = result.meshes[0];
      console.log(rose);
      rose.position = new Vector3(0, 1.8, -0.3);
      rose.scaling = new Vector3(5, 5, 5);
      rose.rotation = new Vector3(0, Math.PI/1.5, 0);
    },
  );

  // Gaussian Splatting
  SceneLoader.ImportMeshAsync('splat','./', 'leppakerttusiivottu.splat', scene).then((result) => {
    const splat = result.meshes[0];
    console.log(splat);
    splat.position = new Vector3(0, 0, 0);
    splat.rotation = new Vector3(0, -Math.PI/2, 0);
    splat.scaling = new Vector3(1.5, 1.5, 1.5);
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

