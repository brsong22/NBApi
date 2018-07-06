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
    this.setState({year: state.year, pick: state.pick, getStats: state.getStats, display: state.display});

    const draftYear = state.year.toString();
    const draftPick = state.pick.toString();
    const getDraftStats = state.getStats;
    let apiEndpoint = 'http://localhost:5000/nba/draft/api/drafts/' + draftYear;
    apiEndpoint = draftPick !== "" ? apiEndpoint + "/" + draftPick : apiEndpoint;
    apiEndpoint = getDraftStats ? apiEndpoint + "/stats" : apiEndpoint;

    //if no pick # and dont show stats --> only show draft order and player picks
    //if no pick # and show stats      --> show draft order, player picks, and stats for team and players
    //if pick # and dont show stats    --> show team and player for pick #, no stats
    //if pick # and show stats         --> show team and player for pick # w/ stats for team and player
    fetch(apiEndpoint)
    .then(handleErrors)
    .then(data => {
      data['year'] = state.year;
      data['pick'] = state.pick;
      this.setState({draftStats: data, showStats: true});
    })
    .catch(error => {
      this.setState({error: true});
    });
  }
  render(){
    return(
      <div>
        <DraftForm handleFormSubmit={this.handleFormSubmit}/>
        {this.state.showStats ? <DraftStats stats={this.state.draftStats} display={this.state.display} getStats={this.state.getStats}/> : <div/>}
      </div>
    );
  }
}

export default NBApi;






//////////////// LOGIC TO SET STATS TABLE
// let display;
// const draftPick = this.state.pick.toString();
// const getStats = this.state.getStats;
// if(draftPick !== ""){
//   if(!getStats){
//     display = 1;
//   }
//   else{
//     display = 2;
//   }
// }
// else{
//   if(!getStats){
//     display = 3;
//   }
//   else{
//     display = 4;
//   }
// }
// let statsTable;
// if(this.state.updateTable){
//   statsTable = <DraftStats year={this.state.year} pick={this.state.pick} stats={this.state.draftStats} display={display}/>;
// }
// else{
//   statsTable = <div/>
// }



////////////////////// FORM SUBMIT LOGIC
///////////// PASS HANDLESUBMIT FUNCTION TO API FORM similar to onchange within form subcomponents
// event.preventDefault();

// const draftYear = this.state.year.toString();
// const draftPick = this.state.pick.toString();
// const getDraftStats = this.state.getStats;
// let apiEndpoint = 'http://localhost:5000/nba/draft/api/drafts/' + draftYear;
// apiEndpoint = draftPick !== "" ? apiEndpoint + "/" + draftPick : apiEndpoint;
// apiEndpoint = getDraftStats ? apiEndpoint + "/stats" : apiEndpoint;

// //if no pick # and dont show stats --> only show draft order and player picks
// //if no pick # and show stats      --> show draft order, player picks, and stats for team and players
// //if pick # and dont show stats    --> show team and player for pick #, no stats
// //if pick # and show stats         --> show team and player for pick # w/ stats for team and player
// console.log(apiEndpoint)
// fetch(apiEndpoint)
// .then(handleErrors)
// .then(data => {
//   this.setState({draftStats: data, showStats: true, error: false, updateTable: true});
// })
// .catch(error => {
//   this.setState({error: true});
// });