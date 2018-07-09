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
				<td>{this.props.teamRanks}</td>
				<td>{this.props.teamTotals}</td>
				<td>{this.props.playerStats}</td>
			</tr>
		);
	}
}

class DraftStats extends Component{
	static statCats= ["2pa","2pp","3pa","3pp","fta","ftp","drb","orb","ast","blk","stl","pts"];
	constructor(props){
		super(props);
		this.state = {
			headers: [],
			statRows: []
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
	    const statRows = DraftStats.statCats.map(stat => <StatsRow key={stat} stat={stat} 
	    	playerStats={data.player.stats[stat]} teamTotals={data.team.totals[stat]} teamRanks={data.team.ranks[stat]}/>);
	    const headers = ["Stats", "(" + data.team.abbr + ") Ranks", "(" + data.team.abbr + ") Totals", data.player.player];
	    this.setState({statRows: statRows, headers: headers});
	  })
	  .catch(error => {
	    this.setState({error: true});
	  });
	}
	render(){
		return(
			<div className="draft-container" id="draft-stats-container">
				<table className="stats-table" id="draft-stats">
					<tbody>
						<StatsTableHeaders headers={this.state.headers}/>
						{this.state.statRows}
					</tbody>
				</table>
			</div>
		);
	}
}

export { DraftStats, StatsTableHeaders, HandleErrors };