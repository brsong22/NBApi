import React, { Component } from 'react';
import { StatsTableHeaders } from './DraftStats';

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

class DraftBoard extends Component{
	constructor(props){
		super(props);
		this.state = {
			pick: 1,
			showStats: false,
			stats: {}
		}
		this.handleRowClick = this.handleRowClick.bind(this);
	}
	handleRowClick(event, pick){
		this.props.onClick(event, pick);
	}
	render(){
		const stats = this.props.draftBoard;
		const headers = ["Pick", "Team", "Player"];
		const pickList = Object.keys(stats).map((pick) => 
			<PickListDisplay key={pick} pick={pick} abbr={stats[pick].abbr} team={stats[pick].team} player={stats[pick].player} 
				onClick={this.handleRowClick} className={this.props.selectedRow.toString() === pick ? 'selected-row' : ''}/>);
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

export default DraftBoard;