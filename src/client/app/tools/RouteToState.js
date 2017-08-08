import React from 'react'
import PropTypes from 'prop-types'

class RouteToState extends React.Component {
  
  componentWillReceiveProps(nextProps) {
    this.props.onChange(nextProps)  
  }

  render(){
    return <span/>
  }
}

export default RouteToState