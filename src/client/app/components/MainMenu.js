import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListSubheader, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import HighlightOff from 'material-ui-icons/HighlightOff';

import { default as styles} from '../styles/styles'

class MainMenu extends React.Component {

  render() {

    let ids = this.props.ids
    let applist = ids.slice(0,ids.length-1);
    let pagelist = ids.slice(ids.length-1);

    let appChildren = applist.map(id=>{
          return (
            <Link style={styles.link} onClick={this.props.onTap} key={id} to={this.props.deltas[id]==0 ? '/' : '/'+id}>
              <ListItem disableRipple button disabled={this.props.curAppId===id}>
                  <ListItemText primary={this.props.names[id]} />
              </ListItem>
            </Link>
          )
        })

    let pageChildren = pagelist.map(id=>{
        return (
          <Link style={styles.link} onClick={this.props.onTap} key={id} to={this.props.deltas[id]===0? '/' : '/'+id}>
            <ListItem disableRipple button disabled={this.props.curAppId===id}>
                  <ListItemText primary={this.props.names[id]} />
            </ListItem>
          </Link>
        )
      })

  	return (
  		<Drawer
        open={this.props.menuOpen}
        onRequestClose={(open) => this.props.setMenuOpen(true)}
        onClick={this.props.onTap}
        elevation={4}
      >
      <List>
        <ListSubheader>
        Apps
        <IconButton 
                   style={{
                    position:'absolute',
                    right: 0
                   }}
                   onClick={() => this.props.setMenuOpen(false)}
                 
                 >
                   <HighlightOff />
                 </IconButton>

        </ListSubheader>
        {appChildren}
        <Divider/>
        {pageChildren}
        </List>
      </Drawer>
    )
  }
}

export default MainMenu