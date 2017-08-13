import Matter from '../../libs/matter'
import debounce from 'debounce'

import { default as appSS} from './styles'


const {
    Engine,
    Render,
    Runner,
    Body,
    Composite,
    Composites,
    Common,
    Constraint,
    MouseConstraint,
    Mouse,
    World,
    Bodies,
    Vertices,
    Events
} = Matter

const rad=degree=>degree*Math.PI/180

class Visualizer2 {

	constructor(ops) {
		this.ops = ops
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.pause = this.pause.bind(this);
    this.kill = this.kill.bind(this);
    this.start = this.start.bind(this)


    this.mapIdx = 0;
    this.refreshTime = 30
    this.minBarHeight = 3
    this.barWidth = 20
    this.wheelRotation = 0
    this.radius = 100

    this.dataArray = new Uint8Array(256);
    this.isMute = true
    this.paused = true;

    /*this.start = this.start.bind(this);
    this.kill = this.kill.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);*/
	}

	setParent(parentEl) {
		this.parentEl = parentEl
	}

	setAnalyser(analyser) {
		this.analyser = analyser
	}

	setRecordedMap(recordedMap) {
		this.recordedMap = recordedMap
		// console.log(recordedMap)
	}

	update() {

    if (!this.recordedMap && !this.analyser) return
    let arr

    if (this.isMute && this.recordedMap) {
       
		  if (this.mapIdx >= this.recordedMap.length) this.mapIdx = 0;
	    arr = this.recordedMap[this.mapIdx]
	    this.mapIdx++

		} else {
	    this.analyser.getByteFrequencyData(this.dataArray);
       arr = this.dataArray;
		}

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    let centerX = WIDTH>>1
    let centerY = HEIGHT>>1
    let barHeight

    let r=this.radius, ang=360/this.bars.length,
        rota = this.wheelRotation,
        len = this.bars.length

    for (let i = 0; i < len/2; i++) {
      
      barHeight = this.radius * (arr[i]/250) / 2
      if (barHeight < this.minBarHeight) barHeight = this.minBarHeight
      
      let v = Vertices.fromPath('L 0 0 L ' + this.barWidth + ' 0 L ' + this.barWidth + ' ' + barHeight + ' L 0 ' + barHeight) 
      
      let x = centerX+(r-barHeight/2)*Math.cos(rad(i*ang+rota))
		  let y = centerY+(r-barHeight/2)*Math.sin(rad(i*ang+rota)) 

      let rgba = [];

      rgba.push(Math.round(350 * ((i)/this.bars.length)))
      rgba.push(Math.round(20 * ((i)/this.bars.length)));
      rgba.push(Math.round(barHeight + (300 * ((i)/this.bars.length))));

      rgba.push(.4)

      this.bars[i].render.fillStyle = 'rgba('+rgba.join(',')+')'
       
      Body.setAngle(this.bars[i], rad(0))
      Body.set(this.bars[i],{vertices:v,position:{x:x,y:y}})
      Body.setAngle(this.bars[i], rad(i*ang+rota-90))
    }

    for (let i = len/2; i < len; i++) {
      
      barHeight = this.radius * (arr[len-i]/250) / 2
      if (barHeight < this.minBarHeight) barHeight = this.minBarHeight

      let v = Vertices.fromPath('L 0 0 L ' + this.barWidth + ' 0 L ' + this.barWidth + ' ' + barHeight + ' L 0 ' + barHeight) 
      
      let x = centerX+(r-barHeight/2)*Math.cos(rad(i*ang+rota))
		  let y = centerY+(r-barHeight/2)*Math.sin(rad(i*ang+rota)) 

      let rgba = [];

      rgba.push(Math.round(350 * ((len-i)/this.bars.length)))
      rgba.push(Math.round(20 * ((len-i)/this.bars.length)));
      rgba.push(Math.round(barHeight + (300 * ((len-i)/this.bars.length))));

      rgba.push(.4)

      this.bars[i].render.fillStyle = 'rgba('+rgba.join(',')+')'

      Body.setAngle(this.bars[i], rad(0))
      Body.set(this.bars[i],{vertices:v,position:{x:x,y:y}})
      Body.setAngle(this.bars[i], rad(i*ang+rota-90))
    }

    this.wheelRotation++
    if (this.wheelRotation>360) this.wheelRotation = 0

	}

  auditBodies() {
    for (let i in this.bouncers) {
      let b = this.bouncers[i];
      
      if (b.position.x < 0 || b.position.x > window.innerWidth
        || b.position.y < 0 || b.position.y > window.innerHeight) {
        Body.set(b,{position:{x:window.innerWidth/2,y:window.innerHeight/2}});
      }
    }
  }


