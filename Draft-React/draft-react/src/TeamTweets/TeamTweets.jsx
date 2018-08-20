import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HandleErrors } from '../DraftStats/DraftStats';
import TeamTweet from './TeamTweet';

const nbapiEndpoint = process.env.REACT_APP_NBAPI_ENDPOINT;

const twitterDict = {
  ATL: 'ATLHawks',
  BKN: 'BrooklynNets',
  BOS: 'celtics',
  CHA: 'hornets',
  CHI: 'chicagobulls',
  CLE: 'cavs',
  DAL: 'dallasmavs',
  DEN: 'nuggets',
  DET: 'DetroitPistons',
  GSW: 'warriors',
  HOU: 'HoustonRockets',
  IND: 'Pacers',
  LAC: 'LAClippers',
  LAL: 'lakers',
  MEM: 'memgrizz',
  MIA: 'MiamiHEAT',
  MIL: 'Bucks',
  MIN: 'Timberwolves',
  NOP: 'PelicansNBA',
  NYK: 'nyknicks',
  OKC: 'okcthunder',
  ORL: 'OrlandoMagic',
  PHI: 'sixers',
  PHX: 'Suns',
  POR: 'trailblazers',
  SAC: 'SacramentoKings',
  SAS: 'spurs',
  TOR: 'Raptors',
  UTA: 'utahjazz',
  WAS: 'WashWizards',
};

class TeamTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick: 1,
      abbr: '',
      draftBoard: {},
      tweets: [],
    };
  }

  componentDidMount() {
    const { year, pick } = this.props;
    this.setState({ pick });
    const draftBoardURL = `${nbapiEndpoint}drafts/${year}`;
    this.getDraftBoard(draftBoardURL);
  }

  componentDidUpdate(prevProps) {
    const { year, pick } = this.props;
    if (prevProps.year !== year) {
      const draftBoardURL = `${nbapiEndpoint}drafts/${year}`;
      this.getDraftBoard(draftBoardURL);
    } else if (prevProps.pick !== pick) {
      this.getTeamTweets();
    }
  }

  getTeamTweets() {
    const { pick } = this.props;
    const { draftBoard } = this.state;
    this.setState({ abbr: draftBoard[pick].abbr });
    const handle = twitterDict[draftBoard[pick].abbr];
    const endpoint = `${nbapiEndpoint}tweets/${handle}`;

    fetch(endpoint)
      .then(HandleErrors)
      .then((data) => {
        const tweets = data.map(t => (
          <TeamTweet
            key={t.id_str}
            id={t.id_str}
            handle={t.user.screen_name}
            name={t.user.name}
            text={t.text}
            date={t.created_at.split(' ')}
          />
        ));
        this.setState({ tweets });
      });
  }

  getDraftBoard(endpoint) {
    fetch(endpoint)
      .then(HandleErrors)
      .then((data) => {
        const { pick } = this.props;
        this.setState({ draftBoard: data, abbr: data[pick].abbr });
        this.getTeamTweets();
      });
  }

  render() {
    const { abbr, tweets } = this.state;
    const handle = twitterDict[abbr];
    return (
      <div>
        <div>
          <strong>
            Recent Tweets by&nbsp;
            {abbr}
            (@
            {handle}
            )
          </strong>
        </div>
        <div className="tweet-container">
          {tweets}
        </div>
      </div>
    );
  }
}

TeamTweets.propTypes = {
  year: PropTypes.number.isRequired,
  pick: PropTypes.number.isRequired,
};

export default TeamTweets;
