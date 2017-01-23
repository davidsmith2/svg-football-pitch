import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';

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
      <Grid>
        <Row>
          <Col sm={12}>
            <Tabs
              defaultActiveKey={this.props.tabs.activeTab}
              id="tabs"
              onSelect={this.props.onTabChange}
            >
              <Tab
                eventKey={1}
                title="Image">
                <Image
                  data={this.props}
                  pitchFactory={this.pitchFactory}
                />
              </Tab>
              <Tab
                eventKey={2}
                title="Graph">
                <Graph
                  data={this.props}
                  pitchFactory={this.pitchFactory}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Grid>
    );
  }
}