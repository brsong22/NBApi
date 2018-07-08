import React, { Component } from 'react';

function HandleErrors(response){
  if(!response.ok){
    throw Error(response.statusText);
  }
  return response.json();
}

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
		const statCats = Object.keys(this.props.stats.player.stats);
		const player = this.props.stats.player.stats;
		const teamTotals = this.props.stats.team.totals;
		const teamRanks = this.props.stats.team.ranks;
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
						<StatsTableHeaders headers={["Stats", this.props.stats.team.abbr + " Rank", this.props.stats.team.abbr + " Total", this.props.stats.player.player]}/>
						<StatsTable stats={this.props.stats}/>
					</tbody>
				</table>
				<br/>
			</div>
		);
	}
}

class DraftStats extends Component{
	constructor(props){
		super(props);
		this.state = {
			pick: 1,
			showStats: false
		}
		this.handleRowClick = this.handleRowClick.bind(this);
	}
	callAPI(endpoint){
		fetch(endpoint)
		.then(HandleErrors)
		.then(data => {
			const stats = {player: data.player, team: data.team}
			this.setState({stats: stats, showStats: true});
		})
		.catch(error => {
		  this.setState({error: true});
		});
	}
	handleRowClick(event, pick){
		this.setState({pick: pick});
		const endpoint = 'http://localhost:5000/nba/draft/api/drafts/' + this.props.year + '/' + pick + '/stats';
		this.callAPI(endpoint);
	}
	render(){
		return(
			<StatsDisplay stats={this.props.stats} pick={this.state.pick}/>
		);
	}
}

export { DraftStats, StatsTableHeaders, HandleErrors };