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

class MainToolBar extends React.Component {

  render() {

    let infoButton = (
       <FlatButton onTouchTap={this.props.onInfoOpen} style={theme.toolButton}>
         <InfoOutline color={theme.icon.color} />
       </FlatButton>
    )

    let info = this.props.curApp.description ? infoButton : null;

  	return (
  		<Paper
       style={{position:'fixed',
       width:'auto'}}
       zDepth={2}
       >
       <FlatButton onTouchTap={this.props.onMenuOpen} style={theme.toolButton}>
         <NavigationMenu color={theme.icon.color} />
       </FlatButton>

       {info}
       
     </Paper>
    )
  }
}

export default MainToolBar