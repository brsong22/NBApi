import nba_draft_data as draft
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

@app.route('/nba/draft/api/drafts/<int:year>', methods=['GET'])
def get_draft(year):
	draft = get_draft_stats(year).get_json()
	return jsonify(draft.get('order'))

@app.route('/nba/draft/api/drafts/<int:year>/stats', methods=['GET'])
def get_draft_stats(year):
	draft = [draft for draft in drafts if draft['year'] == year]
	if len(draft) == 0:
		abort(404)
	return jsonify(draft[0])

@app.route('/nba/draft/api/drafts/<int:year>/<int:pick>', methods=['GET'])
def get_draft_pick(year, pick):
	draft = get_draft_stats(year).get_json()
	pick_stats = draft['order'].get(str(pick))
	return jsonify(pick_stats)

@app.route('/nba/draft/api/drafts/<int:year>/<int:pick>/stats', methods=['GET'])
def get_draft_pick_stats(year, pick):
	draft = get_draft_stats(year).get_json()
	player_stats = draft['players'].get(str(pick))
	team_abbr = get_draft_pick(year, pick).get_json().get('abbr')
	team_stats = draft['teams'].get(team_abbr)
	team_stats['abbr'] = team_abbr
	draft_player_team_stats = {'player': player_stats, 'team': team_stats}
	return jsonify(draft_player_team_stats)

if __name__ == '__main__':
	app.run(debug=True)