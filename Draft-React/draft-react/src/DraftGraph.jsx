import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import CustomTooltip from './CustomTooltip';
import { HandleErrors } from './DraftStats/DraftStats';

const teamColorCodes = {
  ATL: '#e03a3e',
  BKN: '#000000',
  BOS: '#007a33',
  CHA: '#1d1160',
  CHI: '#ce1141',
  CLE: '#6f263d',
  DAL: '#00538c',
  DEN: '#00285e',
  DET: '#ed174c',
  GSW: '#006bb6',
  HOU: '#ce1141',
  IND: '#002d62',
  LAC: '#ed174c',
  LAL: '#552583',
  MEM: '#6189b9',
  MIA: '#98002e',
  MIL: '#00471b',
  MIN: '#0c2340',
  NOP: '#002b5c',
  NYK: '#006bb6',
  OKC: '#007ac1',
  ORL: '#0057b8',
  PHI: '#006bb6',
  PHX: '#1d1160',
  POR: '#e03a3e',
  SAC: '#5a2d81',
  SAS: '#000000',
  TOR: '#ce1141',
  UTA: '#002b5c',
  WAS: '#002b5c',
};

class DraftGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: {},
      teamData: {},
      playersAvg: {},
      teamsAvg: {},
      playerName: '',
      teamAbbr: '',
      playerBar: [],
      teamBar: [],
    };
  }

  componentDidMount() {
    const endpoint = 'http://localhost:5000/nba/draft/api/drafts/';
    const statsSuffix = '/stats';
    const avgsSuffix = '/avgs';
    const delim = '/';
    const { year, pick } = this.props;
    const draftPickStats = endpoint + year + delim + pick + statsSuffix;
    const draftPickAvgs = endpoint + year + avgsSuffix;
    Promise.all([DraftGraph.getPickStats(draftPickStats), DraftGraph.getPickAvgs(draftPickAvgs)])
      .then(([stats, avgs]) => {
        this.setState({
          playerData: stats.playerData,
          playerName: stats.playerName,
          teamData: stats.teamData,
          teamAbbr: stats.teamAbbr,
          playersAvg: avgs.playersAvg,
          teamsAvg: avgs.teamsAvg,
        });
        this.createBarData();
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { year, pick } = this.props;
    const { playerName } = this.state;
    const endpoint = 'http://localhost:5000/nba/draft/api/drafts/';
    const statsSuffix = '/stats';
    const avgsSuffix = '/avgs';
    const delim = '/';
    if (year !== prevProps.year) {
      const draftPickStats = endpoint + year + delim + pick + statsSuffix;
      const draftPickAvgs = endpoint + year + avgsSuffix;
      Promise.all([DraftGraph.getPickStats(draftPickStats), DraftGraph.getPickAvgs(draftPickAvgs)])
        .then(([stats, avgs]) => {
          this.setState({
            playerData: stats.playerData,
            playerName: stats.playerName,
            teamData: stats.teamData,
            teamAbbr: stats.teamAbbr,
            playersAvg: avgs.playersAvg,
            teamsAvg: avgs.teamsAvg,
          });
          this.createBarData();
        });
    } else if (pick !== prevProps.pick) {
      const draftPickStats = endpoint + year + delim + pick + statsSuffix;
      Promise.all([DraftGraph.getPickStats(draftPickStats)])
        .then(([stats]) => {
          this.setState({
            playerData: stats.playerData,
            playerName: stats.playerName,
            teamData: stats.teamData,
            teamAbbr: stats.teamAbbr,
          });
          this.createBarData();
        });
    } else if (playerName !== prevState.playerName) {
      this.createBarData();
    }
  }

  static getPickStats(endpoint) {
    return fetch(endpoint)
      .then(HandleErrors)
      .then((data) => {
        const playerName = data.player.player;
        const teamAbbr = data.team.abbr;
        const playerStats = data.player.stats;
        const teamStats = data.team.totals;
        const stats = {
          playerData: playerStats,
          teamData: teamStats,
          playerName,
          teamAbbr,
        };
        return stats;
      });
  }

  static getPickAvgs(endpoint) {
    return fetch(endpoint)
      .then(HandleErrors)
      .then((data) => {
        const playersAvg = data.players;
        const teamsAvg = data.teams;
        const stats = {
          playersAvg,
          teamsAvg,
        };
        return stats;
      });
  }

  createBarData() {
    const {
      playerData,
      playerName,
      playersAvg,
      teamData,
      teamAbbr,
      teamsAvg,
    } = this.state;
    const playerBar = Object.keys(playerData).map(stat => (
      {
        stat,
        [playerName]: parseFloat(playerData[stat]),
        'Draft Prospect Avgs': parseFloat(playersAvg[stat]),
      }
    ));

    const teamBar = Object.keys(teamData).map(stat => (
      {
        stat,
        [teamAbbr]: parseFloat(teamData[stat]),
        'League Team Avgs': parseFloat(teamsAvg[stat]),
      }
    ));
    this.setState({ playerBar, teamBar });
  }

  render() {
    const {
      playerBar,
      playerName,
      teamBar,
      teamAbbr,
    } = this.state;
    return (
      <div>
        <p>
          <strong>
            Prospect vs. All Prospects Per Game Averages
          </strong>
        </p>
        <BarChart
          width={900}
          height={500}
          data={playerBar}
          margin={
            {
              top: 5, right: 30, left: 20, bottom: 5,
            }
          }
        >
          <CartesianGrid strokeDasharray="5 5" />
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis type="category" dataKey="stat" />
          <YAxis type="number" />
          <Tooltip content={<CustomTooltip />} />
          <legend />
          <Bar dataKey={playerName} fill="#d13030" barSize={20} />
          <Bar dataKey="Draft Prospect Avgs" fill="#fa9693" barSize={20} />
        </BarChart>
        <br />
        <p>
          <strong>
            Team vs. All Teams (in draft) Per Game Averages
          </strong>
        </p>
        <BarChart
          width={900}
          height={500}
          data={teamBar}
          margin={
            {
              top: 5, right: 30, left: 20, bottom: 5,
            }
          }
        >
          <CartesianGrid strokeDasharray="5 5" />
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis type="category" dataKey="stat" />
          <YAxis type="number" />
          <Tooltip content={<CustomTooltip />} />
          <legend />
          <Bar dataKey={teamAbbr} fill={teamColorCodes[teamAbbr]} barSize={20} />
          <Bar dataKey="League Team Avgs" fill="#9e9c9b" barSize={20} />
        </BarChart>
      </div>
    );
  }
}

DraftGraph.propTypes = {
  year: PropTypes.number.isRequired,
  pick: PropTypes.number.isRequired,
};

export default DraftGraph;
