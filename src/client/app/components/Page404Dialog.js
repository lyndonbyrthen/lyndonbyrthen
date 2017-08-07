import React from 'react'
import { default as theme} from '../styles/ui-theme'


import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';

import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import HighlightOff from 'material-ui/svg-icons/action/Highlight-off';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import { Link } from 'react-router-dom'

class Page404Dialog extends React.Component {

  render() {

      const actions = [
        <Link style={theme.link} to='/'>
        <RaisedButton
          label="OK"
          primary={true}
        />
        </Link>
      ];

     return(
      <Dialog
        title="404 Page not found"
        // overlayStyle={{backgroundColor:'transparent'}}
        // bodyStyle={{backgroundColor:'transparent'}}
        style={{backgroundColor:'transparent'}}
        actions={actions}
        paperProps={{zDepth:2}}
        modal={false}
        open={this.props.curAppId==='404'}
        onRequestClose={()=>{}}
        >

        Go to home page?
        
      </Dialog>
    )
  }
}

export default Page404Dialog




