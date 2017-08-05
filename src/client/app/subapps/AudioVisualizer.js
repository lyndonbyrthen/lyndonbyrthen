import React from 'react'
import PropTypes from 'prop-types'
import Matter from '../libs/matter'
import debounce from 'debounce'
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import VolumeOff from 'material-ui/svg-icons/AV/volume-off';
import VolumeMute from 'material-ui/svg-icons/AV/volume-mute';
import VolumeUp from 'material-ui/svg-icons/AV/volume-up';
import { default as theme} from '../styles/ui-theme'
import Paper from 'material-ui/Paper';


import 'whatwg-fetch';

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

class App1 extends React.Component {
  
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.onToggleMute = this.onToggleMute.bind(this);
    this.resume = this.resume.bind(this);
    this.kill = this.kill.bind(this);
    this.addAudio = this.addAudio.bind(this);
  	this.engine = this.engine.bind(this);
    this.update = this.update.bind(this);
    this.auditBodies = this.auditBodies.bind(this);

    this.loadjson = this.loadjson.bind(this);
    this.onResize = debounce(this.onResize.bind(this),200);

    this.bouncers = [];


    this.loadjson();

    this.recordingMap = null
    this.mapIdx = 0;

    this.loop = true;

    this.barHeight = 5;
    this.barWidthFactor = 2.5
    this.yFactor = 1.5;
    this.barRes = 512;
    this.yOffset = .75
    this.refreshTime = 30

    this.ballFillStyle = 'rgba(0,0,0,.15)'
    this.ballFillStyle2 = 'rgba(0,0,0,.25)'
    this.barFillStyle = 'rgba(0,0,0,0)'

    this.state = {isMute:true}

