import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import SliderCard from './SliderCard';

const Slider = props => (
  <Container>
    {props.allUsers.edges.map(({ node }) => <SliderCard key={node.__id} user={node} />)}
  </Container>
);

Slider.propTypes = {
  allUsers: PropTypes.shape({
    edges: PropTypes.arrayOf().isRequired
  }).isRequired
};

export default Slider;
