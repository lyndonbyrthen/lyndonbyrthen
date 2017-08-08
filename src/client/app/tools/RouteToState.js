import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setCurApp, setInfoOpen } from '../actions'


class RouteToState extends React.Component {

  componentDidMount() {

    let id = this.props.match.params.id;

    if (!id) id = this.props.ids[0]
    id = id.toLowerCase();

    if (this.props.deltas[id]===undefined) id = '404'

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
    deltas: state.deltas,
    ids: state.ids,
  }
}

export default RouteToState = connect(mapStateToProps)(RouteToState)