import React from 'react'
import PropTypes from 'prop-types'

import RefreshIndicator from 'material-ui/RefreshIndicator';
// import FullPage from '../components/FullPage'
import TweenMax from '../libs/gasp/TweenMax.min'

class AppContainer extends React.Component {
	
	constructor(props) {
		super(props);
    this.loadComponent = this.loadComponent.bind(this);
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
    let y = dir==='up' ? window.innerHeight : -window.innerHeight;
    TweenMax.fromTo(this.refs.page, this.transTime, {y:y}, {y:0});
  }

  transOut(dir='up') {
    // console.log(this.props.appData.name,'transout')
    let y = dir==='up' ? -window.innerHeight : window.innerHeight;
    TweenMax.fromTo(this.refs.page, this.transTime, {y:0}, {y:y});
  }

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
    if (!this.props.isCurApp) return
    this.loadComponent();
  }

  componentWillUnmount() {
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

    if (this.state.component) content = (<this.state.component {...this.props} />)
    else content = (
      <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status="loading"
          style={this.style.container}
          />
          )
    return (
      <div ref='page' style={this.style.fullpage}>
          {content}
      </div>
    )
    
  }
}

export default AppContainer;