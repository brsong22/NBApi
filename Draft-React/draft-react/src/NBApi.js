import React, { Component } from 'react';
import DraftForm from './DraftForm';
import DraftBoard from './DraftBoard';
import { DraftStats, HandleErrors } from './DraftStats';
import DraftGraph from './DraftGraph';
import logo from './logo.svg';
import './App.css';

// function handleErrors(response){
//   if(!response.ok){
//     throw Error(response.statusText);
//   }
//   return response.json();
// }

class NBApi extends Component{

  constructor(props){
    super(props);
    this.state = {
      year: 2017,
      draftBoard: {},
      selectedRow: 1,
      pick: 1,
      stats: {},
      showBoard: false,
      showStats: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }
  componentDidMount(){
    const draftBoardURL = 'http://localhost:5000/nba/draft/api/drafts/' + this.state.year;
    this.getDraftBoard(draftBoardURL);
  }
  getDraftBoard(endpoint){
    fetch(endpoint)
    .then(HandleErrors)
    .then(data => {
      this.setState({draftBoard: data, showBoard: true});
      const draftPickStats = 'http://localhost:5000/nba/draft/api/drafts/' + this.state.year + '/' + this.state.pick + '/stats';
      this.getPickStats(draftPickStats);
    })
    .catch(error => {
      this.setState({error: true});
    });
  }
  getPickStats(endpoint){
    fetch(endpoint)
    .then(HandleErrors)
    .then(data => {
      const stats = {player: data.player, team: data.team}
      this.setState({stats: stats, showStats: true});
    })
    .catch(error => {
      this.setState({error: true});
    });
  }
  handleFormSubmit(event, state){
    event.preventDefault();
    this.setState({year: state.year});
    const draftYear = state.year.toString();
    const apiEndpoint = 'http://localhost:5000/nba/draft/api/drafts/' + draftYear;

    this.getDraftBoard(apiEndpoint);
  }
  handleRowClick(event, pick){
    this.setState({selectedRow: pick, pick: pick});
    const pickStats = 'http://localhost:5000/nba/draft/api/drafts/' + this.state.year + '/' + pick + '/stats';
    this.getPickStats(pickStats);
  }
  render(){
    return(
      <div>
        <DraftForm handleFormSubmit={this.handleFormSubmit}/>
        <div>
          <br/><br/>
          <div><strong>Draft Year</strong>: {this.state.year}</div>
          <br/>
        </div>
        <div id="draft-list-container">
          {this.state.showBoard
            ? <DraftBoard draftBoard={this.state.draftBoard} onClick={this.handleRowClick} year={this.state.year} selectedRow={this.state.selectedRow}/>
            : <div/>
          }
          {this.state.showStats
            ? <DraftStats stats={this.state.stats} year={this.props.year} pick={this.state.pick}/> 
            : <div/>
          }
        </div>
        <div>
          <DraftGraph />
        </div>
      </div>
    );
  }
}

export default NBApi;