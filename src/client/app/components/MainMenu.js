import React from 'react'
import { default as theme} from '../styles/ui-theme'


import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';

import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import HighlightOff from 'material-ui/svg-icons/action/Highlight-off';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class MainMenu extends React.Component {

  render() {

    let appDataArr = this.props.appDataArr
    let applist = appDataArr.slice(0,appDataArr.length-1);
    let pagelist = appDataArr.slice(appDataArr.length-1);

  	return (
  		<Drawer 
              overlayStyle={{backgroundColor:'transparent'}}
              bodyStyle={{backgroundColor:'transparent'}}
              style={{backgroundColor:'transparent'}}
              onRequestChange={(open) => this.props.parent.setState({menuOpen:open})}
              docked={false} width={200} open={this.props.menuOpen} >
              <Menu onItemTouchTap={this.props.onTap}>
                 <IconButton 
                   style={{
                    position:'absolute',
                    right: 0
                   }}
                   onTouchTap={() => this.props.parent.setState({menuOpen:false})}
                 
                 >
                   <HighlightOff color={theme.icon.color}/>
                 </IconButton>
                <Subheader>Apps</Subheader>
                {  
                  applist.map((item,idx)=>{

                  return (
                    <Link style={theme.link} onClick={this.props.onTap} key={item.delta} to={ item.delta==0 ? '/' : '/'+item.id}>
                      <MenuItem primaryText={item.name} key={item.id} disabled={this.props.curApp.id===item.id}>
                      </MenuItem>
                    </Link>
                  )

                })}

                <Divider/> 

                {  
                  pagelist.map((item,idx)=>{

                  return (
                    <Link style={theme.link} onClick={this.props.onTap} key={item.delta} to={ item.delta===0? '/' : '/'+item.id}>
                      <MenuItem primaryText={item.name} key={item.id} disabled={this.props.curApp.id===item.id}>
                      </MenuItem>
                    </Link>
                  )

                })}


                  
              </Menu>
              
            </Drawer>
          )
  }
}

export default MainMenu