import React, {Component} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Row from 'react-bootstrap/lib/Row';
import {LinkContainer} from 'react-router-bootstrap';

import {PitchFactory} from '../core/pitches/pitchFactory';
import {Image} from './image';
import {Graph} from './graph';

export class Tabs extends Component {
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
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  SVG football pitch
                </Navbar.Brand>
              </Navbar.Header>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <p>Calculates the angle to goal from any point on the pitch and plots the coordinates to a graph.</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {this.renderTabPanel()}
          </Col>
        </Row>
      </Grid>
    );
  }
  renderTabs() {
    return (
      <Nav
        activeKey={this.props.tabs.activeTab}
        bsStyle="tabs"
        id="tabs"
        onSelect={this.props.onTabChange}
      >
        <LinkContainer to={{pathname: '/image'}}>
          <NavItem
            eventKey={1}
            title="Image"
          >
            Image
          </NavItem>
        </LinkContainer>
        <LinkContainer to={{pathname: '/graph'}}>
          <NavItem
            eventKey={2}
            title="Graph">
            Graph
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }
  renderTabPanel() {
    let el;
    switch(this.props.tab) {
      case 'graph':
        el = (
          <div style={{padding: '1em'}}>
            <div>
              <ul>
                <li>Click on a plot point to find the angle to goal.</li>
                <li>Click on "View on image" to return to the image.</li>
              </ul>
            </div>
            <div>
              <Graph
                data={this.props}
                pitchFactory={this.pitchFactory}
              />
            </div>
          </div>
        );
        break;
      default:
        el = (
          <div style={{padding: '1em'}}>
            <div>
              <ul>
                <li>Click inside the touchlines/goal lines to find the angle the goal.</li>
                <li>Click on "View on graph" to plot the coordinates on a graph.</li>
                <li>Click outside the touchlines/goal lines to dismiss the popover.</li>
              </ul>
            </div>
            <div>
              <Image
                data={this.props}
                pitchFactory={this.pitchFactory}
              />
            </div>
          </div>
        );
    }
    return (<div>{el}</div>);
  }
};