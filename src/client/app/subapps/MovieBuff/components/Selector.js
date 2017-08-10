import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';

import Visibility from 'material-ui-icons/Visibility'

import ToolBarButton from '../../../components/ToolBarButton'
import { default as styles} from '../styles'


class Selector extends React.Component {

	constructor(props) {
    super(props)
    // console.log(props)
    this.onClose = this.onClose.bind(this)
    this.onClick = this.onClick.bind(this)

    this.options = ['ALL','FAVORED']   

    this.state = {
    	open: false,
    	selectedIndex:this.options.indexOf(this.props.viewType),
    	anchorEl:null
    }
  }

  onClick(event){
  	this.setState({ open: true, anchorEl: event.currentTarget });
  }

  onSelect(event,index){
  	this.setState({ open: false})
  	this.props.setView(this.options[index])
  }

  onClose(event,index) {
  	this.setState({selectedIndex:index})
  	this.props.setView(this.options[index])
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({'selectedIndex':this.options.indexOf(nextProps.viewType)})
  }

  render() {
    
  	let options = this.options
    let bText = this.options[this.state.selectedIndex]

    return (
      <div style={styles.viewSelector}>
        <Paper
         elevation={4}
        >
	        <ToolBarButton
	          aria-owns={this.state.open ? 'view-selector' : null}
	          aria-haspopup="true"
	          onClick={this.onClick}
	        >
	          <Visibility/>
	        </ToolBarButton>
        </Paper>

    		<Menu
          id="view-selector"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.onClose}
        >
          {options.map((option, index) =>
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.onSelect(event, index)}
            >
              {option}
            </MenuItem>,
          )}
        </Menu>
      </div>
    )
  }
	
}

export default Selector