import nba_draft_data as draft
import numpy as np
from flask import Flask, jsonify
from flask import abort
from flask import make_response
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/nba/draft/api/drafts/*": {"origins": "http://localhost:3000"}})

draft_years = [
	{
		'id': 1,
		'title': u'draft 1',
		'description': u'draft for year 1',
		'done': False
	},
	{
		'id': 2,
		'title': u'draft 2',
		'description': u'draft for year 2',
		'done': False
	}
]

drafts = draft.get_draft_data()

@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify({'error': 'Not Found'}), 404)

@app.route('/nba/draft/api/drafts/<int:year>/<int:pick>', methods=['GET'])
#"display-1" data DEPRECATE
def get_draft_pick(year, pick):
	draft = get_draft_stats(year).get_json()
	pick_stats = draft['order'].get(str(pick))
	# print(pick_stats)
	return jsonify(pick_stats)

@app.route('/nba/draft/api/drafts/<int:year>/<int:pick>/stats', methods=['GET'])
def get_draft_pick_stats(year, pick):
	draft = get_draft_stats(year).get_json()
	player_stats = draft['players'].get(str(pick))
	team_abbr = get_draft_pick(year, pick).get_json().get('abbr')
	team_stats = draft['teams'].get(team_abbr)
	team_stats['abbr'] = team_abbr
	draft_player_team_stats = {'player': player_stats, 'team': team_stats}
	# print(draft_player_team_stats)
	return jsonify(draft_player_team_stats)

@app.route('/nba/draft/api/drafts/<int:year>', methods=['GET'])
def get_draft(year):
	draft = get_draft_stats(year).get_json()
	# print(draft.get('order'))
	return jsonify(draft.get('order'))

@app.route('/nba/draft/api/drafts/<int:year>/stats', methods=['GET'])
def get_draft_stats(year):
	draft = [draft for draft in drafts if draft['year'] == year]
	if len(draft) == 0:
		abort(404)
	# print(draft[0])
	return jsonify(draft[0])

@app.route('/nba/draft/api/drafts/<int:year>/avgs', methods=['GET'])
def get_draft_avgs(year):
	draft = get_draft_stats(year).get_json()
	team_avg = {}
	team_count = 0.0
	for team in draft.get('teams'):
		team_count += 1
		for stat in draft['teams'][team].get('totals'):
			if stat in team_avg:
				team_avg[stat] += float(draft['teams'][team]['totals'].get(stat))
			else:
				team_avg[stat] = float(draft['teams'][team]['totals'].get(stat))
	for stat in team_avg:
		team_avg[stat] = float("{0:.2f}".format(team_avg[stat]/team_count))
	player_avg = {}
	player_count = 0
	for i in draft.get('players'):
		player_count += 1
		for stat in draft['players'][i].get('stats'):
			if not np.isnan(float(draft['players'][i]['stats'].get(stat))):
				if stat in player_avg:
					player_avg[stat] += float(draft['players'][i]['stats'].get(stat))
				else:
					player_avg[stat] = float(draft['players'][i]['stats'].get(stat))
	for stat in player_avg:
		player_avg[stat] = float("{0:.2f}".format(player_avg[stat]/player_count))
	avgs = {'players': player_avg, 'teams': team_avg}
	return jsonify(avgs)



if __name__ == '__main__':
	app.run(debug=True)