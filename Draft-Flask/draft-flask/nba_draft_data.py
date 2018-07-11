import urllib.request
from datetime import datetime
import csv

prev_year = datetime.today().year-1

team_abbr_lookup = {
					'Atlanta Hawks': 'ATL',
					'Boston Celtics': 'BOS',
					'Brooklyn Nets': 'BKN',
					'Charlotte Hornets': 'CHA',
					'Chicago Bulls': 'CHI',
					'Cleveland Cavaliers': 'CLE',
					'Dallas Mavericks': 'DAL',
					'Denver Nuggets': 'DEN',
					'Detroit Pistons': 'DET',
					'Golden State Warriors': 'GSW',
					'Houston Rockets': 'HOU',
					'Indiana Pacers': 'IND',
					'Los Angeles Clippers': 'LAC',
					'Los Angeles Lakers': 'LAL',
					'Memphis Grizzlies': 'MEM',
					'Miami Heat': 'MIA',
					'Milwaukee Bucks': 'MIL',
					'Minnesota Timberwolves': 'MIN',
					'New Orleans Pelicans': 'NOP',
					'New York Knicks': 'NYK',
					'Oklahoma City Thunder': 'OKC',
					'Orlando Magic': 'ORL',
					'Philadelphia 76ers': 'PHI',
					'Phoenix Suns': 'PHX',
					'Portland Trail Blazers': 'POR',
					'Sacramento Kings': 'SAC',
					'San Antonio Spurs': 'SAS',
					'Toronto Raptors': 'TOR',
					'Utah Jazz': 'UTA',
					'Washington Wizards': 'WAS',
					'New Orleans Hornets': 'NOP',
					'New Jersey Nets': 'BKN',
					'Charlotte Bobcats': 'CHA'}

player_files = []
team_ranks_files = []
team_stats_files = []
for i in range(5):
	file_year = str(prev_year - i)
	player_files.append('[' + file_year +'] Drafted Player Stats.csv')
	team_ranks_files.append('[' + file_year + '] Team Draft Order and Stats Rankings.csv')
	team_stats_files.append('[' + file_year + '] Team Draft Order and Stats Totals.csv')

drafts_data = []

def get_draft_data():
	for i in range(5):
		year_i = prev_year - i
		draft_i = {}
		draft_i['year'] = year_i
		file_year = str(year_i)
		player_stat_file = '[' + file_year +'] Drafted Player Stats.csv'
		team_stat_rank_file = '[' + file_year + '] Team Draft Order and Stats Rankings.csv'
		team_stat_total_file = '[' + file_year + '] Team Draft Order and Stats Totals.csv'
		#get player stats for each draft
		#[{year:{pick:{name:{stats}}}}]
		with open(player_stat_file, newline='') as player_file:
			stats_headers = []
			player_stat_rows = csv.reader(player_file, delimiter=',')
			player_stat_totals = {}
			for row_index, stat_row in enumerate(player_stat_rows):
				if row_index == 0:
					stats_headers = stat_row
				else:
					player_stat_totals[row_index] = {}
					player_stat_totals[row_index]['player'] = stat_row[1]
					player_stat_totals[row_index]['stats'] = {stats_headers[2]: stat_row[2],
															  stats_headers[3]: stat_row[3],
															  stats_headers[4]: stat_row[4],
															  stats_headers[5]: stat_row[5],
															  stats_headers[6]: stat_row[6],
															  stats_headers[7]: stat_row[7],
															  stats_headers[8]: stat_row[8],
															  stats_headers[9]: stat_row[9],
															  stats_headers[10]: stat_row[10],
															  stats_headers[11]: stat_row[11],
															  stats_headers[12]: stat_row[12],
															  stats_headers[13]: stat_row[13]}
		player_file.close()
		draft_i['players'] = player_stat_totals

		team_stats_data = {}
		#get team stats ranks for each draft
		#{year:{order:[{name, abbr}], ranks:{team:{stats}}}}
		with open(team_stat_rank_file, newline='') as team_rank_file:
			draft_order = {}
			stats_headers = []
			team_stat_rows = csv.reader(team_rank_file, delimiter=',')
			team_stat_ranks = {}
			for row_index, stat_row in enumerate(team_stat_rows):
				if row_index == 0:
					stats_headers = stat_row
				else:
					team_abbr = team_abbr_lookup.get(stat_row[1])
					player_pick = draft_i['players'][row_index].get('player')
					draft_order[row_index] = {'team': stat_row[1], 'abbr': team_abbr, 'player': player_pick}
					team_stat_ranks[team_abbr] = {'team ' + stats_headers[1]: stat_row[1],
												  stats_headers[2]: stat_row[2],
												  stats_headers[3]: stat_row[3],
												  stats_headers[4]: stat_row[4],
												  stats_headers[5]: stat_row[5],
												  stats_headers[6]: stat_row[6],
												  stats_headers[7]: stat_row[7],
												  stats_headers[8]: stat_row[8],
												  stats_headers[9]: stat_row[9],
												  stats_headers[10]: stat_row[10],
												  stats_headers[11]: stat_row[11],
												  stats_headers[12]: stat_row[12],
												  stats_headers[13]: stat_row[13]}
		team_rank_file.close()
		draft_i['order'] = draft_order

		#get team stats totals for each draft
		#{abbr:{stats}}
		with open(team_stat_total_file, newline='') as team_totals_file:
			stats_headers = []
			team_stat_rows = csv.reader(team_totals_file, delimiter=',')
			team_stat_totals = {}
			for row_index, stat_row in enumerate(team_stat_rows):
				if row_index == 0:
					stats_headers = stat_row
				else:
					team_abbr = team_abbr_lookup.get(stat_row[1])
					team_stat_totals[team_abbr] = {'team ' + stats_headers[1]: stat_row[1],
												   stats_headers[2]: stat_row[2],
												   stats_headers[3]: stat_row[3],
												   stats_headers[4]: stat_row[4],
												   stats_headers[5]: stat_row[5],
												   stats_headers[6]: stat_row[6],
												   stats_headers[7]: stat_row[7],
												   stats_headers[8]: stat_row[8],
												   stats_headers[9]: stat_row[9],
												   stats_headers[10]: stat_row[10],
												   stats_headers[11]: stat_row[11],
												   stats_headers[12]: stat_row[12],
												   stats_headers[13]: stat_row[13]}
		team_totals_file.close()

		team_stats = {}
		for key in team_stat_ranks:
			team_stats[key] = {}
			team_stats[key]['ranks'] = {}
			team_stats[key]['totals'] = {}
			team_stats[key]['team'] = team_stat_ranks[key].get('team name')
			for stats in team_stat_ranks.get(key):
				if not stats == 'team name':
					team_stats[key]['ranks'][stats] = team_stat_ranks[key].get(stats)
					team_stats[key]['totals'][stats] = team_stat_totals[key].get(stats)
		draft_i['teams'] = team_stats
		drafts_data.append(draft_i)

	#drafts_data = [{year, players, order, teams}]
	#	#player = {pick{name, stats}}
	#	#order = {pick{team, abbr, player}}
	#	#team = {abbr: ranks{stats}, totals{stats}}
	return drafts_data