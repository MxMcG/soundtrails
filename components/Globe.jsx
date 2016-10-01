import React, { Component } from 'react';

import Search from './Search.jsx';

'use strict';

// App component - represents the whole app
export default class Globe extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div className="container" ref="video">
        <header>
          <h1 className="title">Tourlookup</h1>
          <div className="background">
            <div className="video displayNone" id="video">
            </div>
          </div>
        </header>
      </div>
    );
  }
=======
	constructor(props) {
		super(props);
	}


	componentDidMount() {

			var EarthWebGLDemo = EarthWebGLDemo || {};

			/**
			 * Create an instance of earth, represents the ThreeJS model with meshes and materials.
			 * You can load high or low quality textures with the query string "quality=high/low", ie: http://localhost:3000?quality=low
			 * @return {object} earth model
			 */
			EarthWebGLDemo.earth = function() {

				const pathEarthModelLow = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/168282/earth.obj';
				const pathEarthModelMaterialLow = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/168282/earth.mtl';  

				/**
				 * Represents the ThreeJS model of earth with meshes and materials.
				 * @type {Object}
				 */
				let earthObject = {
			 
					/**
					 * Are textures and materials loaded yet?
					 * @type {Boolean}
					 */
					isLoaded: false,

					/**
					 * Texture and materials loading progress
					 * @type {Number}
					 */
					percentLoaded: 0,

					/**
					 * Group containing the meshes that comprise atmosphere, clouds, terrain
					 * @type {[type]}
					 */
					meshGroup: null,

					/**
					 * Mesh representing the atmosphere
					 * @type {[type]}
					 */
					atmosphereMesh: null,

					/**
					 * Material on the atmosphere mesh
					 * @type {[type]}
					 */
					atmosphereMaterial: null,

					/**
					 * Mesh representing the clouds
					 * @type {[type]}
					 */
					cloudsMesh: null,

					/**
					 * Material on the clouds mesh
					 * @type {[type]}
					 */
					cloudsMaterial: null,

					/**
					 * Mesh representing terrain
					 * @type {[type]}
					 */
					terrainMesh: null,

					/**
					 * Material on the terrain mesh
					 * @type {[type]}
					 */
					terrainMaterial: null
				};

				/**
				 * Load materials and textures, then map them to the object.
				 * @param  {object} earthObject Target object to map.
				 */
				function mapMaterialsTexturesToObject(earthObject) {

					let lowQuality = true; //force low quality on codepen
					let earthPath, earthMaterialPath;

					earthPath = pathEarthModelLow;
					earthMaterialPath = pathEarthModelMaterialLow;
					
					THREE.ImageUtils.crossOrigin = 'anonymous';

					let loader = new THREE.OBJMTLLoader();
					loader.setCrossOrigin('anonymous');
					loader.load(earthPath, earthMaterialPath, (o) => {

							//map imported object (OBJ) to our wrapper
							earthObject.meshGroup = o;
							earthObject.atmosphereMesh = o.children[0];
							earthObject.atmosphereMaterial = earthObject.atmosphereMesh.children[1].material;
							earthObject.cloudsMesh = o.children[1];
							earthObject.cloudsMaterial = earthObject.cloudsMesh.children[1].material;
							earthObject.terrainMesh = o.children[2];
							earthObject.terrainMaterial = earthObject.terrainMesh.children[1].material;

							//make adjustments to the imported model that were lost in the import process
							earthObject.atmosphereMaterial.depthWrite = false;
							earthObject.cloudsMaterial.blending = THREE.AdditiveBlending;
							earthObject.cloudsMaterial.castShadow = true;
							earthObject.terrainMaterial.receiveShadow = true;

							//make sure the model isn't shiny otherwise it reflects light unrealistically
							earthObject.atmosphereMaterial.shininess = 0;
							earthObject.cloudsMaterial.shininess = 0;
							earthObject.terrainMaterial.shininess = 0;              

							//flag model as loaded after all adjustments
							earthObject.isLoaded = true;
						},

						/**
						 * Successful load
						 * @param  {object} xhr XmlHttpRequest
						 */
						(xhr) => {
							if (xhr.lengthComputable) {
								earthObject.percentLoaded = xhr.loaded / xhr.total * 100;
							}
						},

						/**
						 * Error loading earth materials and textures
						 * @param  {object} xhr XmlHttpRequest
						 */
						(xhr) => {
							console.error('Error loading earth materials and textures', xhr);
						});
				}

				mapMaterialsTexturesToObject(earthObject);
				return earthObject;
			};

			/**
			 * Get an instance of the stars field object
			 * @return {object} stars
			 */
			EarthWebGLDemo.starField = function() {

				let starFieldObject = {

					/**
					 * Represents the stars in the field
					 * @type {[type]}
					 */
					stars: null
				};

				let starGeometry = new THREE.Geometry();

				for (let i = 0; i < 10000; i++) {
					starGeometry.vertices.push(new THREE.Vector3(
						Math.random() * 2000 - 1000,
						Math.random() * 2000 - 1000,
						Math.random() * 2000 - 1000
					));
				}

				let starMaterial = new THREE.PointsMaterial();

				starMaterial.sizeAttenuation = false;
				starFieldObject.stars = new THREE.Points(starGeometry, starMaterial);

				return starFieldObject;
			};

			/**
			 * Create an instance of configurable settings for the demo.
			 * You can allow or disallow a GUI for these settings with the query string "ui=true/false", ie: http://localhost:3000?ui=false
			 * @return {object} Scene settings
			 */
			EarthWebGLDemo.settings = function() {

				/**
				 * Default sun color
				 * @type {String}
				 */
				const sunColor = '#ffeedd',

					/**
					 * Default sun intensity
					 * @type {Number}
					 */
					sunIntensity = 3.4,

					/**
					 * Default ambient light color
					 * @type {String}
					 */
					ambientLight = '#555555',

					/**
					 * Atmosphere is visible?
					 * @type {Boolean}
					 */
					atmsophereVisible = true,

					/**
					 * Atmosphere color
					 * @type {String}
					 */
					atmosphereColor = '#001ea3',

					/**
					 * Atmosphere opacity
					 * @type {Number}
					 */
					atmopshereOpacity = 0.22,

					/**
					 * Show atmosphere wireframe
					 * @type {Boolean}
					 */
					atmosphereWireframe = false,

					/**
					 * Clouds are visible?
					 * @type {Boolean}
					 */
					cloudsVisible = true,

					/**
					 * Clouds opacity
					 * @type {Number}
					 */
					cloudsOpacity = 0.9,

					/**
					 * Show clouds wireframe
					 * @type {Boolean}
					 */
					cloudsWireframe = false,

					/**
					 * Auto-rotate clouds around the planet?
					 * @type {Boolean}
					 */
					cloudsRotate = true,

					/**
					 * Speed of automatic cloud rotation (can be negative for backwards)
					 * @type {Number}
					 */
					cloudsVelocity = 0.002,

					/**
					 * Terrain is visible?
					 * @type {Boolean}
					 */
					terrainVisible = true,

					/**
					 * Terrain bump height scale (altitude of bump map, can be negative for inset)
					 * @type {Number}
					 */
					terrainBumpScale = 0.04,

					/**
					 * Show terrain wireframe
					 * @type {Boolean}
					 */
					terrainWireframe = false,

					/**
					 * Auto-rotate terrain?
					 * @type {Boolean}
					 */
					terrainRotate = true,

					/**
					 * Speed of automatic terrain rotation (can be negative for backwards)
					 * @type {Number}
					 */
					terrainVelocity = 0.001,

					/**
					 * Project URL
					 * @type {String}
					 */
					homepage = 'https://github.com/enesser/earth-webgl';

				let showUi = true; //force UI on codepen
				let gui = null;

				if (showUi) {
					gui = new dat.GUI({
						width: 360
					});
					gui.close();
				}

				/**
				 * Settings schema business object
				 * @type {Object}
				 */
				let settingsSchema = {
					/**
					 * Reset settings to default
					 */
					reset: function() {
						this.sunColor = sunColor;
						this.sunIntensity = sunIntensity;
						this.ambientLight = ambientLight;
						this.atmosphereVisible = atmsophereVisible;
						this.atmosphereColor = atmosphereColor;
						this.atmosphereOpacity = atmopshereOpacity;
						this.atmosphereWireframe = atmosphereWireframe;
						this.cloudsVisible = cloudsVisible;
						this.cloudsOpacity = cloudsOpacity;
						this.cloudsWireframe = cloudsWireframe;
						this.cloudsRotate = cloudsRotate;
						this.cloudsVelocity = cloudsVelocity;
						this.terrainVisible = terrainVisible;
						this.terrainBumpScale = terrainBumpScale;
						this.terrainWireframe = terrainWireframe;
						this.terrainRotate = terrainRotate;
						this.terrainVelocity = terrainVelocity;

						if (showUi) {
							for (let folder in gui.__folders) {
								for (let i in gui.__folders[folder].__controllers) {
									gui.__folders[folder].__controllers[i].updateDisplay();
								}
							}
						}
					},

					/**
					 * Go to home page
					 */
					homepage: function() {
						window.open(homepage, '_blank');
					}
				};

				/**
				 * Bind settings schema object to dat.gui interface.
				 * @param  {object} settingsSchema
				 */
				function bindSettingsSchemaToUi(settingsSchema) {
					let sunFolder = gui.addFolder('Sun');
					sunFolder.addColor(settingsSchema, 'sunColor');
					sunFolder.add(settingsSchema, 'sunIntensity').min(-10).max(50);
					sunFolder.addColor(settingsSchema, 'ambientLight');

					let atmosphereFolder = gui.addFolder('Atmosphere');
					atmosphereFolder.add(settingsSchema, 'atmosphereVisible');
					atmosphereFolder.addColor(settingsSchema, 'atmosphereColor');
					atmosphereFolder.add(settingsSchema, 'atmosphereOpacity').min(0).max(1);
					atmosphereFolder.add(settingsSchema, 'atmosphereWireframe');

					let cloudsFolder = gui.addFolder('Clouds');
					cloudsFolder.add(settingsSchema, 'cloudsVisible');
					cloudsFolder.add(settingsSchema, 'cloudsOpacity').min(0).max(1);
					cloudsFolder.add(settingsSchema, 'cloudsWireframe');
					cloudsFolder.add(settingsSchema, 'cloudsRotate');
					cloudsFolder.add(settingsSchema, 'cloudsVelocity').min(-0.01).max(0.01);

					let terrainFolder = gui.addFolder('Terrain');
					terrainFolder.add(settingsSchema, 'terrainVisible');
					terrainFolder.add(settingsSchema, 'terrainBumpScale').min(-10).max(10);
					terrainFolder.add(settingsSchema, 'terrainWireframe');
					terrainFolder.add(settingsSchema, 'terrainRotate');
					terrainFolder.add(settingsSchema, 'terrainVelocity').min(-0.01).max(0.01);

					gui.add(settingsSchema, 'reset');
					gui.add(settingsSchema, 'homepage');
				}

				settingsSchema.reset();

				if (showUi) {
					bindSettingsSchemaToUi(settingsSchema);
				}

				return settingsSchema;
			};

			/**
			 * Entry point for Earth WebGL Demo
			 * @param  {object} window
			 */
			((window, document) => {
				window.onload = () => {

					let scene,
						camera,
						renderer,
						directionalLightColor,
						directionalLight,
						ambientLightColor,
						ambientLight,
						atmosphereColor,
						settings,
						starField,
						earth,
						mouseX = 0,
						mouseY = 0,
						windowHalfX = window.innerWidth / 2,
						windowHalfY = window.innerHeight / 2;

					/**
					 * Initialize scene
					 */
					(function init() {

						//setup scene and perspective camera with a fov of 45, a near plane at 1, and a far plane at 1000
						scene = new THREE.Scene();
						camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

						//setup renderer with antialiasing enabled
						renderer = new THREE.WebGLRenderer({
							antialias: true
						});
						renderer.setPixelRatio(window.devicePixelRatio);
						renderer.setSize(window.innerWidth, window.innerHeight);

						//add rendering div to the DOM
						let container = document.createElement('div');
						document.getElementById('container').appendChild(container);
						container.appendChild(renderer.domElement);

						//create the sun
						directionalLightColor = new THREE.Color();
						directionalLight = new THREE.DirectionalLight(directionalLightColor);
						directionalLight.position.set(-1, 1, -10);
						directionalLight.castShadow = true;
						scene.add(directionalLight);

						//create ambient lighting
						ambientLightColor = new THREE.Color();
						ambientLight = new THREE.AmbientLight(ambientLightColor);
						scene.add(ambientLight);

						//allow the atmosphere color to be controlled by settings during render
						atmosphereColor = new THREE.Color();

						//import settings
						settings = EarthWebGLDemo.settings();

						//add stars to the scene
						starField = EarthWebGLDemo.starField();
						scene.add(starField.stars);

						//import the earth, but don't add it to the scene until the model is finished loading
						earth = EarthWebGLDemo.earth();
						earth.isAddedToScene = false;

						//allow the mouse to change the camera position when the user clicks and drags

						//update renderer and camera aspect to the new size of the drawing area on window resize
						window.addEventListener('resize', () => {
							windowHalfX = window.innerWidth / 2;
							windowHalfY = window.innerHeight / 2;
							camera.aspect = window.innerWidth / window.innerHeight;
							camera.updateProjectionMatrix();
							renderer.setSize(window.innerWidth, window.innerHeight);
						}, false);
					})();

					/**
					 * Render method, called each time a frame is rendered
					 */
					(function render() {

						//update sun with settings
						directionalLight.intensity = settings.sunIntensity;
						directionalLightColor.setStyle(settings.sunColor);
						directionalLight.color = directionalLightColor;

						//update ambient lighting with settings
						ambientLightColor.setStyle(settings.ambientLight);
						ambientLight.color = ambientLightColor;

						//update camera with mouse movements
						camera.position.set(5.25, 0, 0);
						camera.position.x += (mouseX - camera.position.x) * 0.005;
						camera.position.y += (-mouseY - camera.position.y) * 0.005;
						camera.lookAt(scene.position);

						//when earth model is fully loaded (including materials and textures)
						if (earth.isLoaded) {

							//atmosphere settings
							atmosphereColor.setStyle(settings.atmosphereColor);
							earth.atmosphereMesh.visible = settings.atmosphereVisible;
							earth.atmosphereMaterial.color = atmosphereColor;
							earth.atmosphereMaterial.opacity = settings.atmosphereOpacity;
							earth.atmosphereMaterial.wireframe = settings.atmosphereWireframe;

							//clouds settings
							earth.cloudsMesh.visible = settings.cloudsVisible;
							earth.cloudsMaterial.opacity = settings.cloudsOpacity;
							earth.cloudsMaterial.wireframe = settings.cloudsWireframe;
							if (settings.cloudsRotate) {
								earth.cloudsMesh.rotation.y += settings.cloudsVelocity;
							}

							//terrain settings
							earth.terrainMesh.visible = settings.terrainVisible;
							earth.terrainMaterial.bumpScale = settings.terrainBumpScale;
							earth.terrainMaterial.wireframe = settings.terrainWireframe;
							if (settings.terrainRotate) {
								earth.terrainMesh.rotation.y += settings.terrainVelocity;
							}

							//add the earth to the scene only when it's fully loaded
							if (!earth.isAddedToScene) {
								scene.add(earth.meshGroup);
								earth.isAddedToScene = true;
							}
						}

						//render the scene and loop for next frame update
						renderer.render(scene, camera);
						requestAnimationFrame(render);
					})();
				};
			})(window, document);

	}

	render() {
		return (
			<div className="container" ref="video">
				<header>
					<h1 className="title">Tourlookup</h1>
					<div className="background">
						<div className="video" id="video">
								<div id="container"></div>
						</div>
					</div>
				</header>
			</div>
		);
	}
>>>>>>> adds globe, artist db
}