    this.style = {
      fullpage: {
        width:'100%',
        height:'100%',
        position: 'fixed',
        overflow:'hidden'
      },
      mute: {
        position:'absolute',
        top:10,
        right: 10,
        zIndex: 999999
      },
      choose: {
        position:'absolute',
        top:50,
        right: 0,
        zIndex: 999999
      },
      input: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
    }
  }

  loadjson() {
    let scope = this;
    fetch('/assets/recording.json').then(function(response) {
      return response.json()
    }).then((json)=>{
      // console.log(json)
      scope.recordingMap = json;
    })
  }

  addAudio(event) {
    this.audio.src = URL.createObjectURL(this.file.files[0]);
    this.audio.play();
  }

  onToggleMute() {
    this.setState({isMute:!this.state.isMute})
    this.audio.muted = !this.state.isMute
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
    } else if (!this.props.isCurApp && nextProps.isCurApp) {
    	//console.log('will start');
        if ((this.en.canvas.OffsetWidth !== window.innerWidth)
          ||(this.en.canvas.offsetHeight !== window.innerHeight)) {
          this.kill();
          this.start();
        } else {
          this.resume();
        }
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
    
    // this.audio.currentTime = Math.random()*90;

    if (!this.audioInitialized) {
      this.file = this.refs.audiofile;
      this.audio = this.refs.audio;
      this.audio.muted = this.state.isMute

      let scope = this;

      /*this.audio.addEventListener("ended", () => {
        // clearInterval(scope.updateInterval)
        // console.log(scope.recording)
      });*/

      this.audio.addEventListener("loadeddata", () => {
        if (scope.state.isMute && scope.props.isCurApp) scope.audio.play()
      });

      this.audio.src = '/assets/Actraiser.mp3'
      this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();

      this.src = this.audioCtx.createMediaElementSource(this.audio);
      this.analyser = this.audioCtx.createAnalyser();
      this.src.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);

      this.analyser.fftSize = this.barRes;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.barsNum = this.bufferLength >> 1
      // console.log(this.barsNum)
      this.dataArray = new Uint8Array(this.bufferLength);

      this.audioInitialized = true;

    }

    try {
      this.audio.play();
      this.audio.loop = this.loop;
    } catch (e) {

    }
    
    // console.log(this.bufferLength);


    this.en = this.engine();

    this.updateInterval = setInterval(this.update,this.refreshTime);
    this.auditInterval = setInterval(this.auditBodies,2000);

  }

  pause() {
    
    this.audio.pause();
    this.en.pause();
    clearInterval(this.updateInterval);
    clearInterval(this.auditInterval);

    
  }

  resume() {
    this.audio.play();
    this.audio.loop = this.loop;
    this.en.resume();
    this.updateInterval = setInterval(this.update,this.refreshTime);
    this.auditInterval = setInterval(this.auditBodies,2000);

  }

  kill() {
    
    this.en.kill();
    this.audio.pause();
    clearInterval(this.updateInterval);
    clearInterval(this.auditInterval);
    // this.audioCtx.close();
  }

  auditBodies() {
    for (let i in this.bouncers) {
      let b = this.bouncers[i];
      
      if (b.position.x < 0 || b.position.x > window.innerWidth
        || b.position.y < 0 || b.position.y > window.innerHeight) {
        Body.set(b,{position:{x:70,y:10}});
      }
    }
  }

  update() {

    // this.analyser.getByteTimeDomainData(this.dataArray);
    // console.log(this.audio.currentTime,Array.from(this.dataArray));
    // this.recording[this.audio.currentTime+''] = Array.from(this.dataArray)

    let arr;

    if (this.state.isMute && this.recordingMap) {
       if (this.mapIdx >= this.recordingMap.length) this.mapIdx = 0;
       arr = this.recordingMap[this.mapIdx]
       this.mapIdx++
    } else {
       this.analyser.getByteFrequencyData(this.dataArray);
       arr = this.dataArray;
    }

    // console.log(arr)

    let HEIGHT = window.innerHeight
    let barHeight


    for (let i = 0; i < this.barsNum; i++) {

      barHeight = arr[i] > this.barHeight ? arr[i] : this.barHeight; 

      let v = Vertices.fromPath('L 0 0 L ' + this.barWidth + ' 0 L ' + this.barWidth + ' ' + barHeight + ' L 0 ' + barHeight) 
      // Body.set(this.bars[i],{vertices:v}) 
      let y = HEIGHT*this.yOffset; 
      // let y = HEIGHT*this.yOffset-barHeight/2; 

      /*let y = this.dataArray[i] > 20 ?this.dataArray[i] : 20;
      y = HEIGHT*this.yOffset - y*this.yFactor;*/

      let rgba = [];

      rgba.push(Math.round(barHeight + (22 * (i/this.barsNum))));
      rgba.push(Math.round(200 * (i/this.barsNum)));
      rgba.push(205)
      rgba.push(.20)

      this.bars[i].render.fillStyle = 'rgba('+rgba.join(',')+')'

      Body.set(this.bars[i],{vertices:v,position:{x:this.bars[i].position.x,y:y}})

    }


  }

  engine() {

    let scope = this;
   
    // create engine
    let engine = Engine.create(),
        world = engine.world;
        world.gravity.y = .6;

    // create renderer
    let render = Render.create({
        element: this.refs.root,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'transparent',
            wireframeBackground:"transparent",
            wireframes: false,

        }
    });

    Render.run(render);

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    let rowCount = 33 * window.innerWidth/1000;

    let pyramid = Composites.pyramid(35, 0, rowCount, 3, 0, 0, function(x, y) {
        return Bodies.circle(x, y, Common.random(5, 18), { 
          restitution:1,
          friction: 0,
          render : {
            fillStyle : scope.ballFillStyle
          }
        });
    });

    this.bouncers = Composite.allBodies(pyramid);

    World.add(world, this.bouncers);

    this.auditBodies();

    this.bars = [];

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    this.barWidth = (WIDTH / this.bufferLength)*this.barWidthFactor;
    
    let x = 0;

    for (let i = 0; i < this.barsNum; i++) {
        
        this.bars.push(Bodies.rectangle(x, 500, this.barWidth, this.barHeight, { 
          isStatic: true,
          render: {
            fillStyle: scope.barFillStyle,
          }
        }))
        x+=this.barWidth
    }

    World.add(world, this.bars);

    let wallRender = {
      fillStyle: 'transparent'
    }

    let bottom =  Bodies.rectangle(window.innerWidth/2, window.innerHeight-30, window.innerWidth, 20, { 
      isStatic: true,
      render: wallRender
    });
    bottom.label = 'bwall'

    World.add(world, [
        bottom,
        Bodies.rectangle(window.innerWidth/2, -50, window.innerWidth, 20, { isStatic: true, render: wallRender }),
        Bodies.rectangle(0, -10, 20, window.innerHeight*2, { isStatic: true, render: wallRender }),
        Bodies.rectangle(window.innerWidth, -10, 20, window.innerHeight*2, { isStatic: true, render: wallRender })
    ]);

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

    let onCollisionStart = (event)=> {
        var pairs = event.pairs;
        // change object colours to show those ending a collision
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            if (pair.bodyB.label == 'bwall') {
              Body.set(pair.bodyA,{position:{x:Common.random(55, window.innerWidth-55),y:20}})
              if (pair.bodyA.render.fillStyle == this.ballFillStyle) {
                pair.bodyA.render.fillStyle = this.ballFillStyle2
              } else {
                pair.bodyA.render.fillStyle = this.ballFillStyle
              }
            }
        }
    }



    Events.on(engine, 'collisionStart', onCollisionStart);

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
            Events.off(engine, 'collisionStart', onCollisionStart);
        },
        resume: () => {
        	  Runner.start(runner,engine)
            Events.on(engine, 'collisionStart', onCollisionStart);
        },
        kill: () => {
            Events.off(engine, 'collisionStart', onCollisionStart);
            Render.stop(render);
            Runner.stop(runner);
            World.clear(engine.world,false,true);
            Engine.clear(engine);
            render.canvas.remove();
        }
    };
  }

  render() {

    let icon = this.state.isMute ? <VolumeOff color={theme.icon.color}/> : <VolumeMute color={theme.icon.color}/>

  	return (
  		<div ref='root' style={this.style.fullpage} >
  		  {/*<RaisedButton style={this.style.play} label='pause/play' onTouchTap={this.toggle}/>*/}
        
        {/*<RaisedButton style={this.style.choose} label='load music' labelPosition="before" containerElement='label'>
          <input ref='audiofile' onChange={this.addAudio} type="file" style={this.style.input}/>
        </RaisedButton>*/}
        <audio ref="audio"></audio>
        <Paper style={this.style.mute} >
        <IconButton onTouchTap={this.onToggleMute}>
              {icon}
        </IconButton>
        </Paper>
  		</div>
  	)
  }
}

export default App1;