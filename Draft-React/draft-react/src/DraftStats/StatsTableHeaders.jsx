import React from 'react';
import PropTypes from 'prop-types';

const StatsTableHeaders = ({ headers }) => {
  const tableHeader = headers.map(header => (
    <th key={header}>
      {header}
    </th>
  ));
  return (
    <tr>
      {tableHeader}
    </tr>
  );
};

StatsTableHeaders.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StatsTableHeaders;
