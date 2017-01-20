import React, { Component } from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import {PitchFactory} from '../core/pitches/pitchFactory';
import {Image} from './image';
import {Graph} from './graph';
//import {Controls} from './controls';
//import {styles} from '../styles';

/**
 Pitch
 */
export class Pitch extends Component {
  static childContextTypes = {
    pitchFactory: React.PropTypes.object.isRequired
  };
  getChildContext() {
    return {
      pitchFactory: this.pitchFactory
    }
  }
  render() {
    this.pitchFactory = PitchFactory(this.props.pitch);
    return (
      <Container fluid={true}>
        <Row style={{marginBottom: 20}}>
          <Col sm="12">
            <Image data={this.props} pitchFactory={this.pitchFactory} />
          </Col>
        </Row>
        <Row style={{marginBottom: 20}}>
          <Col sm="12">
            <Graph data={this.props} pitchFactory={this.pitchFactory} />
          </Col>
        </Row>
      </Container>
    );
  }
}