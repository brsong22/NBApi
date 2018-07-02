import urllib.request
from datetime import datetime
import configparser
import csv

cfg = configparser.ConfigParser()
cfg.read("draft_flask_cfg.ini")
nba_url = cfg.get("Base", "Url")
cbb_url = cfg.get("Base", "CbbUrl")

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
players_data = []
teams_data = []

for y, f in enumerate(player_files):
	with open(f, newline='') as player_file:
		print(prev_year-y)
		stats_headers = []
		player_stat_rows = csv.reader(player_file, delimiter=',')
		player_stat_totals = {}
		for row_index, stat_row in enumerate(player_stat_rows):
			if row_index == 0:
				stats_headers = stat_row
			else:
				if not prev_year-y in player_stat_totals:
					player_stat_totals[prev_year-y] = {}
				player_stat_totals[prev_year-y][stat_row[0]] = {stat_row[1]:{
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
															   	stats_headers[13]: stat_row[13]}}
		players_data.append(player_stat_totals)
	player_file.close()

team_stats_data = {}
for y, f in enumerate(team_ranks_files):
	with open(f, newline='') as team_rank_file:
		draft_order = []
		stats_headers = []
		team_stat_rows = csv.reader(team_rank_file, delimiter=',')
		team_stat_ranks = {}
		for row_index, stat_row in enumerate(team_stat_rows):
			if row_index == 0:
				stats_headers = stat_row
			else:
				team_abbr = team_abbr_lookup.get(stat_row[1])
				draft_order.append(team_abbr)
				team_stat_ranks[team_abbr] = {stats_headers[1]: stat_row[1],
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
		team_stats_data[prev_year-y] = {'order': draft_order, 'ranks': team_stat_ranks}
	team_rank_file.close()

for y, f in enumerate(team_stats_files):
	with open(f, newline='') as team_totals_file:
		stats_headers = []
		team_stat_rows = csv.reader(team_totals_file, delimiter=',')
		team_stat_totals = {}
		for row_index, stat_row in enumerate(team_stat_rows):
			if row_index == 0:
				stats_headers = stat_row
			else:
				team_abbr = team_abbr_lookup.get(stat_row[1])
				team_stat_totals[team_abbr] = {stats_headers[1]: stat_row[1],
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
		team_stats_data[prev_year-y]['totals'] = team_stat_totals
	team_totals_file.close()

for key in team_stats_data:
	teams_data.append({'year': key, 'stats': team_stats_data.get(key)})
drafts_data.append({'players': players_data, 'teams': teams_data})

print(drafts_data)
return drafts_data


