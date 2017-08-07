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
import ToolBarButton from '../components/ToolBarButton'


class MainToolBar extends React.Component {

  render() {

    let infoButton = (
      <ToolBarButton onTouchTap={(e)=>{this.props.setInfoOpen(true)}}>
        <InfoOutline/>
      </ToolBarButton>
    )

    let info = this.props.appsMap[this.props.curAppId] && 
    this.props.appsMap[this.props.curAppId].description ? infoButton : null;

  	return (
  		<Paper
       style={{position:'fixed',
       width:'auto'}}
       zDepth={2}
       >
       
       <ToolBarButton onTouchTap={()=>{this.props.setMenuOpen(true)}}>
        <NavigationMenu/>
       </ToolBarButton>

       {info}
       
     </Paper>
    )
  }
}

export default MainToolBar