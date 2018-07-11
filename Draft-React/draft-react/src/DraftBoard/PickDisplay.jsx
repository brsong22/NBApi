import React from 'react';
import PropTypes from 'prop-types';

const PickDisplay = ({ pick }) => (
  <td>
    {pick}
  </td>
);

PickDisplay.propTypes = {
  pick: PropTypes.number.isRequired,
};

export default PickDisplay;
