import React, { Component } from 'react';
import DraftForm from './DraftForm';
import DraftBoard from './DraftBoard';
import { DraftStats } from './DraftStats';
import DraftGraph from './DraftGraph';
import logo from './logo.svg';
import './App.css';

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
  handleFormSubmit(event, state){
    event.preventDefault();
    this.setState({year: state.year});
  }
  handleRowClick(event, pick){
    this.setState({selectedRow: pick, pick: pick});
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
          <DraftBoard onClick={this.handleRowClick} year={this.state.year} selectedRow={this.state.selectedRow}/>
          <DraftStats year={this.state.year} pick={this.state.pick}/>
        </div>
        <div>
          <DraftGraph year={this.state.year} pick={this.state.pick}/>
        </div>
      </div>
    );
  }
}

export default NBApi;