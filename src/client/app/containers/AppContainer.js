import React from 'react'
import PropTypes from 'prop-types'

import LinearProgress from 'material-ui/LinearProgress'
import { default as theme} from '../styles/ui-theme'

import TweenMax from '../libs/gasp/TweenMax.min'
import debounce from 'debounce'


class AppContainer extends React.Component {
	
	constructor(props) {
		super(props);
    this.loadComponent = this.loadComponent.bind(this);
    // this.onResize = debounce(this.onResize.bind(this),200);
    this.offView = this.offView.bind(this)
    this.transOut = this.transOut.bind(this);
    this.transIn = this.transIn.bind(this);
	  this.state = {isCurApp:props.isCurApp};

    this.style = {
      fullpage: {
        width:'100%',
        height:'100%',
        position: 'fixed',
        overflow:'hidden'
      }
    }

    this.transTime = .5
  }

  transIn(dir='up') {
    // console.log(this.props.appData.name,'transin')
    this.refs.page.style.position = 'fixed';
    let y = dir==='up' ? window.innerHeight : -window.innerHeight;
    TweenMax.fromTo(this.refs.page, this.transTime, {y:y}, {y:0, onComplete:()=>{this.refs.page.style.position = 'absolute'}});
  }

  transOut(dir='up') {
    // console.log(this.props.appData.name,'transout')
    this.refs.page.style.position = 'fixed';
    let y = dir==='up' ? -window.innerHeight : window.innerHeight;
    TweenMax.fromTo(this.refs.page, this.transTime, {y:0}, {y:y,onComplete:this.offView});
  }

  offView() {
    TweenMax.to(this.refs.page, 0, {x:0,y:-999999});
  }

  /*onResize(event) {
  }*/

  componentWillReceiveProps(nextProps) {
    // console.log(this.props.appData.id,nextProps)
    if (this.props.isCurApp && !nextProps.isCurApp) {
      let dir = nextProps.curApp.delta > this.props.appData.delta ? 'up' : 'down';
      this.transOut(dir);
    } else if (!this.props.isCurApp && nextProps.isCurApp) {
      let dir = this.props.curApp.delta > this.props.appData.delta ? 'down' : 'up';
      this.transIn(dir);
    }
    
    if (nextProps.isCurApp && !this.state.component) {
      this.loadComponent()
    } 
  }

  componentWillMount() {
    // window.addEventListener("resize", this.onResize);

    if (!this.props.isCurApp) return
    this.loadComponent();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  componentDidMount() {
    // console.log('componentDidUpdate',this.props.appData.name,this.state.isCurApp,this.state.component)

    if (!this.state.isCurApp) TweenMax.to(this.refs.page, 0, {x:0,y:-999999});
    else TweenMax.to(this.refs.page, 0, {x:0,y:0});

  }

  loadComponent() {

    if (this.state.component) return

    let loadfunc = this.props.appData.loadfunc
    let scope = this

    loadfunc(mod=>{
      try {
         this.setState({component:mod.default});
       } catch(e) {
         console.log(e,'setState failed')
       }
       scope.props.appData.loaded = true;
    })
  }

  render() {

    // console.log('render',this.props.appData.name,this.state.isCurApp)

    let content

    // console.log('this.state.component',this.state.component)

    if (this.state.component) content = (<this.state.component {...this.props} />)
    else content = (<LinearProgress/>)
    return (
      <div ref='page' style={theme.fullpage}>
          {content}
      </div>
    )
    
  }
}

export default AppContainer;