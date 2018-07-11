import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DraftYearSelector from './DraftYearSelector';

class DraftForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2017,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit(event) {
    const { handleFormSubmit } = this.props;
    handleFormSubmit(event, this.state);
  }

  render() {
    const { year } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <DraftYearSelector year={year} onChange={this.handleInputChange} />
          <br />
          <input type="submit" value="Get Draft Info" />
        </form>
      </div>
    );
  }
}

DraftForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};

export default DraftForm;
