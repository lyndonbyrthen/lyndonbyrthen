import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'

import 'whatwg-fetch';

import Visualizer2 from './AudioVisualizer2/Visualizer2'

import Paper from 'material-ui/Paper';

import VolumeOff from 'material-ui-icons/VolumeOff';
import VolumeMute from 'material-ui-icons/VolumeMute';
import VolumeUp from 'material-ui-icons/VolumeUp';
import FileUpload from 'material-ui-icons/FileUpload';

import { default as styles} from '../styles/styles'
import { default as appSS} from './AudioVisualizer2/styles'

import ToolBarButton from '../components/ToolBarButton'


class AudioVisualizer2 extends React.Component {
  
  constructor(props) {
    super(props);
    this.initialize = this.initialize.bind(this);

    this.onToggleMute = this.onToggleMute.bind(this);
    
    
    this.addAudio = this.addAudio.bind(this);

    this.loadjson = this.loadjson.bind(this);
    this.onResize = debounce(this.onResize.bind(this),200);

    this.bouncers = [];
    this.barRes = 512;
    this.loop = true;

    this.loadjson();


    this.state = {isMute:true,audioLoaded:false}

    this.vis = new Visualizer2();
  }

  initialize() {
    
    // this.audio.currentTime = Math.random(initialize)*90;

    if (!this.audioInitialized) {
      this.file = this.refs.audiofile;
      this.audio = this.refs.audio;

      let scope = this;

      this.audio.addEventListener("loadeddata", (e) => {
        scope.setState({audioLoaded:true})
        console.log('loadeddata play?',(!scope.state.isMute && scope.props.isCurApp))
        if (!scope.state.isMute && scope.props.isCurApp) scope.audio.play()
      });

      this.audio.src = '/assets/Actraiser.mp3'
      this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();

      this.src = this.audioCtx.createMediaElementSource(this.audio);
      this.analyser = this.audioCtx.createAnalyser();
      this.src.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);

      this.analyser.fftSize = this.barRes;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.audioInitialized = true;
      
      this.vis.setAnalyser(this.analyser)
    } 

    try {
      if (!this.state.isMute) this.audio.play();
      this.audio.loop = this.loop;
    } catch (e) {

    }
  }

  loadjson() {
    let scope = this;

    fetch('./assets/recording.json').then(function(response) {
      return response.json()
    }).then((json)=>{
      console.log(json)
      scope.vis.setRecordedMap(json)
    })
  }

  addAudio(event) {
    this.audio.src = URL.createObjectURL(this.file.files[0]);
    this.setState({isMute:false})
  }

  onToggleMute() {
    if (this.state.isMute) this.audio.play();
    else this.audio.pause();
    this.setState({isMute:!this.state.isMute})
  }

  onResize(event) {
    console.log('onResize')
    if (!this.props.isCurApp) return
    this.vis.kill()
    this.vis.create()
    this.vis.pause(false)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)

    if (this.props.isCurApp && !nextProps.isCurApp) {
        //transition in start
        this.vis.pause()
        this.audio.pause();
    } else if (!this.props.isCurApp && nextProps.isCurApp) {
        //transition out start
    } else if (this.props.isCurApp && this.props.transitionState==='IN_TRANSITION' && nextProps.transitionState === 'INACTIVE') {
      //transition in finished
      //if window resized while on other pages

      if (window.innerWidth != this.vis.render.canvas.offsetWidth ||
        window.innerHeight != this.vis.render.canvas.offsetHeight) {
        this.vis.kill()
        this.vis.create()
      }
      this.vis.pause(false)
      if (!this.state.isMute) this.audio.play();
    } else if(!this.props.isCurApp && this.props.transitionState==='IN_TRANSITION' && nextProps.transitionState === 'INACTIVE') {
      //transition out finished
    }
  }

  componentDidUpdate() {
    
  }

  componentDidMount() {
    this.vis.setParent(this.refs.root)
    this.initialize()
    this.vis.create()
    this.vis.pause(false)
  }

  componentWillMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {

    this.vis.isMute = this.state.isMute

    let icon = this.state.isMute ? <VolumeOff color={styles.icon.color}/> : <VolumeMute color={styles.icon.color}/>
    // if (!this.state.audioLoaded) icon = null

  	return (
  		<div ref='root' style={appSS.root} >
        <audio ref="audio"></audio>
        <Paper style={styles.appToolBar} elevation={4}>

          <ToolBarButton onClick={this.onToggleMute}>
            {icon}
          </ToolBarButton>
        
          <ToolBarButton>
            <FileUpload/>
            <input ref='audiofile' onChange={this.addAudio} type="file" />
          </ToolBarButton>
          
        </Paper>
 
  		</div>
  	)
  }
}

export default AudioVisualizer2;