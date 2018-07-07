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
	constructor(props){
		super(props);
		this.handleRowClick = this.handleRowClick.bind(this);
	}
	handleRowClick(event){
		this.props.onClick(event, this.props.pick);
	}
	render(){
		return(
			<tr onClick={this.handleRowClick}>
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
				<td>{this.props.teamStats[this.props.stat]}</td>
				<td>{this.props.playerStats[this.props.stat]}</td>
			</tr>
		);
	}
}
class StatsTable extends Component{
	render(){
		const statCats = Object.keys(this.props.stats.players[1].stats);
		console.log(statCats);
		const player = this.props.stats.players[this.props.pick].stats;
		const team = this.props.stats.teams[this.props.stats.order[this.props.pick].abbr].totals;
		const statRows = statCats.map(stat => <StatsRow key={stat} stat={stat} playerStats={player} teamStats={team}/>);
		console.log(statRows);
		return( 
			statRows
		);
	}
}

class StatsDisplay extends Component{
	render(){
		return(
			<div>
				<table>
					<tbody>
						<StatsTableHeaders headers={["", this.props.stats.order[this.props.pick].abbr, this.props.stats.players[this.props.pick].player]}/>
						<StatsTable pick={this.props.pick} stats={this.props.stats}/>
					</tbody>
				</table>
				<br/>
			</div>
		);
	}
}

class DraftList extends Component{
	render(){
		const stats = this.props.stats;
		const headers = ["Pick", "Team", "Player"];
		const pickList = Object.keys(stats).map((pick) => 
			<PickListDisplay key={pick} pick={pick} abbr={stats[pick].abbr} team={stats[pick].team} player={stats[pick].player} onClick={this.props.onClick}/>);

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
	constructor(props){
		super(props);
		this.state = {
			stats: this.props.stats,
			showStats: false,
			statsHeaders: Object.keys(this.props.stats.players[1].stats)
		}
		this.handleRowClick = this.handleRowClick.bind(this);
	}

	handleRowClick(event, pick){
		console.log(pick);
		this.setState({showStats: true, pick: pick});
	}
	render(){
		return(
			<div>
				<div>
					<br/><br/>
					<div><strong>Draft Year</strong>: {this.state.stats.year}</div>
					<br/>
				</div>
				<DraftList stats={this.state.stats.order} onClick={this.handleRowClick}/>
				{this.state.showStats ? <StatsDisplay headers={this.state.statsHeaders} stats={this.state.stats} pick={this.state.pick}/> : <div/>}
			</div>
		);
	}
}

export default DraftStats;