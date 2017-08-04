import React from 'react'
import PropTypes from 'prop-types'
import Physics from '../libs/physics/physicsjs-full'

import debounce from 'debounce'
import RaisedButton from 'material-ui/RaisedButton'


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
    this.audio = new Audio('/Nina Hagen - Du hast den Farbfilm vergessen.mp3');
    // this.audio.play();
    this.audio.currentTime = Math.random()*90;

    
    this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    let src = this.audioCtx.createMediaElementSource(this.audio);
    this.analyser = this.audioCtx.createAnalyser();

    src.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    this.analyser.fftSize = 128;
    this.bufferLength = this.analyser.frequencyBinCount;

    // console.log(this.bufferLength);

    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteFrequencyData(this.dataArray);
    
    Physics(this.engine);

    this.updateInterval = setInterval(this.update,10);

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
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
        let bar = this.bars[i]
        barHeight = this.dataArray[i] > 10 ?this.dataArray[i] : 10;
        bar.geometry.height = barHeight;
        bar.recalc();
        // this.world.render();
        x += barSpace;
    }

  }

  engine(world) {

    this.world = world;

    console.log(Physics.renderer)
    let renderer = Physics.renderer('canvas', {
      el: 'vis-canvas', // id of the canvas element
      width: window.innerWidth,
      height: window.innerHeight
      /*width: 500,
      height: 500*/
    });
    world.add(renderer);

    //add bars
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    let barWidth = (WIDTH / this.bufferLength);
    let barSpace = (WIDTH / this.bufferLength);
    let barHeight = 10;
    let x = 0;

    this.bars = [];

    for (let i = 0; i < this.bufferLength; i++) {
        

        let bar = Physics.body('rectangle', {
          x: x,
          y: 550,
          width: barWidth,
          height: barHeight,
          treatment:'static'
        });

        world.add(bar);
        this.bars.push(bar);
        x += barSpace;
    }

    Physics.util.ticker.on(function( time, dt ){
      world.step(time);
    });

    // start the ticker
    Physics.util.ticker.start();

    let scope = this;

    for (let j=0; j<25; j++) {
      world.add(Physics.body('circle', {
          x: 100,
          y: 0,
          radius: 5
        }));
    }

    world.on('step', function(){
      world.render();
    });

    
    world.add( Physics.behavior('constant-acceleration') );

    var bounds = Physics.aabb(0, 0,  window.innerWidth, window.innerHeight);

    world.add( Physics.behavior('body-impulse-response') );

    world.add( Physics.behavior('edge-collision-detection', {
      aabb: bounds,
      restitution: .3
    }) );
    world.add( Physics.behavior('body-collision-detection') );
    world.add( Physics.behavior('sweep-prune') );


  }

  render() {

  	return (
  		<div ref='root' style={this.style.fullpage} >
        <canvas ref='canvas'id='vis-canvas'/>
  		  <RaisedButton style={this.style.ontop} label='music' onTouchTap={this.toggle}/>
  		</div>
  	)
  }
}

export default App1;