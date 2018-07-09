import React, { Component } from 'react';
import { StatsTableHeaders, HandleErrors } from './DraftStats';

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
	static headers = ["Pick", "Team", "Player"];
	constructor(props){
		super(props);
		this.state = {
			data: {},
			stats: {},
			pickList: []
		}
		this.handleRowClick = this.handleRowClick.bind(this);
	}
	componentDidMount(){
		const draftBoardURL = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year;
		this.getDraftBoard(draftBoardURL);
	}
	componentDidUpdate(prevProps){
		if(this.props.year !== prevProps.year){
			const draftBoardURL = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year;
			this.getDraftBoard(draftBoardURL);
		}
		else if(this.props.selectedRow !== prevProps.selectedRow){
			this.setPickList(this.state.data);
		}
	}
	getDraftBoard(endpoint){
		fetch(endpoint)
		.then(HandleErrors)
		.then(data => {
		  this.setState({data: data});
		  this.setPickList(data);
		})
		.catch(error => {
		  this.setState({error: true});
		});
	}
	setPickList(data){
		const pickList = Object.keys(data).map(pick => 
			<PickListDisplay key={pick} pick={pick} abbr={data[pick].abbr} 
			team={data[pick].team} player={data[pick].player} 
			onClick={this.handleRowClick} className={this.props.selectedRow.toString() === pick ? 'selected-row' : ''}/>);
		this.setState({pickList: pickList});
	}
	handleRowClick(event, pick){
		this.props.onClick(event, pick);
	}
	render(){
		return(
			<div className="draft-container" id="draft-board-container">
				<table className="stats-table" id="draft-board">
					<tbody>
						<StatsTableHeaders headers={DraftBoard.headers}/>
						{this.state.pickList}
					</tbody>
				</table>
			</div>
		);
	}
}

export default DraftBoard;