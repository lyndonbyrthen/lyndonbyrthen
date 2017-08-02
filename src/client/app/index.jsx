import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
// import Root from './containers/Root'
import AppLoader from './containers/AppLoader'

render(
  <AppLoader/>,
  document.getElementById('root')
)