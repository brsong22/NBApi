import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class NBApi extends Component{
  constructor(props){
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      pick: 0,
      getStats: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    const year = this.state.year;
    const pick = this.state.pick;
    const getStats = this.state.getStats;

    const pickNumOptions = [...Array(30).keys()].map(value => <option value={value+1}>{value+1}</option>);
    return(
      <div>
        <label>
          Select Draft Year:
          <select name="year" value={this.state.year} onChange={this.handleInputChange}>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
          </select>
        </label>
        <br/>
        <label>
          Select Draft Pick:
          <select name="pick" value={this.state.pick} onChange={this.handleInputChange}>
            {pickNumOptions}
          </select>
        </label>
        <br/>
        <label>
          Show Draft Pick Stats?:
          <select name="getStats" value={this.state.getStats} onChange={this.handleInputChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
      </div>
    );
  }
}

export default NBApi;

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//           <br/>hello
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
