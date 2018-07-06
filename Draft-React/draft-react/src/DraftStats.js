import React, { Component } from 'react';

class StatsTableHeaders extends Component{
	render(){
		const tableHeader = this.props.headers.map(header => <th key={header}>{header}</th>);
		return(
			<tr>
				{tableHeader}
			</tr>
		)
	}
}
class PlayerDisplay extends Component{
	render(){
		return(
			<tr>
				<strong>Player</strong>: {this.props.player}
			</tr>
		);
	}
}

class TeamDisplay extends Component{
	render(){
		return(
			<tr>
				<strong>Team</strong>: {this.props.abbr} {this.props.team}
			</tr>
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
		let statsTable;
		console.log(this.props.stats);
		if(display === 1){
			player = this.props.stats['player'];
			team =this.props.stats['team'];
			teamAbbr = this.props.stats['abbr'];
			playerStats = {};
			teamStats = {};
			// statsTable = <StatsTable player={player} playerStats={playerStats} team={teamAbbr} teamStats={teamStats}/>;
		}
		else if(display === 2){
			player = this.props.stats['player']['player'];
			team = this.props.stats['team']['team'];
			teamAbbr = this.props.stats['team']['abbr'];
			playerStats = this.props.stats['player']['stats'];
			teamStats = this.props.stats['team']['totals'];
			statsTable = <StatsTable player={player} playerStats={playerStats} team={teamAbbr} teamStats={teamStats}/>;
		}
		else if(display === 3){

		}
		return(
			<div>
				<table>
					<StatsTableHeaders stats={this.props.stats}/>
				</table>
				<br/>
			</div>
		);
	}
}

class DraftList extends Component{
	render(){
		const headers = ['Pick', 'Team', 'Player']
		let players;
		let teamAbbr;
		let team;
		let pick;
		if(this.props.display === 1){
			players = [this.props.stats.player];
			teamAbbr = [this.props.stats.abbr];
			team = [this.props.stats.team];
			pick = [this.props.stats.pick];
		}
		else if(this.props.display === 3){
			players = Object.keys(this.props.stats).map(pick => this.props.stats[pick].player);
			players = players.filter(player => player !== undefined);
			teamAbbr = Object.keys(this.props.stats).map(pick => this.props.stats[pick].abbr);
			team = Object.keys(this.props.stats).map(pick => this.props.stats[pick].team);
			pick = Object.keys(this.props.stats).map(pick => pick);
		}
		let draftTable = []
		for(let i = 0; i < players.length; i++){
			let draftCells = [];
			draftCells.push(<td key={headers[0]+i.toString()}>{pick[i]}</td>);
			draftCells.push(<td key={headers[1]+i.toString()}>({teamAbbr[i]}) {team[i]}</td>);
			draftCells.push(<td key={headers[2]+i.toString()}>{players[i]}</td>);
			draftTable.push(<tr key={players[i]}>{draftCells}</tr>);
		}
		return(
			<table>
				<tbody>
					<StatsTableHeaders headers={headers}/>
					{draftTable}
				</tbody>
			</table>
		);
	}
}
class DraftStats extends Component{
	render(){
		return(
			<div>
				<div>
					<br/><br/>
					<div><strong>Draft Year</strong>: {this.props.stats.year}</div>
					<br/>
				</div>
				{this.props.getStats ? <StatsDisplay display={this.props.display} stats={this.props.stats}/> : <DraftList display={this.props.display} stats={this.props.stats}/>}
			</div>
		);
	}
}

export default DraftStats;