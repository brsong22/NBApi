import React, { Component } from 'react';

class PlayerDisplay extends Component{
	render(){
		return(
			<div>
				<strong>Player</strong>: {this.props.player}
			</div>
		);
	}
}

class TeamDisplay extends Component{
	render(){
		return(
			<div>
				<strong>Team</strong>: ({this.props.abbr}) {this.props.team}
			</div>
		);
	}
}

class StatsTable extends Component{
	render(){
		const statsHeaders = Object.keys(this.props.playerStats).map((statName, index) => <th key={index}>{statName}</th>);
		const playerName = [<td key="0">{this.props.player}</td>];
		const playerStatsArray = Object.values(this.props.playerStats).map((statVal, index) => <td key={index+1}>{statVal}</td>);
		playerName.push(...playerStatsArray);
		const playerStats = statsHeaders.length > 0 ? playerName : [];
		const teamAbbr = [<td key="0">{this.props.team}</td>];
		const teamStatsArray = Object.values(this.props.teamStats).map((statVal, index) => <td key={index+1}>{statVal}</td>);
		teamAbbr.push(...teamStatsArray);
		const teamStats = statsHeaders.length > 0 ? teamAbbr : [];
		return( 
			<div>
				<table>
					<tbody>
						<tr>
							<th>&nbsp;</th>
							{statsHeaders}
						</tr>
						<tr>
							{playerStats}
						</tr>
						<tr>
							{teamStats}
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

class StatsDisplay extends Component{
	render(){
		const display = this.props.display;
		let player;
		let team;
		let teamAbbr;
		let playerStats;
		let teamStats;
		if(display === 1){
			player = this.props.stats['player'];
			team =this.props.stats['team'];
			teamAbbr = this.props.stats['abbr'];
			playerStats = {};
			teamStats = {};
		}
		else if(display === 2){
			player = this.props.stats['player']['player'];
			team = this.props.stats['team']['team'];
			teamAbbr = this.props.stats['team']['abbr'];
			playerStats = this.props.stats['player']['stats'];
			teamStats = this.props.stats['team']['totals'];
		}
		return(
			<div>
				<div><PlayerDisplay player={player}/></div>
				<div><TeamDisplay abbr={teamAbbr} team={team}/></div>
				<br/>
				<div>
					<StatsTable player={player} playerStats={playerStats} team={teamAbbr} teamStats={teamStats}/>
				</div>
			</div>
		);
	}
}

class DraftStats extends Component{
	render(){
		return(
			<div>
				<div>
					<br/><br/>
					<strong>Draft Year</strong>: {this.props.stats.year}
					<br/>
					<strong>Pick No.</strong>: {this.props.stats.pick}
					<br/><br/>
				</div>
				<StatsDisplay display={this.props.stats.display} stats={this.props.stats}/>
			</div>
		);
	}
}

export default DraftStats;