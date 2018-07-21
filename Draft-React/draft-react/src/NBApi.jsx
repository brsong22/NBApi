import React, { Component } from 'react';
import DraftForm from './DraftForm/DraftForm';
import TeamTweets from './TeamTweets/TeamTweets';
import DraftBoard from './DraftBoard/DraftBoard';
import { DraftStats } from './DraftStats/DraftStats';
import DraftGraph from './DraftGraph/DraftGraph';
import './App.css';

class NBApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2017,
      selectedRow: 1,
      pick: 1,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleFormSubmit(event, state) {
    event.preventDefault();
    this.setState({ year: parseInt(state.year, 10) });
  }

  handleRowClick(event, pick) {
    this.setState({ selectedRow: pick, pick });
  }

  render() {
    const {
      year, selectedRow, pick,
    } = this.state;
    return (
      <div>
        <DraftForm handleFormSubmit={this.handleFormSubmit} />
        <div>
          <TeamTweets pick={pick} year={year} />
          <div>
            <strong>
              Draft Year:&nbsp;
            </strong>
            {year}
          </div>
          <br />
        </div>
        <div id="draft-list-container">
          <DraftBoard onClick={this.handleRowClick} year={year} selectedRow={selectedRow} />
          <DraftStats year={year} pick={pick} />
        </div>
        <div>
          <br />
          <DraftGraph year={year} pick={pick} />
        </div>
      </div>
    );
  }
}

export default NBApi;
