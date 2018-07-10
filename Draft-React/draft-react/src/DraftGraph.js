import React, {Component} from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { HandleErrors } from './DraftStats';

// const teamColorCodes = {"ATL": {"prime": "#e03a3e", "comp": "#3de03a"},
// 												"BKN": {"prime": "#000000", "comp": "#000000"},
// 												"BOS": {"prime": "#007a33", "comp": "#7a0c00"},
// 												"CHA": {"prime": "#1d1160", "comp": "#603f11"},
// 												"CHI": {"prime": "#ce1141", "comp": "#40c311"},
// 												"CLE": {"prime": "#6f263d", "comp": "#3d6f26"},
// 												"DAL": {"prime": "#00538c", "comp": "#8c3100"},
// 												"DEN": {"prime": "#00285e", "comp": "#5e2600"},
// 												"DET": {"prime": "#ed174c", "comp": "#4ded17"},
// 												"GSW": {"prime": "#006bb6", "comp": "#b64000"},
// 												"HOU": {"prime": "#ce1141", "comp": "#40ce11"},
// 												"IND": {"prime": "#002d62", "comp": "#622600"},
// 												"LAC": {"prime": "#ed174c", "comp": "#4ded17"},
// 												"LAL": {"prime": "#552583", "comp": "#836b25"},
// 												"MEM": {"prime": "#6189b9", "comp": "#b98361"},
// 												"MIA": {"prime": "#98002e", "comp": "#2e9800"},
// 												"MIL": {"prime": "#00471b", "comp": "#470700"},
// 												"MIN": {"prime": "#0c2340", "comp": "#40200c"},
// 												"NOP": {"prime": "#002b5c", "comp": "#5c2300"},
// 												"NYK": {"prime": "#006bb6", "comp": "#b64000"},
// 												"OKC": {"prime": "#007ac1", "comp": "#c14400"},
// 												"ORL": {"prime": "#0057b8", "comp": "#b84700"},
// 												"PHI": {"prime": "#006bb6", "comp": "#b64000"},
// 												"PHX": {"prime": "#1d1160", "comp": "#603f11"},
// 												"POR": {"prime": "#e03a3e", "comp": "#3de03a"},
// 												"SAC": {"prime": "#5a2d81", "comp": "#816d2d"},
// 												"SAS": {"prime": "#000000", "comp": "#000000"},
// 												"TOR": {"prime": "#ce1141", "comp": "#40ce11"},
// 												"UTA": {"prime": "#002b5c", "comp": "#5c2300"},
// 												"WAS": {"prime": "#002b5c"} "comp": "#5c2300"}}
const teamColorCodes = {"ATL": "#e03a3e",
												"BKN": "#000000",
												"BOS": "#007a33",
												"CHA": "#1d1160",
												"CHI": "#ce1141",
												"CLE": "#6f263d",
												"DAL": "#00538c",
												"DEN": "#00285e",
												"DET": "#ed174c",
												"GSW": "#006bb6",
												"HOU": "#ce1141",
												"IND": "#002d62",
												"LAC": "#ed174c",
												"LAL": "#552583",
												"MEM": "#6189b9",
												"MIA": "#98002e",
												"MIL": "#00471b",
												"MIN": "#0c2340",
												"NOP": "#002b5c",
												"NYK": "#006bb6",
												"OKC": "#007ac1",
												"ORL": "#0057b8",
												"PHI": "#006bb6",
												"PHX": "#1d1160",
												"POR": "#e03a3e",
												"SAC": "#5a2d81",
												"SAS": "#000000",
												"TOR": "#ce1141",
												"UTA": "#002b5c",
												"WAS": "#002b5c"}

class CustomTooltip extends Component{
	static statsDict = {"2pa": "2-point attempts",
											"2pp": "2-point percentage",
											"3pa": "3-point attempts",
											"3pp": "3-point percentage",
											"fta": "freethrow attemps",
											"ftp": "freethrow percentage",
											"drb": "defensive rebounds",
											"orb": "offensive rebounds",
											"ast": "assists",
											"blk": "blocks",
											"stl": "steals",
											"pts": "points"};
	render(){
		const { active } = this.props;
		if(active){
			const playerStyle = {
				color: this.props.payload[0].fill
			}
			const teamStyle = {
				color: this.props.payload[1].fill
			}
			const playerName = this.props.payload[0].name;
			const playerVal = this.props.payload[0].value;
			const teamName = this.props.payload[1].name;
			const teamVal = this.props.payload[1].value;
			return(
				<div className="custom-tooltip">
					<p><strong>{CustomTooltip.statsDict[this.props.label]}</strong></p>
					<p style={playerStyle}>{playerName}: {playerVal}</p>
					<p style={teamStyle}>{teamName}: {teamVal}</p>
				</div>
			);
		}
		return null;
	}
}

