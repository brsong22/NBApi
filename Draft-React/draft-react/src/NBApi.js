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
      showStats: false,
      draftStats: {}
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(event, state){
    event.preventDefault();

    const draftYear = state.year.toString();
    const apiEndpoint = 'http://localhost:5000/nba/draft/api/drafts/' + draftYear + "/stats";

    //if no pick # and dont show stats --> only show draft order and player picks
    //if no pick # and show stats      --> show draft order, player picks, and stats for team and players
    //if pick # and dont show stats    --> show team and player for pick #, no stats
    //if pick # and show stats         --> show team and player for pick # w/ stats for team and player
    fetch(apiEndpoint)
    .then(handleErrors)
    .then(data => {
      console.log('here');
      data['year'] = state.year;
      data['pick'] = state.pick;
      this.setState({draftStats: data, showStats: true});
    })
    .catch(error => {
      this.setState({error: true});
    });
  }
  render(){
    console.log('render');
    return(
      <div>
        <DraftForm handleFormSubmit={this.handleFormSubmit}/>
        {this.state.showStats ? <DraftStats stats={this.state.draftStats}/> : <div/>}
      </div>
    );
  }
}

export default NBApi;