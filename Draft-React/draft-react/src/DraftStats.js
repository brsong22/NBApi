import React, { Component } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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
	constructor(props){
		super(props);
		this.handleRowClick = this.handleRowClick.bind(this);
	}
	handleRowClick(event){
		this.props.onClick(event, this.props.pick);
	}
	render(){
		return(
			<tr onClick={this.handleRowClick} className={this.props.className}>
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

class StatsRow extends Component{
	render(){
		return(
			<tr>
				<td>{this.props.stat}</td>
				<td>{this.props.teamRanks[this.props.stat]}</td>
				<td>{this.props.teamTotals[this.props.stat]}</td>
				<td>{this.props.playerStats[this.props.stat]}</td>
			</tr>
		);
	}
}
class StatsTable extends Component{
	render(){
		const statCats = Object.keys(this.props.stats.players[1].stats);
		const player = this.props.stats.players[this.props.pick].stats;
		const teamTotals = this.props.stats.teams[this.props.stats.order[this.props.pick].abbr].totals;
		const teamRanks = this.props.stats.teams[this.props.stats.order[this.props.pick].abbr].ranks;
		const statRows = statCats.map(stat => <StatsRow key={stat} stat={stat} playerStats={player} teamTotals={teamTotals} teamRanks={teamRanks}/>);
		return( 
			statRows
		);
	}
}

class StatsDisplay extends Component{
	render(){
		return(
			<div className="draft-container" id="draft-stats-container">
				<table className="stats-table" id="draft-stats">
					<tbody>
						<StatsTableHeaders headers={["Stats", this.props.stats.order[this.props.pick].abbr + " Rank", this.props.stats.order[this.props.pick].abbr + " Total", this.props.stats.players[this.props.pick].player]}/>
						<StatsTable pick={this.props.pick} stats={this.props.stats}/>
					</tbody>
				</table>
				<br/>
			</div>
		);
	}
}

class DraftList extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectedRow: this.props.pick
		}
		this.handleRowClick = this.handleRowClick.bind(this);
	}
	handleRowClick(event, pick){
		this.setState({selectedRow: pick});
		this.props.onClick(event, pick);
	}
	render(){
		const stats = this.props.stats;
		const headers = ["Pick", "Team", "Player"];
		const pickList = Object.keys(stats).map((pick) => 
			<PickListDisplay key={pick} pick={pick} abbr={stats[pick].abbr} team={stats[pick].team} player={stats[pick].player} 
				onClick={this.handleRowClick} className={this.state.selectedRow.toString() === pick ? 'selected-row' : ''}/>);
		return(
			<div className="draft-container" id="draft-board-container">
				<table className="stats-table" id="draft-board">
					<tbody>
						<StatsTableHeaders headers={headers}/>
						{pickList}
					</tbody>
				</table>
			</div>
		);
	}
}

class DraftStats extends Component{
	constructor(props){
		super(props);
		this.state = {
			pick: this.props.pick
		}
		this.handleRowClick = this.handleRowClick.bind(this);
	}

	playerInfo = this.props.stats.players;

	handleRowClick(event, pick){
		this.setState({pick: pick});
	}
	render(){
		const statsHeaders = Object.keys(this.props.stats.players[1].stats);
		const playerName = this.props.stats.players[this.state.pick].player;
		const playerStats = this.props.stats.players[this.state.pick].stats;
		const teamAbbr = this.props.stats.order[this.state.pick].abbr;
		const teamStats = this.props.stats.teams[teamAbbr].totals;
		const barData = Object.keys(playerStats).map(stat => { return {stat, [playerName]: parseFloat(playerStats[stat]), [teamAbbr]: parseFloat(teamStats[stat])}});
		return(
			<div>
				<div>
					<br/><br/>
					<div><strong>Draft Year</strong>: {this.props.stats.year}</div>
					<br/>
				</div>
				<div id="draft-list-container">
					<DraftList stats={this.props.stats.order} onClick={this.handleRowClick} pick={this.state.pick}/>
					<StatsDisplay headers={statsHeaders} stats={this.props.stats} pick={this.state.pick}/>
				</div>
				<div>
					<BarChart width={900} height={500} data={barData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
						<CartesianGrid strokeDasharray="5 5" />
						<XAxis type="category" dataKey="stat"/>
						<YAxis type="number" />
						<Tooltip />
						<legend />
						<Bar dataKey={playerName} fill="#8884d8" barSize={20} isAnimationActive={true}/>
						<Bar dataKey={teamAbbr} fill="#82ca9d" barSize={20} />
					</BarChart>
				</div>
			</div>
		);
	}
}

export default DraftStats;