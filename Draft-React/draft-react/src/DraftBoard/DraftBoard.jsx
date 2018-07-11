import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickListDisplay from './PickListDisplay';
import { StatsTableHeaders, HandleErrors } from '../DraftStats/DraftStats';

class DraftBoard extends Component {
  static headers = ['Pick', 'Team', 'Player'];

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      pickList: [],
    };
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  componentDidMount() {
    const { year } = this.props;
    const endpoint = 'http://localhost:5000/nba/draft/api/drafts/';
    const draftBoardURL = endpoint + year;
    this.getDraftBoard(draftBoardURL);
  }

  componentDidUpdate(prevProps) {
    const { year, selectedRow } = this.props;
    const { data } = this.state;
    const endpoint = 'http://localhost:5000/nba/draft/api/drafts/';
    if (year !== prevProps.year) {
      const draftBoardURL = endpoint + year;
      this.getDraftBoard(draftBoardURL);
    } else if (selectedRow !== prevProps.selectedRow) {
      this.setPickList(data);
    }
  }

  getDraftBoard(endpoint) {
    fetch(endpoint)
      .then(HandleErrors)
      .then((data) => {
        this.setState({ data });
        this.setPickList(data);
      });
  }

  setPickList(data) {
    const { selectedRow } = this.props;
    const pickList = Object.keys(data).map(pick => (
      <PickListDisplay
        key={pick}
        pick={parseInt(pick, 10)}
        abbr={data[pick].abbr}
        team={data[pick].team}
        player={data[pick].player}
        onClick={this.handleRowClick}
        className={selectedRow.toString() === pick ? 'selected-row' : ''}
      />
    ));
    this.setState({ pickList });
  }

  handleRowClick(event, pick) {
    const { onClick } = this.props;
    onClick(event, pick);
  }

  render() {
    const { pickList } = this.state;
    return (
      <div className="draft-container" id="draft-board-container">
        <table className="stats-table" id="draft-board">
          <tbody>
            <StatsTableHeaders headers={DraftBoard.headers} />
            {pickList}
          </tbody>
        </table>
      </div>
    );
  }
}

DraftBoard.propTypes = {
  onClick: PropTypes.func.isRequired,
  year: PropTypes.number,
  selectedRow: PropTypes.number,
};

DraftBoard.defaultProps = {
  year: 2017,
  selectedRow: 1,
};

export default DraftBoard;
