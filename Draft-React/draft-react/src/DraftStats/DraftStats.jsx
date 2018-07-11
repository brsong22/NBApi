import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StatsTableHeaders from './StatsTableHeaders';
import StatsRow from './StatsRow';

function HandleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

class DraftStats extends Component {
  static statCats = ['2pa', '2pp', '3pa', '3pp', 'fta', 'ftp', 'drb', 'orb', 'ast', 'blk', 'stl', 'pts'];

  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      statRows: [],
    };
  }

  componentDidMount() {
    const endpoint = 'http://localhost:5000/nba/draft/api/drafts/';
    const suffix = '/stats';
    const delim = '/';
    const { year, pick } = this.props;
    const draftPickStats = endpoint + year + delim + pick + suffix;
    this.getPickStats(draftPickStats);
  }

  componentDidUpdate(prevProps) {
    const { year, pick } = this.props;
    const endpoint = 'http://localhost:5000/nba/draft/api/drafts/';
    const suffix = '/stats';
    const delim = '/';
    if (year !== prevProps.year || pick !== prevProps.pick) {
      const draftPickStats = endpoint + year + delim + pick + suffix;
      this.getPickStats(draftPickStats);
    }
  }

  getPickStats(endpoint) {
    fetch(endpoint)
      .then(HandleErrors)
      .then((data) => {
        const statRows = DraftStats.statCats.map(stat => (
          <StatsRow
            key={stat}
            stat={stat}
            playerStats={data.player.stats[stat]}
            teamTotals={data.team.totals[stat]}
            teamRanks={data.team.ranks[stat]}
          />
        ));
        const abbrPre = '(';
        const teamRankSuff = ') Ranks';
        const teamTotalSuff = ') Totals';
        const rankHeader = abbrPre + data.team.abbr + teamRankSuff;
        const totalHeader = abbrPre + data.team.abbr + teamTotalSuff;
        const headers = ['Stats', rankHeader, totalHeader, data.player.player];
        this.setState({ statRows, headers });
      });
  }

  render() {
    const { headers, statRows } = this.state;
    return (
      <div className="draft-container" id="draft-stats-container">
        <table className="stats-table" id="draft-stats">
          <tbody>
            <StatsTableHeaders headers={headers} />
            {statRows}
          </tbody>
        </table>
      </div>
    );
  }
}

DraftStats.propTypes = {
  year: PropTypes.number.isRequired,
  pick: PropTypes.number.isRequired,
};

export { DraftStats, StatsTableHeaders, HandleErrors };
