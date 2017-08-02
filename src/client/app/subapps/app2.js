import React from 'react'
import PropTypes from 'prop-types'

import 'whatwg-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as mui from 'material-ui';


class App2 extends React.Component {


  render() {
  	return (
  		<mui.Paper>
  		This is app 2
  		</mui.Paper>
  	)
  }
}

export default App2;