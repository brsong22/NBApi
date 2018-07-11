import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomTooltip extends Component {
  static statsDict = {
    '2pa': '2-point attempts',
    '2pp': '2-point percentage',
    '3pa': '3-point attempts',
    '3pp': '3-point percentage',
    fta: 'freethrow attemps',
    ftp: 'freethrow percentage',
    drb: 'defensive rebounds',
    orb: 'offensive rebounds',
    ast: 'assists',
    blk: 'blocks',
    stl: 'steals',
    pts: 'points',
  };

  render() {
    const { active, payload, label } = this.props;
    if (active) {
      const playerStyle = {
        color: payload[0].fill,
      };
      const teamStyle = {
        color: payload[1].fill,
      };
      const playerName = payload[0].name;
      const playerVal = payload[0].value;
      const teamName = payload[1].name;
      const teamVal = payload[1].value;
      return (
        <div className="custom-tooltip">
          <p>
            <strong>
              {CustomTooltip.statsDict[label]}
            </strong>
          </p>
          <p style={playerStyle}>
            {playerName}
            :&nbsp;
            {playerVal}
          </p>
          <p style={teamStyle}>
            {teamName}
            :&nbsp;
            {teamVal}
          </p>
        </div>
      );
    }
    return null;
  }
}

CustomTooltip.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
};

CustomTooltip.defaultProps = {
  label: '',
  active: false,
  payload: [],
};

export default CustomTooltip;
