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

class PickListDisplay extends Component{
	render(){
		return(
			<tr>
				<PickDisplay pick={this.props.pick}/>
				<TeamDisplay pick={this.props.pick} abbr={this.props.abbr} team={this.props.team}/>
				<PlayerDisplay pick={this.props.pick} player={this.props.player}/>
			</tr>
		)
	}
}

class PickDisplay extends Component{
	render(){
		return(
			<td>{this.props.pick}</td>
		)
	}
}
class TeamDisplay extends Component{
	render(){
		return(
			<td>
				<strong>({this.props.abbr})</strong> {this.props.team}
			</td>
		);
	}
}
class PlayerDisplay extends Component{
	render(){
		return(
			<td>
				{this.props.player}
			</td>
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
		const stats = this.props.stats;
		const headers = Object.keys(stats[1]);
		const pickList = Object.keys(stats).map((pick) => 
			<PickListDisplay key={pick} pick={pick} abbr={stats[pick].abbr} team={stats[pick].team} player={stats[pick].player}/>);

		return(
			<table>
				<tbody>
					<StatsTableHeaders headers={headers}/>
					{pickList}
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
				<DraftList stats={this.props.stats.order}/>
			</div>
		);
	}
}

export default DraftStats;