class DraftGraph extends Component{
	constructor(props){
		super(props);
		this.state = {
			playerData: {},
			teamData: {},
			playersAvg: {},
			teamsAvg: {},
			playerName: "",
			teamAbbr: "",
			playerBar: [],
			teamBar: []
		}
	}
	componentDidMount(){
		const draftPickStats = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year + '/' + this.props.pick + '/stats';
		const draftPickAvgs = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year + '/avgs';
		Promise.all([this.getPickStats(draftPickStats),	this.getPickAvgs(draftPickAvgs)])
		.then(([stats, avgs]) => {
			this.setState({playerData: stats.playerData, playerName: stats.playerName, teamData: stats.teamData, teamAbbr: stats.teamAbbr,
				playersAvg: avgs.playersAvg, teamsAvg: avgs.teamsAvg});
			this.createBarData();
		});
	}
	componentDidUpdate(prevProps, prevState){
		if(this.props.year !== prevProps.year){
			console.log('new year')
			const draftPickStats = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year + '/' + this.props.pick + '/stats';
			const draftPickAvgs = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year + '/avgs';
			Promise.all([this.getPickStats(draftPickStats), this.getPickAvgs(draftPickAvgs)])
			.then(([stats, avgs]) => {
				this.setState({playerData: stats.playerData, playerName: stats.playerName, teamData: stats.teamData, teamAbbr: stats.teamAbbr,
					playersAvg: avgs.playersAvg, teamsAvg: avgs.teamsAvg});
				this.createBarData();
			});
		}
		else if(this.props.pick !== prevProps.pick){
			console.log('new pick');
			const draftPickStats = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year + '/' + this.props.pick + '/stats';
			Promise.all([this.getPickStats(draftPickStats)])
			.then(([stats]) => {
				this.setState({playerData: stats.playerData, playerName: stats.playerName, 
					teamData: stats.teamData, teamAbbr: stats.teamAbbr});
				this.createBarData();
			});
		}
		else if(this.state.playerName !== prevState.playerName){
			this.createBarData();
		}
	}
	getPickStats(endpoint){
	  return fetch(endpoint)
	  .then(HandleErrors)
	  .then(data => {
	  	const playerName = data.player.player;
	  	const teamAbbr = data.team.abbr;
	  	const playerStats = data.player.stats;
	  	const teamStats = data.team.totals;
	  	const stats = {playerData: playerStats, teamData: teamStats, playerName: playerName, teamAbbr: teamAbbr};
	  	return stats;	  	
	  })
	  .catch(error => {
	    this.setState({error: true});
	  });
	}
  getPickAvgs(endpoint){
    return fetch(endpoint)
    .then(HandleErrors)
    .then(data => {
    	const playersAvg = data.players;
    	const teamsAvg = data.teams;
    	const stats = {playersAvg: playersAvg, teamsAvg: teamsAvg};
    	return stats;
    })
    .catch(error => {
      this.setState({error: true});
    });
	}
	createBarData(){
	  const playerBar = Object.keys(this.state.playerData).map(stat => { 
	  	return { stat: stat, [this.state.playerName]: parseFloat(this.state.playerData[stat]), 
	  		'Draft Prospect Avgs': parseFloat(this.state.playersAvg[stat])}});

		const teamBar = Object.keys(this.state.teamData).map(stat => { 
			return { stat: stat, [this.state.teamAbbr]: parseFloat(this.state.teamData[stat]), 
				'League Team Avgs': parseFloat(this.state.teamsAvg[stat])}});
		this.setState({playerBar: playerBar, teamBar: teamBar});
	}
	render(){
		return(
			<div>
				<BarChart width={900} height={500} data={this.state.playerBar} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					<CartesianGrid strokeDasharray="5 5" />
					<CartesianGrid strokeDasharray="5 5" />
					<XAxis type="category" dataKey="stat"/>
					<YAxis type="number" />
					<Tooltip content={<CustomTooltip/>}/>
					<legend />
					<Bar dataKey={this.state.playerName} fill="#d13030" barSize={20}/>
					<Bar dataKey='Draft Prospect Avgs' fill="#fa9693" barSize={20} />
				</BarChart>
				<br/>
				<BarChart width={900} height={500} data={this.state.teamBar} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					<CartesianGrid strokeDasharray="5 5" />
					<CartesianGrid strokeDasharray="5 5" />
					<XAxis type="category" dataKey="stat"/>
					<YAxis type="number" />
					<Tooltip content={<CustomTooltip/>}/>
					<legend />
					<Bar dataKey={this.state.teamAbbr} fill={teamColorCodes[this.state.teamAbbr]} barSize={20}/>
					<Bar dataKey='League Team Avgs' fill="#9e9c9b" barSize={20} />
				</BarChart>
			</div>
		);
	}
}

export default DraftGraph;