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


class InfoDialog extends React.Component {

  render() {

    if (!this.props.appsMap[this.props.curAppId]) return <span/>
    
    return (
      <Dialog
          title={
            <div>
            <span>{this.props.appsMap[this.props.curAppId].name}</span>
              <IconButton 
              style={{
                position:'absolute',
                right: 0,
                top:0
              }}
              onTouchTap={() => {this.props.setInfoOpen(false)}}

              >
              <HighlightOff color={theme.icon.color}/>
              </IconButton>

            </div>
          }
          overlayStyle={{backgroundColor:'transparent'}}
          bodyStyle={{backgroundColor:'transparent'}}
          style={{backgroundColor:'transparent'}}
          // actions={actions}
          paperProps={{zDepth:2}}
          modal={false}
          open={this.props.infoOpen}
          onRequestClose={()=>{this.props.setInfoOpen(false)}}
          >
          
          {this.props.appsMap[this.props.curAppId].description}
      </Dialog>
    )
  }
}

export default InfoDialog

