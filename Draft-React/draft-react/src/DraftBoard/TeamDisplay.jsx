import React from 'react';
import PropTypes from 'prop-types';

const TeamDisplay = ({ abbr, team }) => (
  <td>
    <strong>
      (
      {abbr}
      )&nbsp;
    </strong>
    {team}
  </td>
);

TeamDisplay.propTypes = {
  abbr: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
};

export default TeamDisplay;
