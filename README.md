# NBApi
nba draft api

live heroku app: [https://nbapi-draft.herokuapp.com/](https://nbapi-draft.herokuapp.com/)

blog (in progress): [NBApi: Noob's Basketball API/Analysis](https://medium.com/@brsong22/nbapi-noobs-basketball-api-analysis-9a7a01a03a95)

#### Setting up on local:
*(**Note**: these steps may no longer be sufficient to setup NBApi due to the use of dotenv to remove API keys and endpoints from the source files and move them into config files.)*

###### Installation
Create a git repo with ```git init``` in the directory you wish to clone NBApi to.

Clone NBApi with ```git clone https://github.com/brsong22/NBApi.git``` this will create directory NBApi in your current directory.

Next you need to install the Python dependencies and the React dependencies:

To install the Python dependencies ```cd``` down into the ```draft-flask``` directory. You should see a ```requirements.txt``` file. Install the requirements listed using ```pip install -r requirements.txt```

Navigate to the ```draft-react``` directory. You should see a ```package.json``` file. Run ```npm install``` to install the React dependencies for the project.

###### Running NBApi:
To run NBApi, go into the ```draft-flask``` directory. Run ```python nba-draft-flask.py``` this will start our Flask server and allow us to communicate with our API.

Next, go into the ```draft-react``` directory and run ```npm start```

You should automatically be directed to your browser and a tab to ```localhost:3000``` should open.

NBApi should now be running!

---

# Objective:
Using NBA draft data obtained from [nba-draft-predictor](https://github.com/brsong/nba-draft-predictor) set up an API
using Python Flask and display the data using React.js.

## To Do:
Ideas I hope/plan to integrate into the project:
- **DONE!** ~Build project on Heroku for live demo~
- **DONE!** ~Obtain recent NBA team tweets (based on team selected on the draft board) from Twitter API~
- Update API to be ReSTful
- Integrate PostreSQL (since it is utilized by Heroku) to store data rather than in csv files

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

I then set up an app route as an API endpoint in the Flask server.

App Endpoints:
- /nba/draft/api/drafts/{year}/{pick}/stats

   returns the stats of player and team given the draft year and pick number

- /nba/draft/api/drafts/{year}/avgs

   returns the stat averages of all players and the stat averages of teams with first round picks

- /nba/draft/api/drafts/{year}

   returns the player names and team names in pick order (a.k.a. 'draft board')

## UI

The UI is set up using Facebook's [create-react-app](https://github.com/facebook/create-react-app).

In its current state, it contains a select field to choose the draft year we would like info on.

Currently submitting the select field through a button press is required to display/update draft info.

Once a year is selected and submitted, two tables will be displayed.

A table on the left will represent the "draft board"; a list of the picks that occured and which team had the pick and which player the team picked.

The table on the right displays the stats of the team and the player side-by-side.

By default, when a draft board is loaded, the stats table will display the first pick or the last pick clicked in the draft board.

To view the stats of a specific draft pick, simply click the row on the draft board to display the stats in the stats table.
