import React, { Component } from 'react';

class DraftYearSelector extends Component{
  static currentYear = 2017;

  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(event){
    this.props.onChange(event);
  }

  render(){
    const draftYears = [...Array(5).keys()].map(
      value => <option key={(value+1).toString()} value={DraftYearSelector.currentYear - value}>
        {DraftYearSelector.currentYear - value}
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

class DraftForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      year: 2017
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleInputChange(event){
    const name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }
  handleFormSubmit(event){
    this.props.handleFormSubmit(event, this.state);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <DraftYearSelector year={this.state.year} onChange={this.handleInputChange}/>
          <br/>
          <input type="submit" value="Get Draft Info"/>
        </form>
      </div>
    );
  }
}
export default DraftForm;