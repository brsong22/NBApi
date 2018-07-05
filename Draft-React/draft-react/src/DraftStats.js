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
		console.log(Object.keys(this.props.stats));
		const statsHeaders = Object.keys(this.props.stats).map(statName => <th key="statsName">{statName}</th>);
		const stats = Object.values(this.props.stats).map(statVal => <td>{statVal}</td>);
		return(
			<div>
				<table>
					<tr>
						{statsHeaders}
					</tr>
					<tr>
						{stats}
					</tr>
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
		let playerStats;
		let teamStats;
		if(display === 1){
			player = <PlayerDisplay player={this.props.stats['player']}/>;
			team = <TeamDisplay abbr={this.props.stats['abbr']} team={this.props.stats['team']}/>;
		}
		else if(display === 2){
			player = <PlayerDisplay player={this.props.stats['player']['player']}/>;
			team = <TeamDisplay abbr={this.props.stats['team']['abbr']} team={this.props.stats['team']['team']}/>;
			playerStats = <StatsTable stats={this.props.stats['player']['stats']}/>;
			teamStats = <StatsTable stats={this.props.stats['team']['totals']}/>;
		}
		return(
			<div>
				<div>{player}</div>
				<div>{team}</div>
				<br/>
				<div>{playerStats}</div>
				<div>{teamStats}</div>
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
					<strong>Draft Year</strong>: {this.props.year}
					<br/>
					<strong>Pick No.</strong>: {this.props.pick}
					<br/><br/>
				</div>
				<StatsDisplay display={this.props.display} stats={this.props.stats}/>
			</div>
		);
	}
}

export default DraftStats;