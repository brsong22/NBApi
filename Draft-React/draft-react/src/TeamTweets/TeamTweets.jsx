import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HandleErrors } from '../DraftStats/DraftStats';

const nbapiEndpoint = process.env.REACT_APP_NBAPI_ENDPOINT;
const twitterEndpoint = process.env.REACT_APP_TWITTER_TIMELINE_ENDPOINT;
const twitterAccessToken = process.env.REACT_APP_TWITTER_ACCESS_TOKEN;
const twitterTokenSecret = process.env.REACT_APP_TWITTER_TOKEN_SECRET;
const twitterConsumerKey = process.env.REACT_APP_TWITTER_CONSUMER_KEY;
const twitterConsumerSecret = process.env.REACT_APP_TWITTER_CONSUMER_SECRET;
const timestamp = require('nonce')();
const nonce = require('uuid/v4');

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
    };
  }

  componentDidMount() {
    const { year, pick } = this.props;
    this.setState({ pick });
    const draftBoardURL = nbapiEndpoint + year;
    this.getDraftBoard(draftBoardURL);
  }

  componentDidUpdate(prevProps) {
    const { year, pick } = this.props;
    if (prevProps.year !== year) {
      const draftBoardURL = nbapiEndpoint + year;
      this.getDraftBoard(draftBoardURL);
    } else if (prevProps.pick !== pick) {
      this.getTeamTweets();
    }
  }

  getTeamTweets() {
    const twitterParams = '?screen_name=';
    const { pick } = this.props;
    const { draftBoard } = this.state;
    const handle = twitterDict[draftBoard[pick].abbr];
    const endpoint = twitterEndpoint + twitterParams + handle;
    let httpHeaders = new Headers();
    httpHeaders.append('Authorization:');
    httpHeaders.append('oauth_consumer_key', twitterConsumerKey);
    httpHeaders.append('oauth_nonce', nonce());
    httpHeaders.append('oauth_timestamp', timestamp());
    httpHeaders.append('oauth_signature_method', 'HMAC-SHA1');
    httpHeaders.append('oauth_access_token', twitterAccessToken);
    httpHeaders.append('oauth_version', '1.0');
    httpHeaders.append('Host', 'api.twitter.com');

    const httpsParams = {
      oauth_consumer_key: twitterConsumerKey,
      oauth_nonce: nonce(),
      oauth_timestamp: timestamp(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_access_token: twitterAccessToken,
      oauth_version: '1.0',
      Host: 'api.twitter.com',
    };
    const oauth_access_secret = twitterTokenSecret;
    const consumer_secret = twitterConsumerSecret;
    const oauthSign = oauthSignature.generate('GET', endpoint, httpsParams, oauth_access_secret, consumer_secret);
    httpHeaders.append('oauth_signature', oauthSign);
    const httpVars = { method: 'GET', headers: httpHeaders, mode: 'cors' };
    const request = new Request(endpoint, httpVars);
    this.setState({ pick, abbr: draftBoard[pick].abbr });
    fetch(request)
      .then(HandleErrors)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDraftBoard(endpoint) {
    fetch(endpoint)
      .then(HandleErrors)
      .then((data) => {
        const { pick } = this.state;
        this.setState({ draftBoard: data, abbr: data[pick].abbr });
      });
  }

  render() {
    const { abbr } = this.state;
    const handle = twitterDict[abbr];
    return (
      <div>
        {abbr}
        &nbsp;@
        {handle}
      </div>
    );
  }
}

TeamTweets.propTypes = {
  year: PropTypes.number.isRequired,
  pick: PropTypes.number.isRequired,
};

export default TeamTweets;
