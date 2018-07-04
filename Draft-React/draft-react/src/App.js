import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class DraftYearSelector extends Component{
  static currentYear = new Date().getFullYear();

  constructor(props){
    super(props);
    this.state = {
      year: new Date().getFullYear()-1
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(event){
    this.setState({year: event.target.value});
  }

  render(){
    const draftYears = [...Array(5).keys()].map(
      value => <option key={(value+1).toString()} value={DraftYearSelector.currentYear - (value+1)}>
        {DraftYearSelector.currentYear - (value+1)}
      </option>);
    return(
      <label>
        Select Draft Year:
        <select name="year" value={this.state.year} onChange={this.handleInputChange}>
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
    this.state = {
      pick: 1
    };
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event){
    this.setState({pick: event.target.value});
  }

  render(){
    const pickNumList = [...Array(DraftPickSelector.numPicks).keys()].map(
      value => <option key={(value+1).toString()} value={value+1}>{value+1}</option>);
    return(
      <label>
        Select Pick Number:
        <select name="pick" value={this.state.pick} onChange={this.handleInputChange}>
          {pickNumList}
        </select>
      </label>
    );
  }
}

class DraftStatsSelector extends Component{
  constructor(props){
    super(props);
    this.state = {
      getStats: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event){
    this.setState({getStats: event.target.value});
  }
  render(){
    return(
      <label>
        Show Draft Pick Stats?:
        <select name="getStats" value={this.state.getStats} onChange={this.handleInputChange}>
          <option key="0" value="false">No</option>
          <option key="1" value="true">Yes</option>
        </select>
      </label>
    );
  }
}

class NBApiForm extends Component{
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <DraftYearSelector/>
          <br/>
          <DraftPickSelector/>
          <br/>
          <DraftStatsSelector/>
          <br/>
          <input type="submit" value="Get Draft Info"/>
        </form>
      </div>
    );
  }
}

export default NBApiForm;
