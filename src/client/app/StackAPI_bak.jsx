import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import * as RB from 'react-bootstrap';

class StackAPI extends React.Component {

	constructor(props) {
		super(props);
        this.onSearch = this.onSearch.bind(this);
        this.state = {results:[]};
    }

	onSearch(e) {
		e.preventDefault();
		var scope = this;
		let kwords = this.input.value.split(/[ ,]+/).join(';');
		console.log(kwords);
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

	render() {
		return (
			<div className="container">
			<RB.Form inline>
			<RB.FormGroup>
			<RB.FormControl type="text" defaultValue="nwjs" placeholder="Search" inputRef={ref => { this.input = ref; }}/>
			</RB.FormGroup>
			{' '}
			<RB.Button type="submit" onClick={this.onSearch} >Submit</RB.Button>

			</RB.Form>	
			<RB.ListGroup>{this.state.results.map((item, idx)=><Qbox {...item} key={item.question_id} />)}</RB.ListGroup>
			</div>


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
    	
    	let pBar = this.state.answers.length === 0 && this.props.answer_count > 0 ? <RB.ProgressBar active striped bsStyle="info" now={100} /> : null;

    	return (
    		<div>
	    		<RB.Panel 
	    		onClick={this.onClick}
	    		bsStyle={this.props.answer_count ? "info" : "danger"}
	    		header={ <QHeader {...this.props} /> }
	    		collapsible 
	    		expanded={this.state.open}>


	    		{this.props.title}
	    		<br/>date: {new Date(this.props["creation_date"]).toLocaleTimeString()}

	    		{pBar}

	    		<RB.ListGroup>
	    		  {this.state.answers.map(item=><Abox {...item} key={item.answer_id} />)}
	    		</RB.ListGroup>

	    		</RB.Panel>
    		</div>
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