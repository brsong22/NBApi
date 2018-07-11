import React from 'react';
import PropTypes from 'prop-types';

const PlayerDisplay = ({ player }) => (
  <td>
    {player}
  </td>
);

PlayerDisplay.propTypes = {
  player: PropTypes.string.isRequired,
};

export default PlayerDisplay;
