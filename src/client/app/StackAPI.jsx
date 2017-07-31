import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as mui from 'material-ui';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

injectTapEventPlugin();

class StackAPI extends React.Component {

	constructor(props) {
		super(props);
        this.doSearch = this.doSearch.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {results:[],kwords:'nwjs'};
    }

	doSearch() {
		var scope = this;
		let kwords = this.state.kwords.split(/[ ,]+/).join(';');
		console.log('searching keywords',kwords);
		let url = 'http://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&tagged='+kwords;
		fetch(url)
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			console.log(json.items);
			scope.setState({results:json.items});
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
	}

	onKeyPress(e) {
    // console.log(e.charCode);
    if(e.charCode !== 13) return;
    e.preventDefault();
    this.doSearch();
	}

	onSubmit(e) {
		e.preventDefault();
		this.doSearch();
	}

	render() {
		return (
			<MuiThemeProvider>
			  <div onKeyPress={this.onKeyPress}>
				  <mui.TextField 
					  id="key-words" 
					  hintText="key words"
					  defaultValue={this.state.kwords}
					  onChange={(e)=>{ this.setState({kwords:e.target.value}); }}
					  
				  />
					<mui.RaisedButton onClick={this.onSubmit} label="submit" />
					<mui.List>
					  {this.state.results.map((item, idx)=><Qbox {...item} key={item.question_id} />)}
					</mui.List>
				</div>
			</MuiThemeProvider>

		);
	}
}

class Qbox extends React.Component {

	constructor(props) {
		super(props);
        this.state = {open:false, answers:[]};
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
    	let scope = this;
    	this.setState({open:!this.state.open});
    	if (this.props.answer_count === 0 || this.state.answers.length>0) return;
    	let url = 'http://api.stackexchange.com/questions/'+this.props.question_id+'/answers?order=desc&sort=activity&site=stackoverflow';
		
		fetch(url)
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			console.log(json);
			scope.setState({answers:json.items})
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
    }

    render() {
    	
    	return (
    		<mui.ListItem>
    		  <mui.Badge
		    		badgeContent={this.props.answer_count}
		    		primary={true}
	    		>
	    		{this.props.title}
	    		</mui.Badge>
    		</mui.ListItem>
    	);
    }

}

class QHeader extends React.Component {

	constructor(props) {
		super(props);
    }

    render() {

    	let bsStyle = this.props.answer_count ? 'info' : 'danger';

    	return (
    		<div>
	    		<span>{this.props.title}</span>
	    		{' '}
	    		<RB.Badge bsStyle={bsStyle}>{this.props.answer_count}</RB.Badge>
    		</div>
    		
    	);
    }

}


class Abox extends React.Component {

	constructor(props) {
		super(props);
    }

    render() {

    	return (
    		<RB.ListGroupItem>
    		    <RB.Image md={4} src={this.props.owner.profile_image} thumbnail/>
    		    <br/>
	    		{this.props.answer_id}
	    		<br/>
	    		date: {new Date(this.props["creation_date"]).toLocaleTimeString()}
    		</RB.ListGroupItem>
    	);
    }

}

export default StackAPI;