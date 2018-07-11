import React from 'react';
import PropTypes from 'prop-types';

const StatsRow = ({
  stat, teamRanks, teamTotals, playerStats,
}) => (
  <tr>
    <td>
      {stat}
    </td>
    <td>
      {teamRanks}
    </td>
    <td>
      {teamTotals}
    </td>
    <td>
      {playerStats}
    </td>
  </tr>
);

StatsRow.propTypes = {
  stat: PropTypes.string.isRequired,
  teamRanks: PropTypes.string,
  teamTotals: PropTypes.string,
  playerStats: PropTypes.string,
};

StatsRow.defaultProps = {
  teamRanks: 'n/a',
  teamTotals: 'n/a',
  playerStats: 'n/a',
};

export default StatsRow;
