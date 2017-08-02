import React from 'react'
import PropTypes from 'prop-types'

import RefreshIndicator from 'material-ui/RefreshIndicator';

class AppContainer extends React.Component {
	
	constructor(props) {
		super(props);
	  this.state = {};
  }

  componentWillMount() {

    var func = this.props.loadfunc(mod=>{
      try {
         this.setState({component:mod.default});
       } catch(e) {
         console.log(e,'setState failed')
       }
    });
  }

  render() {
  	if (this.state.component) return <this.state.component {...this.props} />;
    else return <RefreshIndicator
      size={40}
      left={10}
      top={0}
      status="loading"
      style={style.container}
    />
  }
}

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

export default AppContainer;