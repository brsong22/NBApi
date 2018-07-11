import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DraftYearSelector extends Component {
  static currentYear = 2017;

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { onChange } = this.props;
    onChange(event);
  }

  render() {
    const draftYears = [...Array(5).keys()].map(value => (
      <option
        key={(value + 1).toString()}
        value={DraftYearSelector.currentYear - value}
      >
        {DraftYearSelector.currentYear - value}
      </option>
    ));
    const { year } = this.props;
    return (
      <label htmlFor="yearSelect">
        Select Draft Year:
        <select id="yearSelect" name="year" value={year} onChange={this.handleInputChange}>
          {draftYears}
        </select>
      </label>
    );
  }
}

DraftYearSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  year: PropTypes.number,
};

DraftYearSelector.defaultProps = {
  year: 2017,
};

export default DraftYearSelector;
