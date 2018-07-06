import React, { Component } from 'react';

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
          <option key="-1" value="" onChange={this.handleInputChange}>&nbsp;</option>
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

class DraftForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      year: 2017,
      pick: 1,
      getStats: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleInputChange(event){
    const name = event.target.name;
    let value = event.target.value;
    value = (name === 'getStats') ? (value === 'true') : value; //boolean value becomes string; cast to boolean
    this.setState({[name]: value});
  }
  handleFormSubmit(event){
    let display;
    const draftPick = this.state.pick.toString();
    const getStats = this.state.getStats;
    if(draftPick !== ""){
      if(!getStats){
        display = 1;
      }
      else{
        display = 2;
      }
    }
    else{
      if(!getStats){
        display = 3;
      }
      else{
        display = 4;
      }
    }
    let state = this.state;
    state['display'] = display;
    this.props.handleFormSubmit(event, state);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <DraftYearSelector year={this.state.year} onChange={this.handleInputChange}/>
          <br/>
          <DraftPickSelector pick={this.state.pick} onChange={this.handleInputChange}/>
          <br/>
          <DraftStatsSelector getStats={this.state.getStats} onChange={this.handleInputChange}/>
          <br/>
          <input type="submit" value="Get Draft Info"/>
        </form>
      </div>
    );
  }
}
export default DraftForm;