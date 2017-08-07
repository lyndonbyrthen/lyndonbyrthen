import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
// import Root from './containers/Root'
import AppLoader from './containers/AppLoader'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

import initState from './data/appData'

const store = createStore(
	reducer,
	initState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
	<AppLoader/>
  </Provider>,
  document.getElementById('root')
)