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
  ATL: { primary: '#e03a3e', secondary: '#26282a' },
  BKN: { primary: '#000000', secondary: '#000000' },
  BOS: { primary: '#007a33', secondary: '#ba9653' },
  CHA: { primary: '#1d1160', secondary: '#00788c' },
  CHI: { primary: '#ce1141', secondary: '#000000' },
  CLE: { primary: '#6f263d', secondary: '#ffb81c' },
  DAL: { primary: '#00538c', secondary: '#002b5e' },
  DEN: { primary: '#00285e', secondary: '#fec524' },
  DET: { primary: '#ed174c', secondary: '#006bb6' },
  GSW: { primary: '#006bb6', secondary: '#fdb927' },
  HOU: { primary: '#ce1141', secondary: '#000000' },
  IND: { primary: '#002d62', secondary: '#fdbb30' },
  LAC: { primary: '#ed174c', secondary: '#006bb6' },
  LAL: { primary: '#552583', secondary: '#fdb927' },
  MEM: { primary: '#6189b9', secondary: '#00285e' },
  MIA: { primary: '#98002e', secondary: '#f9a01b' },
  MIL: { primary: '#00471b', secondary: '#eee1c6' },
  MIN: { primary: '#236192', secondary: '#78BE20' },
  NOP: { primary: '#002b5c', secondary: '#85714d' },
  NYK: { primary: '#006bb6', secondary: '#f58426' },
  OKC: { primary: '#007ac1', secondary: '#ef3b24' },
  ORL: { primary: '#0057b8', secondary: '#000000' },
  PHI: { primary: '#006bb6', secondary: '#ed174c' },
  PHX: { primary: '#1d1160', secondary: '#e56020' },
  POR: { primary: '#e03a3e', secondary: '#000000' },
  SAC: { primary: '#5a2d81', secondary: '#000000' },
  SAS: { primary: '#000000', secondary: '#000000' },
  TOR: { primary: '#ce1141', secondary: '#000000' },
  UTA: { primary: '#002b5c', secondary: '#00471b' },
  WAS: { primary: '#002b5c', secondary: '#e31837' },
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
    const playerFill = teamAbbr === '' ? '#000000' : teamColorCodes[teamAbbr].secondary;
    const teamFill = teamAbbr === '' ? '#000000' : teamColorCodes[teamAbbr].primary;

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
          <Bar dataKey={playerName} fill={playerFill} barSize={20} />
          <Bar dataKey="Draft Prospect Avgs" fill="#9e9c9b" barSize={20} />
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
          <Bar dataKey={teamAbbr} fill={teamFill} barSize={20} />
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
