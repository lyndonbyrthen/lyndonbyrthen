import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setCurApp, setInfoOpen } from '../actions'


class RouteToState extends React.Component {

  componentDidMount() {

    let id = this.props.match.params.id;

    if (!id) id = this.props.apps[0].id;
    id = id.toLowerCase();

    if (!this.props.appsMap[id]) id = '404'

    console.log('RouteToState ::',id);
    
    this.props.dispatch(setInfoOpen(false))
    this.props.dispatch(setCurApp(id))
  }

  render() {
    return <span/>
  }
}

const mapStateToProps = state => {
  return {
    curAppId : state.curAppId,
    apps: state.apps,
    appsMap: state.appsMap
  }
}

export default RouteToState = connect(mapStateToProps)(RouteToState)