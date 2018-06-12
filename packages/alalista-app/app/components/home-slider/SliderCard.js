import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const SliderCard = props => (
  <Text>
    {props.user.name} ({props.user.email})
  </Text>
);

SliderCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
};

export default SliderCard;
