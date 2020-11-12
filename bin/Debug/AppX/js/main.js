 /// <reference path="external/babylon.d.ts" />

"use strict";

var canvas = null;

function main() {
    canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    const scene = createScene(engine);

    engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

function createScene(engine) {
    let scene = new BABYLON.Scene(engine);

    let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    //custom shader 
    const shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./minimal",
        {
            attributes: ["position"],
            uniforms: ["view"]
        });
    shaderMaterial.backFaceCulling = false;

    var lightSource = new BABYLON.PointLight("light", new BABYLON.Vector3(10,10,0), scene);
    lightSource.intensity = 10;

    //create ground
    var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("\images\ground_texture.jpg", scene);

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "height_map", 200, 200, 250, 0, 10, scene, false);
    ground.material = groundMaterial;

    var cube = BABYLON.Mesh.CreateBox("box", 5, scene);
    var cubeMat = new BABYLON.StandardMaterial("cubeMat", scene);
    cubeMat.diffuseTexture = new BABYLON.Texture("./images/minecraft_wood.png", scene);
    cubeMat.backFaceCulling = false;
    cube.material = cubeMat;

    //create sky [TO BE REPLACED x)]
    /*
    var sky = new BABYLON.SkyMaterial("skyMat", scene);
    sky.backFaceCulling = false;

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = sky;
    */

    return scene;
}

function createCube(name, scene) {
    let cubeMesh = new BABYLON.Mesh(name, scene);

    const positions =
        [
            .0, .0, .0,
            1.0, .0, .0,
            1.0, 1.0, .0,
            .0, 1.0, .0,
            .0, .0, 1.0,
            .0, 1.0, 1.0,
            1.0, .0, 1.0,
            1.0, 1.0, 1.0
        ];
    const indices = [
        0, 1, 2,
        0, 2, 3,

        0, 4, 5,
        0, 5, 3,

        1, 2, 6,
        2, 6, 7,

        4, 5, 6,
        5, 6, 7,

        4, 1, 0,
        1, 4, 6,

        3, 2, 5,
        2, 5, 7
    ];

    let vertexData = new BABYLON.VertexData();
    vertexData.positions = positions;
    vertexData.indices = indices;

    vertexData.applyToMesh(cubeMesh);

    return cubeMesh
}

/**
 * @param {string} name
 * @param {BABYLON.Scene} scene
 * @returns {BABYLON.Mesh}
 */

main();