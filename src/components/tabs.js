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
  constructor(props) {
    super(props);
    this.clicky = this.clicky.bind(this);
  }
  componentWillMount() {
    const {x, y} = this.props.data.location.query;
    const path = `/image?scale=${Number(this.props.data.scaleFactor)}&x=${x}&y=${y}`;
    this.context.router.push(path);
  }
  render() {
    this.pitchFactory = this.getPitchFactory();
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
            {this.renderTabs()}
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
        activeKey={this.props.data.tabs.activeTab}
        bsStyle="tabs"
        id="tabs"
        onSelect={this.props.data.onTabChange}
      >
        <LinkContainer to={{pathname: '/image', query: this.props.data.location.query}}>
          <NavItem
            eventKey={1}
            title="Image"
          >
            Image
          </NavItem>
        </LinkContainer>
        <LinkContainer to={{pathname: '/graph', query: this.props.data.location.query}}>
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
    switch(this.props.data.params.tab) {
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
                data={this.props.data}
                pitchFactory={this.pitchFactory}
                clicky={this.clicky}
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
                data={this.props.data}
                pitchFactory={this.pitchFactory}
                clicky={this.clicky}
              />
            </div>
          </div>
        );
    }
    return (<div>{el}</div>);
  }
  getPitchFactory() {
    const {scale} = this.props.data.location.query;
    return PitchFactory(Object.assign({}, this.props.data.pitch, {
      scaleFactor: Number(scale)
    }));
  }
  clicky(coords, event) {
    let {scale} = this.props.data.location.query;
    let x;
    let y;
    if (!coords) {
      x = this.pitchFactory.getCursorPoint(event)[0];
      y = this.pitchFactory.getCursorPoint(event)[1];
    } else {
      x = coords[0];
      y = coords[1];
    }
    event.preventDefault();
    const path = `/${this.context.router.params.tab}?x=${x}&y=${y}&scale=${scale}`;
    this.context.router.push(path);
    this.props.data.onMarkerChange([x,y])
  }
};

Tabs.contextTypes = {
  router: React.PropTypes.object
};