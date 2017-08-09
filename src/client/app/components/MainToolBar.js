import React from 'react'

import Paper from 'material-ui/Paper';

import InfoOutline from 'material-ui-icons/InfoOutline';
import NavigationMenu from 'material-ui-icons/Menu';

import ToolBarButton from '../components/ToolBarButton'


class MainToolBar extends React.Component {

  render() {

    let infoButton = (
      <ToolBarButton onClick={(e)=>{this.props.setInfoOpen(true)}}>
        <InfoOutline/>
      </ToolBarButton>
    )

    let info = this.props.deltas[this.props.curAppId] !== undefined && 
    this.props.descriptions[this.props.curAppId] ? infoButton : null;

  	return (
  		<Paper
       style={{position:'fixed',
       width:'auto'}}
       elevation={4}
       >
       
       <ToolBarButton onClick={()=>{this.props.setMenuOpen(true)}}>
        <NavigationMenu/>
       </ToolBarButton>

       {info}
       
     </Paper>
    )
  }
}

export default MainToolBar