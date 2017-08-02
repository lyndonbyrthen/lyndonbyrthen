import React from 'react'
import PropTypes from 'prop-types'

import RefreshIndicator from 'material-ui/RefreshIndicator';
// import FullPage from '../components/FullPage'
import TweenMax from '../libs/gasp/TweenMax.min'

class AppContainer extends React.Component {
	
	constructor(props) {
		super(props);
    this.loadComponent = this.loadComponent.bind(this);
    this.updatePositions = this.updatePositions.bind(this);
    this.transOut = this.transOut.bind(this);
    this.transIn = this.transIn.bind(this);
    /*this.transOutComplete = this.transOutComplete.bind(this);
    this.transInComplete = this.transInComplete.bind(this);*/
	  this.state = {isCurApp:props.isCurApp};

    this.style = {
      container: {
        position: 'relative',
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
      },
      fullpage: {
        width:'100%',
        height:'100%',
        position: 'fixed'
      }
    }

    this.transTime = .5
  }

  updatePositions() {
    
  }

  transIn() {
    console.log(this.props.menuItem.name,'transin')
    TweenMax.fromTo(this.refs.page, this.transTime, {y:window.innerHeight}, {y:0});
  }

  transOut() {
    console.log(this.props.menuItem.name,'transout')

    TweenMax.fromTo(this.refs.page, this.transTime, {y:0}, {y:-window.innerHeight});
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props.menuItem.name,nextProps)
    if (this.props.isCurApp && !nextProps.isCurApp) this.transOut();
    else if (!this.props.isCurApp && nextProps.isCurApp) this.transIn();
    
    if (nextProps.isCurApp && !this.state.component) {
      this.loadComponent()
    } 
  }

  componentWillMount() {

    if (!this.props.isCurApp) return
    this.loadComponent();
    
  }

  componentDidMount() {
    // console.log('componentDidUpdate',this.props.menuItem.name,this.state.isCurApp,this.state.component)

    if (!this.state.isCurApp) TweenMax.to(this.refs.page, 0, {x:0,y:-999999});
    else TweenMax.to(this.refs.page, 0, {x:0,y:0});

  }

  loadComponent() {

    if (this.state.component) return

    let loadfunc = this.props.menuItem.loadfunc
    let scope = this

    loadfunc(mod=>{
      try {
         this.setState({component:mod.default});
       } catch(e) {
         console.log(e,'setState failed')
       }
       scope.props.menuItem.loaded = true;
    })
  }

  render() {

    // console.log('render',this.props.menuItem.name,this.state.isCurApp)

    let content

    //if (this.state.component && !this.state.isCurApp) content = (<div>loaded but not active</div>)
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