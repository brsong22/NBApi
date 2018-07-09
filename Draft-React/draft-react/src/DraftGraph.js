import React, {Component} from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { HandleErrors } from './DraftStats';

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
			barData: [],
			playerName: "",
			teamAbbr: ""
		}
	}
	componentDidMount(){
		const draftPickStats = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year + '/' + this.props.pick + '/stats';
		this.getPickStats(draftPickStats);
	}
	componentDidUpdate(prevProps){
		if(this.props.pick !== prevProps.pick || this.props.year !== prevProps.year){
			const draftPickStats = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year + '/' + this.props.pick + '/stats';
			this.getPickStats(draftPickStats);
		}
	}
	getPickStats(endpoint){
	  fetch(endpoint)
	  .then(HandleErrors)
	  .then(data => {
	  	const playerName = data.player.player;
	  	const teamAbbr = data.team.abbr;
	  	const playerStats = data.player.stats;
	  	const teamStats = data.team.totals;
	    const barData = Object.keys(playerStats).map(stat => { return { stat: stat, [playerName]: parseFloat(playerStats[stat]), [teamAbbr]: parseFloat(teamStats[stat])}});
	  	this.setState({barData: barData, playerName: playerName, teamAbbr: teamAbbr});
	  })
	  .catch(error => {
	    this.setState({error: true});
	  });
	}
	render(){
		return(
			<BarChart width={900} height={500} data={this.state.barData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<CartesianGrid strokeDasharray="5 5" />
				<CartesianGrid strokeDasharray="5 5" />
				<XAxis type="category" dataKey="stat"/>
				<YAxis type="number" />
				<Tooltip content={<CustomTooltip/>}/>
				<legend />
				<Bar dataKey={this.state.playerName} fill="#8884d8" barSize={20}/>
				<Bar dataKey={this.state.teamAbbr} fill="#82ca9d" barSize={20} />
			</BarChart>
		);
	}
}

export default DraftGraph;


// const statsHeaders = Object.keys(this.props.stats.players[1].stats);
// 	const playerName = this.props.stats.players[this.state.pick].player;
// 	const playerStats = this.props.stats.players[this.state.pick].stats;
// 	const teamAbbr = this.props.stats.order[this.state.pick].abbr;
// 	const teamStats = this.props.stats.teams[teamAbbr].totals;
// 	const barData = Object.keys(playerStats).map(stat => { return {stat, [playerName]: parseFloat(playerStats[stat]), [teamAbbr]: parseFloat(teamStats[stat])}});
// <BarChart width={900} height={500} data={barData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
// 	<CartesianGrid strokeDasharray="5 5" />
// 	<XAxis type="category" dataKey="stat"/>
// 	<YAxis type="number" />
// 	<Tooltip />
// 	<legend />
// 	<Bar dataKey={playerName} fill="#8884d8" barSize={20} isAnimationActive={true}/>
// 	<Bar dataKey={teamAbbr} fill="#82ca9d" barSize={20} />
// </BarChart>