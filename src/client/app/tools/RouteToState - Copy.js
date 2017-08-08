import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setCurApp, setInfoOpen } from '../actions'


class RouteToState extends React.Component {

  constructor(props){
    super(props)
    this.onUpdate = this.onUpdate.bind(this);
    // console.log('RouteToState :: constructor')
  }

  onUpdate(nextProps,firstTime=false) {
    // console.log('RouteToState ::',this.props.match.params.id,'===>',nextProps.match.params.id);
    if (!firstTime && nextProps.match.params.id === this.props.match.params.id) return
    
    // if (!firstTime && nextProps.location.pathname === this.props.location.pathname) return

    let id = nextProps.match.params.id;
    if (!id) id = this.props.ids[0]
    id = id.toLowerCase();
    if (this.props.deltas[id]===undefined) id = '404'
       
    console.log('RouteToState ::',this.props.level,id);
    this.props.dispatch(setInfoOpen(false))
    this.props.dispatch(setCurApp(id))
  }

  componentWillReceiveProps(nextProps) {
    // console.log('RouteToState :: propsReceive',this.props.level)
    this.onUpdate(nextProps);
  }

  componentDidMount() {
    // console.log('RouteToState :: componentDidMount',this.props.level)
    this.onUpdate(this.props,true);
  }

  render() {
    return <span/>
  }
}

export default RouteToState