import React from 'react';
import PropTypes from 'prop-types';

const TeamTweet = ({
  id, handle, name, text, date,
}) => (
  <a href={`https://twitter.com/${handle}/status/${id}`}>
    <div className="tweet">
      {text}
      <br />
      <br />
      <strong>
        &nbsp;&nbsp;&mdash;&nbsp;
        {name}
        &nbsp;
        (@
        {handle}
        )&nbsp;
      </strong>
      {date[0]}
      &nbsp;
      {date[1]}
      &nbsp;
      {date[2]}
      &nbsp;
      {date[5]}
    </div>
  </a>
);

TeamTweet.propTypes = {
  id: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TeamTweet;
