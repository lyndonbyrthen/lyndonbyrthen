import React from 'react'
import PropTypes from 'prop-types'

class RouteToState extends React.Component {
  
  componentWillReceiveProps(nextProps) {
    this.props.onChange(nextProps)  
  }

  componentDidMount() {
    this.props.onChange(this.props)
  }

  render(){
    return <span/>
  }
}

export default RouteToState