	create() {

		this.engine = Engine.create()
        this.world = this.engine.world
        this.world.gravity.y = 1

	    this.render = Render.create({
	        element: this.parentEl,
	        engine: this.engine,
	        options: {
	            width: window.innerWidth,
	            height: window.innerHeight,
	            background: 'transparent',
	            wireframeBackground:"transparent",
	            wireframes: false,
	        }
	    })

	    Render.run(this.render)

	    this.runner = Runner.create();
      // Runner.run(this.runner, this.engine);

      let WIDTH = window.innerWidth;
      let HEIGHT = window.innerHeight;

      let centerX = WIDTH>>1
      let centerY = HEIGHT>>1

      this.bouncers = []

	    let bcount = 35 * window.innerWidth/1000;

	    for (let i=0; i<bcount; i++) {
         this.bouncers.push(
         	Bodies.circle(centerX, centerY, Common.random(5, 18), { 
	          restitution:1,
	          friction: 0,
	          render : {
	            fillStyle : appSS.ballFillStyle
	          }
	        })
         )
	    }

	    World.add(this.world, this.bouncers);
      this.radius = WIDTH>HEIGHT ? HEIGHT*.4 : WIDTH*.4
        
        this.bars = [];

        let sides=200, r=this.radius, 
            h=40, 
            ang=360/sides

        this.barWidth=2*Math.PI*r/sides*.5
        if (this.barWidth < 3) this.bar = 3
 
		    for (let i = 0; i < sides; i++) {
		        this.bars.push(Bodies.rectangle(
		        	centerX+(r-h/2)*Math.cos(rad(i*ang)), 
		        	centerY+(r-h/2)*Math.sin(rad(i*ang)), 
		        	this.barWidth, 
		        	this.minBarHeight, 
		        	{ 
			          isStatic: true,
			          angle:rad(i*ang-90),
			          render : {
			            fillStyle : appSS.ballFillStyle
			          }
			        }))
		    }
        
        World.add(this.world,this.bars)


    let bottom =  Bodies.rectangle(window.innerWidth/2, window.innerHeight-30, window.innerWidth, 20, { 
      isStatic: true,
      render:{fillStyle:'transparent'}
    });
    bottom.label = 'bwall'

    World.add(this.world, [
        bottom,
        Bodies.rectangle(window.innerWidth/2, -50, window.innerWidth, 20, 
        	{ isStatic: true,
        		render:{fillStyle:'transparent'}
        	}),
        Bodies.rectangle(0, -10, 20, window.innerHeight*2, 
        	{ isStatic: true, 
        		render:{fillStyle:'transparent'}
        	}),
        Bodies.rectangle(window.innerWidth, -10, 20, window.innerHeight*2, 
        	{ isStatic: true,
        		render:{fillStyle:'transparent'}
        	})
    ]);

    this.onCollisionStart = (event)=> {
        var pairs = event.pairs;
        // change object colours to show those ending a collision
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            if (pair.bodyB.label == 'bwall') {
              Body.set(pair.bodyA,{position:{x:window.innerWidth/2,y:window.innerHeight/2}})
              if (pair.bodyA.render.fillStyle == appSS.ballFillStyle) {
                pair.bodyA.render.fillStyle = appSS.ballFillStyle2
              } else {
                pair.bodyA.render.fillStyle = appSS.ballFillStyle
              }
            }
        }
    }

    Events.on(this.engine, 'collisionStart', this.onCollisionStart);

    this.mouse = Mouse.create(this.render.canvas),
    this.mouseConstraint = MouseConstraint.create(this.engine, {
            mouse: this.mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(this.world, this.mouseConstraint);

    /*window.Runner = Runner
    window.runner = this.runner
    window.engine = this.engine*/
	}

	start() {
		this.pause(false)
	}

	pause(bool=true) {
		// console.log('pause',bool)
		if (bool === this.paused) return
		this.paused = bool
    if (bool) {
    	// Render.stop(this.render);
		  Runner.stop(this.runner);
		  clearInterval(this.updateInterval);
      clearInterval(this.auditInterval);
    } else {
    	// Render.run(this.render)
      Runner.run(this.runner, this.engine);
      this.updateInterval = setInterval(this.update,this.refreshTime);
      this.auditInterval = setInterval(this.auditBodies,2000);
    }
	}

	kill() {
		Events.off(this.engine, 'collisionStart', this.onCollisionStart);
		Render.stop(this.render);
		Runner.stop(this.runner);
		World.clear(this.engine.world,false,true);
		Engine.clear(this.engine);
		this.render.canvas.remove();
		clearInterval(this.updateInterval);
    clearInterval(this.auditInterval);
    this.paused = true
	}


}

export default Visualizer2