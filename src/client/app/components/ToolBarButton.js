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


class ToolBarButton extends React.Component {

  render() {
      console.log(this.props.children)
      let children = React.Children.map(this.props.children,
       (child) => {

        if (!child.type) return child

        let props = {...child.props}

        if (child.type == 'input') {
          props = {...props, style:theme.hiddenInput}
        } else if (child.type.muiName && child.type.muiName == 'SvgIcon') {
          props = {...props, color:theme.icon.color}
        } else return child

         return React.cloneElement(child, props)
      });
    
  	return (
  		<FlatButton {...this.props} style={theme.toolBarButton} >
          {children}
      </FlatButton>
    )
  }
}

export default ToolBarButton