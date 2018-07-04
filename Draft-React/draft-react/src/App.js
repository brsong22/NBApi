import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class DraftYearSelector extends Component{
  static currentYear = new Date().getFullYear();

  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(event){
    this.props.onChange(event);
  }

  render(){
    const draftYears = [...Array(5).keys()].map(
      value => <option key={(value+1).toString()} value={DraftYearSelector.currentYear - (value+1)}>
        {DraftYearSelector.currentYear - (value+1)}
      </option>);
    return(
      <label>
        Select Draft Year:
        <select name="year" value={this.props.year} onChange={this.handleInputChange}>
          {draftYears}
        </select>
      </label>
    );
  }
}

class DraftPickSelector extends Component{
  static numPicks = 30;

  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event){
    this.props.onChange(event);
  }

  render(){
    const pickNumList = [...Array(DraftPickSelector.numPicks).keys()].map(
      value => <option key={(value+1).toString()} value={value+1}>{value+1}</option>);
    return(
      <label>
        Select Pick Number:
        <select name="pick" value={this.props.pick} onChange={this.handleInputChange}>
          <option key="-1" value="" onChange={this.handleInputChange}>    </option>
          {pickNumList}
        </select>
      </label>
    );
  }
}

class DraftStatsSelector extends Component{
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event){
    this.props.onChange(event);
  }
  render(){
    return(
      <label>
        Show Draft Pick Stats?:
        <select name="getStats" value={this.props.getStats} onChange={this.handleInputChange}>
          <option key="0" value="false">No</option>
          <option key="1" value="true">Yes</option>
        </select>
      </label>
    );
  }
}

class NBApiForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      year: 2017,
      pick: 1,
      getStats: false,
      draftStats: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event){
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event){
    event.preventDefault();
    console.log(this.state.year);
    console.log(this.state.pick);
    console.log(this.state.getStats);
    const baseURL = 'http://localhost:5000/nba/draft/api/drafts/';
    const draftYear = this.state.year.toString();
    const draftPick = this.state.pick.toString();
    const getDraftStats = this.state.getStats;
    //if no pick # and dont show stats --> only show draft order and player picks
    //if no pick # and show stats      --> show draft order, player picks, and stats for team and players
    //if pick # and dont show stats    --> show team and player for pick #, no stats
    //if pick # and show stats         --> show team and player for pick # w/ stats for team and player
    fetch('http://localhost:5000/nba/draft/api/drafts/'+this.state.year.toString()+'/'+this.state.pick.toString())
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState(this.state.draftStats = data);
    });
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <DraftYearSelector year={this.state.year} onChange={this.handleInputChange}/>
          <br/>
          <DraftPickSelector pick={this.state.pick} onChange={this.handleInputChange}/>
          <br/>
          <DraftStatsSelector getStats={this.state.getStats} onChange={this.handleInputChange}/>
          <br/>
          <input type="submit" value="Get Draft Info"/>
        </form>
        <div>
          {JSON.stringify(this.state.draftStats)}
        </div>
      </div>
    );
  }
}

export default NBApiForm;
