# NBApi
nba draft api
blog (in progress): [NBApi: Noob's Basketball API/Analysis](https://medium.com/@brsong22/nbapi-noobs-basketball-api-analysis-9a7a01a03a95)

# Objective:
Using NBA draft data obtained from [nba-draft-predictor](https://github.com/brsong/nba-draft-predictor) set up an API
using Python Flask and display the data using React.js.

## Draft Data:
Currently the data is limited to:
- years 2013-2017
- first 30 picks
- stat categories: 2pt attempts, 2pt%, 3pt attempts, 3pt%, assists, blocks, defensive rebounds, offensive rebounds, free throw attempts, free throw %, points, steals
- player and team stats totals
- team stats rankings

## API

The API is set up using the [Flask](http://flask.pocoo.org/) microframework.

In order to use data obtained from the basketball stats reference site, I first read in the data saved to .csv files to create dictionary objects to act as a pseudo database.

I then set up an app route as an API endpoint in the Flask server. Due to the simplicity of the data gathered and the behavior of the app's frontend, I only set up a single endpoint which returns the data in its entirety.

The complexity could increase with a wider extent of types of data gathered.

## UI

The UI is set up using Facebook's [create-react-app](https://github.com/facebook/create-react-app).

In its current state, it contains a select field to choose the draft year we would like info on.

Currently submitting the select field through a button press is required to display/update draft info.

Once a year is selected and submitted, two tables will be displayed.

A table on the left will represent the "draft board"; a list of the picks that occured and which team had the pick and which player the team picked.

The table on the right displays the stats of the team and the player side-by-side.

By default, when a draft board is loaded, the stats table will display the first pick or the last pick clicked in the draft board.

To view the stats of a specific draft pick, simply click the row on the draft board to display the stats in the stats table.
