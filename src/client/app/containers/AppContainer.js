import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { setTransitionState } from '../actions'


import { LinearProgress } from 'material-ui/Progress';
import { default as styles} from '../styles/styles'

import TweenMax from '../libs/gasp/TweenMax.min'
import debounce from 'debounce'


class AppContainer extends React.Component {
	
	constructor(props) {
		super(props);
    // console.log('AppContainer ::',props)
    this.loadComponent = this.loadComponent.bind(this);
    this.isCurApp = this.isCurApp.bind(this);

    this.offView = this.offView.bind(this)
    this.transOut = this.transOut.bind(this);
    this.transIn = this.transIn.bind(this);
    
    this.state = {component:null}

    this.transTime = .5
  }

  isCurApp() {
    return this.props.curAppId === this.props.appId
  }

  transIn(dir='up') {
    // console.log(this.props.appData.name,'transin')
    this.props.setTransitionState('IN_TRANSITION')
    this.refs.page.style.position = 'fixed';
    this.refs.page.style.overflow = 'hidden';
    let y = dir==='up' ? window.innerHeight : -window.innerHeight;
    TweenMax.fromTo(this.refs.page, this.transTime, {y:y}, {y:0, onComplete:()=>{
      this.refs.page.style.position = 'absolute'
      this.refs.page.style.overflow = 'auto'
      this.props.setTransitionState('INACTIVE')
    }});
  }

  transOut(dir='up') {
    // console.log(this.props.appData.name,'transout')
    this.refs.page.style.position = 'fixed';
    this.refs.page.style.overflow = 'hidden';
    let y = dir==='up' ? -window.innerHeight : window.innerHeight;
    TweenMax.fromTo(this.refs.page, this.transTime, {y:0}, {y:y,onComplete:this.offView});
  }

  offView() {
    TweenMax.to(this.refs.page, 0, {x:0,y:-999999});
  }

  componentWillReceiveProps(nextProps) {

    let prevDelta = this.props.deltas[this.props.curAppId] !== undefined ? 
    this.props.deltas[this.props.curAppId] : 0;
    
    let nextDelta = this.props.deltas[nextProps.curAppId] !== undefined ?
    this.props.deltas[nextProps.curAppId] : 0;

    let thisDelta = this.props.deltas[this.props.appId];
    /*console.log('nextProps.curAppId',nextProps.curAppId)
    console.log('prevDelta',prevDelta,'thisDelta',thisDelta,'nextDelta',nextDelta)*/

    //if isCurApp but new curApp is different
    if (this.isCurApp() && nextProps.curAppId !== this.props.appId) {
      let dir = nextDelta > prevDelta ? 'up' : 'down';
      this.transOut(dir);
      console.log()
    } else if (!this.isCurApp() && nextProps.curAppId === this.props.appId) {
      let dir = thisDelta < prevDelta ? 'down' : 'up';
      this.transIn(dir);
      this.loadComponent()
    }
    
  }

  componentWillMount() {
    if (!this.isCurApp()) return
    this.loadComponent();
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    if (!this.isCurApp()) TweenMax.to(this.refs.page, 0, {x:0,y:-999999});
    else TweenMax.to(this.refs.page, 0, {x:0,y:0});
  }

  loadComponent() {

    if (this.state.component) return
    
    let loadfunc = this.props.loadfuncs[this.props.appId]
    let scope = this

    loadfunc(mod=>{
      try {
         this.setState({component:mod.default});
       } catch(e) {
         console.log('AppContainer :: loadComponent() failed',e)
       }
    })
  }

  render() {

    // console.log('render',this.props.appData.name,this.state.isCurApp)

    let content

    // console.log('this.state.component',this.state.component)

    if (this.state.component) content = (<this.state.component appId={this.props.appId} isCurApp={this.isCurApp()} transitionState={this.props.transitionState}/>)
    else content = (<LinearProgress/>)
    return (
      <div ref='page' style={styles.fullpage} >
          {content}
      </div>
    )
    
  }
}

const mapStateToProps = state => {
  return {
    curAppId : state.curAppId,
    deltas: state.deltas,
    ids: state.ids,
    loadfuncs: state.loadfuncs,
    transitionState:state.transitionState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTransitionState : (transState) => {
      dispatch(setTransitionState(transState))
    },
    dispatch:dispatch,
  }
}

AppContainer = connect(mapStateToProps,mapDispatchToProps)(AppContainer)

export default AppContainer;