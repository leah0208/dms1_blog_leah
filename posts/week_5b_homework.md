---
title: Week 5b homework
published_at: 2025-04-08
snippet: three.js example
disable_html_sanitization: true
allow_math: true
---
## A piece of glitch art by Sabato Visconti

![3](/week5/3.jpg)

This glitchy flower doesn’t feel traditionally beautiful—it’s weird, kind of broken, but that’s exactly why it grabs your attention. Like Sianne Ngai’s idea of the zany or the interesting, it’s not smooth or calm, but it’s full of energy.

The shape is still recognisable as a rose, so there's some structure. But the texture feels sharp, not soft, and the way it glitches makes it feel more like metal than petals. That mix of order and chaos is what gives it effective complexity.

That‘s what glitch art does best. It takes something familiar and messes with it :)))

**How do you think it works, under the hood?**

 If it was made with p5.js and three.js

 I think this can glitch an image or shape by changing its pixels. It might use`loadPixels()` to get the image data, then shift or swap some of the pixel values randomly. 

 Also might use a custom fragment shader to break how the light or color works by three.js??


## Three.js Example

<div id="three.js_container"></div>

<script type="importmap">
	{
		"imports": {
					"three": "/scripts/three.module.js",
					"three/addons/": "https://threejs.org/examples/jsm/"
				}
			}
		</script>

<script type="module">

			import * as THREE from '/scripts/three.module.js';
			import { FontLoader } from '/scripts/FontLoader.js';
	        import { OrbitControls } from '/scripts/OrbitControls.js';

			let camera, scene, renderer;

			init();

			function init( ) {

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, - 400, 600 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				const loader = new FontLoader();
				loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

					const color = 0x006699;

					const matDark = new THREE.LineBasicMaterial( {
						color: color,
						side: THREE.DoubleSide
					} );

					const matLite = new THREE.MeshBasicMaterial( {
						color: color,
						transparent: true,
						opacity: 0.4,
						side: THREE.DoubleSide
					} );

					const message = '   Three.js\nSimple text.';

					const shapes = font.generateShapes( message, 100 );

					const geometry = new THREE.ShapeGeometry( shapes );

					geometry.computeBoundingBox();

					const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

					geometry.translate( xMid, 0, 0 );

					// make shape ( N.B. edge view not visible )

					const text = new THREE.Mesh( geometry, matLite );
					text.position.z = - 150;
					scene.add( text );

					// make line shape ( N.B. edge view remains visible )

					const holeShapes = [];

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						if ( shape.holes && shape.holes.length > 0 ) {

							for ( let j = 0; j < shape.holes.length; j ++ ) {

								const hole = shape.holes[ j ];
								holeShapes.push( hole );

							}

						}

					}

					shapes.push( ...holeShapes );

					const lineText = new THREE.Object3D();

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						const points = shape.getPoints();
						const geometry = new THREE.BufferGeometry().setFromPoints( points );

						geometry.translate( xMid, 0, 0 );

						const lineMesh = new THREE.Line( geometry, matDark );
						lineText.add( lineMesh );

					}

					scene.add( lineText );

					render();

				} ); //end load function

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 0, 0 );
				controls.update();

				controls.addEventListener( 'change', render );

				window.addEventListener( 'resize', onWindowResize );

			} // end init

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}

		</script>
