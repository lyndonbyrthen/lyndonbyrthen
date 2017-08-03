import React from 'react'
import PropTypes from 'prop-types'
import Matter from '../libs/matter'
import debounce from 'debounce'
import RaisedButton from 'material-ui/RaisedButton';

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
    Vertices
} = Matter


class App1 extends React.Component {
  
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.toggle = this.toggle.bind(this);
    this.resume = this.resume.bind(this);
    this.kill = this.kill.bind(this);
  	this.engine = this.engine.bind(this);
    this.update = this.update.bind(this);
    this.onResize = debounce(this.onResize.bind(this),200);

    this.style = {
      fullpage: {
        width:'100%',
        height:'100%',
        position: 'fixed',
        overflow:'hidden'
      },
      ontop: {
        position:'fixed',
        right: 0,
        zIndex: 999999
      }
    }
  }

  toggle() {
    if (this.audio.paused) {
        this.audio.play()
        this.audio.currentTime = Math.random()*90;
    }
    else this.audio.pause()
  }

  onResize(event) {
    if (!this.props.isCurApp) return
    this.kill();
    this.start();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props.menuItem.name,nextProps)
    if (this.props.isCurApp && !nextProps.isCurApp) {
    	//console.log('will stop');
        this.pause();
    }
    else if (!this.props.isCurApp && nextProps.isCurApp) {
    	//console.log('will start');
        this.resume();
    }
  }

  componentDidMount() {
    this.start();
  }

  componentWillMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  start() {
    this.audio = new Audio('/Guardian_Legend_Naju_Overture_OC_ReMix.mp3');
    // this.audio.play();
    this.audio.currentTime = Math.random()*90;

    
    this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    let src = this.audioCtx.createMediaElementSource(this.audio);
    this.analyser = this.audioCtx.createAnalyser();

    src.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;

    // console.log(this.bufferLength);

    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteFrequencyData(this.dataArray);

    this.en = this.engine();

    this.updateInterval = setInterval(this.update,20);

  }

  pause() {
    
    this.audio.pause();
    clearInterval(this.updateInterval);
    
  }

  resume() {
    this.audio.play();
    this.updateInterval = setInterval(this.update,10);
  }

  kill() {
    
    this.en.kill();
    this.audio.pause();
    this.audioCtx.close();
  }

  update() {

    this.analyser.getByteFrequencyData(this.dataArray);
    // console.log(this.dataArray);

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    let barWidth = (WIDTH / this.bufferLength);
    let barSpace = (WIDTH / this.bufferLength);
    let barHeight;
    let x = barWidth/2;

    for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i] > 20 ?this.dataArray[i] : 20;

        let v = Vertices.fromPath('L 0 0 L ' + barWidth + ' 0 L ' + barWidth + ' ' + barHeight + ' L 0 ' + barHeight)
        // let y = HEIGHT - barHeight/2;

        let y = 500;

        Body.set(this.bars[i],{vertices:v,position:{x:x,y:y}})
        x += barSpace;
    }

  }

  engine() {
   
    // create engine
    let engine = Engine.create(),
        world = engine.world;
        world.gravity.y = 1;

    // create renderer
    let render = Render.create({
        element: this.refs.root,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            showAngleIndicator: true,
            showCollisions: true,
            showVelocity: true
        }
    });

    Render.run(render);

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    let stack = Composites.stack(20, 20, 10, 5, 0, 0, function(x, y) {
        return Bodies.circle(x, y, Common.random(10, 25), { friction:0, frictionStatic:0, frictionAir:0, restitution:1, density: 1 });
    });
    
    World.add(world, stack);

    this.bars = [];

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    let barWidth = (WIDTH / this.bufferLength) * 2.5;
    let barHeight = 10;
    let x = barWidth/2;

    for (let i = 0; i < this.bufferLength; i++) {
        
        this.bars.push(Bodies.rectangle(x, 500, barWidth, barHeight, { slop:0, isStatic: true,friction:0, frictionStatic:0, frictionAir:0, restitution:1, density: 1 }))
        x+=barWidth
    }

    var group = Body.nextGroup(true);

    var bridge = Composites.stack(0, 10, 128, 1, 0, 0, function(x, y) {
        return Bodies.rectangle(x - 20, y, 53, 20, { 
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05,
            static:true,
            render: {
              fillStyle: '#575375'
            }
        });
    });
    
    Composites.chain(bridge, 0.3, 0, -0.3, 0, { 
        stiffness: 1,
        length: 0,
        render: {
            visible: false
        }
    });

    // World.add(world, bridge);

    World.add(world, this.bars);

    World.add(world, [
        Bodies.rectangle(window.innerWidth/2, -50, window.innerWidth, 20, { isStatic: true }),
        Bodies.rectangle(window.innerWidth/2, window.innerHeight-20, window.innerWidth, 20, { isStatic: true }),
        Bodies.rectangle(0, -10, 20, window.innerHeight*2, { isStatic: true }),
        Bodies.rectangle(window.innerWidth, -10, 20, window.innerHeight*2, { isStatic: true })
    ]);

    for (let i = 0; i < this.bufferLength; i++) {
        barHeight = 50

        let v = Vertices.fromPath('L 0 0 L ' + barWidth + ' 0 L ' + barWidth + ' ' + barHeight + ' L 0 ' + barHeight)
        Body.set(this.bars[i],{vertices:v})
    }

    // add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    console.log(render.options)

    // fit the render viewport to the scene
    /*Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 700, y: 600 }
    });*/

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        pause: () => {
        	  Runner.stop(runner)
        },
        resume: () => {
        	  Runner.start(runner,engine)
        },
        kill: () => {
            Render.stop(render);
            Runner.stop(runner);
            World.clear(engine.world);
            Engine.clear(engine);
            render.canvas.remove();
        }
    };
  }

  render() {

  	return (
  		<div ref='root' style={this.style.fullpage} >
  		  <RaisedButton style={this.style.ontop} label='music' onTouchTap={this.toggle}/>
  		</div>
  	)
  }
}

export default App1;