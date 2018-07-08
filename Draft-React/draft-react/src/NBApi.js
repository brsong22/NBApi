import React, { Component } from 'react';
import DraftForm from './DraftForm';
import DraftStats from './DraftStats';
import logo from './logo.svg';
import './App.css';

function handleErrors(response){
  if(!response.ok){
    throw Error(response.statusText);
  }
  return response.json();
}

class NBApi extends Component{

  constructor(props){
    super(props);
    this.state = {
      year: 2017,
      showStats: false,
      draftStats: {}
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentDidMount(){
    const apiEndpoint = 'http://localhost:5000/nba/draft/api/drafts/' + this.state.year.toString() + '/stats';
    this.callAPI(apiEndpoint);
  }
  callAPI(endpoint){
    fetch(endpoint)
    .then(handleErrors)
    .then(data => {
      this.setState({draftStats: data, showStats: true});
    })
    .catch(error => {
      this.setState({error: true});
    });
  }
  handleFormSubmit(event, state){
    event.preventDefault();

    const draftYear = state.year.toString();
    const apiEndpoint = 'http://localhost:5000/nba/draft/api/drafts/' + draftYear + '/stats';

    this.callAPI(apiEndpoint);
  }
  render(){
    return(
      <div>
        <DraftForm handleFormSubmit={this.handleFormSubmit}/>
        {this.state.showStats ? <DraftStats stats={this.state.draftStats} pick={1}/> : <div/>}
      </div>
    );
  }
}

export default NBApi;