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
      {date}
    </div>
  </a>
);

TeamTweet.propTypes = {
  id: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default TeamTweet;
