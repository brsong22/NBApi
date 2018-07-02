import nba_draft_data as draft
from flask import Flask, jsonify
from flask import abort
from flask import make_response

app = Flask(__name__)

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
def get_drafts(year):
	draft = [draft for draft in drafts if draft['year'] == year]
	if len(draft) == 0:
		abort(404)
	return jsonify({'draft': draft[0].get('teams')})

@app.route('/nba/draft/api/drafts/<int:year>/<int:pick>', methods=['GET'])
def get_draft_pick(year, pick):
	pick = [draft for draft in drafts if draft['year'] == year][0].get('board')[pick-1]
	if len(pick) == 0:
		abort(404)
	return jsonify({'pick': pick})

if __name__ == '__main__':
	app.run(debug=True)