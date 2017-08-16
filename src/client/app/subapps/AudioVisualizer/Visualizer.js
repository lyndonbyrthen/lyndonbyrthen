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

let vendors = ['webkit', 'moz'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

class Visualizer {

	constructor(ops) {
		this.ops = ops
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.pause = this.pause.bind(this);
    this.kill = this.kill.bind(this);
    this.start = this.start.bind(this)
    this.step = this.step.bind(this)
    this.auditBodies = this.auditBodies.bind(this)

    this.mapIdx = 0;
    this.refreshTime = 30
    this.minBarHeight = 3
    this.barWidth = 20
    this.yOffset = .75
    this.barRes = 128

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

    let barHeight,len = this.bars.length

    for (let i = 0; i < len; i++) {

      barHeight = arr[i] > this.minBarHeight ? arr[i] : this.minBarHeight

      let v = Vertices.fromPath('L 0 0 L ' + this.barWidth + ' 0 L ' + this.barWidth + ' ' + barHeight + ' L 0 ' + barHeight) 
      // Body.set(this.bars[i],{vertices:v}) 
      let y = HEIGHT*this.yOffset; 
      // let y = HEIGHT*this.yOffset-barHeight/2; 

      /*let y = this.dataArray[i] > 20 ?this.dataArray[i] : 20;
      y = HEIGHT*this.yOffset - y*this.yFactor;*/

      let rgba = [];

      rgba.push(Math.round(barHeight + (22 * (i/len))));
      rgba.push(Math.round(200 * (i/len)));
      rgba.push(150)
      rgba.push(.2)

      this.bars[i].render.fillStyle = 'rgba('+rgba.join(',')+')'

      Body.set(this.bars[i],{vertices:v,position:{x:this.bars[i].position.x,y:y}})

    }

	}

  step() {
    if (this.paused) return
    
    let now = new Date().getTime()
    if (!this.timeStamp || now-this.timeStamp > this.refreshTime) {
      this.timeStamp = now
      this.update()
    }
    window.requestAnimationFrame(this.step);

  }

  auditBodies() {
    for (let i in this.bouncers) {
      let b = this.bouncers[i];
      
      if (b.position.x < 0 || b.position.x > window.innerWidth
        || b.position.y < 0 || b.position.y > window.innerHeight) {
        Body.set(b,{position:{x:Common.random(15, window.innerWidth-15),y:0}});
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

      //add bouncing balls
      //==================================================================================

	    let rowCount = 33 * window.innerWidth/1000;
      let pyramid = Composites.pyramid(35, 0, rowCount, 3, 0, 0, function(x, y) {
          return Bodies.circle(x, y, Common.random(5, 18), { 
            restitution:1,
            friction: 0,
            render : {
              fillStyle : appSS.ballFillStyle
            }
          });
      });
      this.bouncers = Composite.allBodies(pyramid);
      World.add(this.world, this.bouncers);
      this.auditBodies();

      //add bars
      //==================================================================================

      this.barWidth = (WIDTH / this.barRes)
    
      let x = 0;

      this.bars = []

      for (let i = 0; i < this.barRes; i++) {
          
          this.bars.push(Bodies.rectangle(x, 500, this.barWidth, this.minBarHeight, { 
            isStatic: true,
            render: {
              fillStyle: appSS.barFillStyle,
            }
          }))
          x+=this.barWidth
      }

      World.add(this.world,this.bars)
      

      //add walls
      //==================================================================================
      let wallStyle = {fillStyle:'transparent'}
      let bottom =  Bodies.rectangle(window.innerWidth/2, window.innerHeight-30, window.innerWidth, 20, { 
        isStatic: true,
        render:wallStyle
      });
      bottom.label = 'bwall'

      World.add(this.world, [
          bottom,
          Bodies.rectangle(window.innerWidth/2, -50, window.innerWidth, 20, 
          	{ isStatic: true,
          		render:wallStyle
          	}),
          Bodies.rectangle(0, -10, 20, window.innerHeight*2, 
          	{ isStatic: true, 
          		render:wallStyle
          	}),
          Bodies.rectangle(window.innerWidth, -10, 20, window.innerHeight*2, 
          	{ isStatic: true,
          		render:wallStyle
          	})
      ]);
      
      //collision detection
      //==================================================================================

      this.onCollisionStart = (event)=> {
          var pairs = event.pairs;
          // change object colours to show those ending a collision
          for (var i = 0; i < pairs.length; i++) {
              var pair = pairs[i];
              if (pair.bodyB.label == 'bwall') {
                Body.set(pair.bodyA,{position:{x:Common.random(15, window.innerWidth-15),y:0}})
                if (pair.bodyA.render.fillStyle == appSS.ballFillStyle) {
                  pair.bodyA.render.fillStyle = appSS.ballFillStyle2
                } else {
                  pair.bodyA.render.fillStyle = appSS.ballFillStyle
                }
              }
          }
      }

      Events.on(this.engine, 'collisionStart', this.onCollisionStart);
    
      //add mouse control
      //==================================================================================

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
      window.cancelAnimationFrame(this.updateInterval)
		  // clearInterval(this.updateInterval);
      clearInterval(this.auditInterval);
    } else {
    	// Render.run(this.render)
      Runner.run(this.runner, this.engine);
      this.updateInterval = window.requestAnimationFrame(this.step);
      // this.updateInterval = setInterval(this.update,this.refreshTime);
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

export default Visualizer