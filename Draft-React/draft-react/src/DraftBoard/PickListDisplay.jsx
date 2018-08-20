import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickDisplay from './PickDisplay';
import TeamDisplay from './TeamDisplay';
import PlayerDisplay from './PlayerDisplay';

class PickListDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick(event) {
    const { onClick, pick } = this.props;
    onClick(event, pick);
  }

  render() {
    const {
      className, pick, abbr, team, player,
    } = this.props;
    return (
      <tr onClick={this.handleRowClick} className={className}>
        <PickDisplay pick={pick} />
        <TeamDisplay pick={pick} abbr={abbr} team={team} />
        <PlayerDisplay pick={pick} player={player} />
      </tr>
    );
  }
}

PickListDisplay.propTypes = {
  className: PropTypes.string,
  abbr: PropTypes.string,
  team: PropTypes.string,
  player: PropTypes.string,
  pick: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

PickListDisplay.defaultProps = {
  className: '',
  abbr: '',
  team: '',
  player: '',
  pick: 1,
};

export default PickListDisplay;
