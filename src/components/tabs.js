import React, {Component} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Row from 'react-bootstrap/lib/Row';
import {browserHistory} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import {Graph} from './graph';
import {Image} from './image';
import {PitchFactory} from '../core/pitches/pitchFactory';

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
    this.updateMarkerOnClick = this.updateMarkerOnClick.bind(this);
  }
  componentWillMount() {
    this.updateMarkerOnLoad(this.props.data.activeMarker);
  }
  render() {
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
    this.pitchFactory = this.getPitchFactory();
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
                handleClick={this.updateMarkerOnClick}
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
                handleClick={this.updateMarkerOnClick}
              />
            </div>
          </div>
        );
    }
    return (<div>{el}</div>);
  }
  getPitchFactory() {
    return PitchFactory(Object.assign({}, this.props.data.pitch, {
      scaleFactor: this.props.data.scaleFactor,
      orientation: (this.props.data.orientation === 'landscape') ? 'horizontal' : 'vertical'
    }));
  }
  updateMarkerOnLoad(coords) {
    this.navigate({
      tab: '/image',
      scale: this.props.data.scaleFactor,
      orientation: this.props.data.orientation,
      coords
    });
  }
  updateMarkerOnClick(coords) {
    this.navigate({
      tab: this.context.router.params.tab,
      scale: this.props.data.location.query.scale,
      orientation: this.props.data.location.query.orientation,
      coords
    })
  }
  navigate(options) {
    const x = options.coords[0];
    const y = options.coords[1];
    const path = `${process.env.PUBLIC_URL}${options.tab}?orientation=${options.orientation}&scale=${options.scale}&x=${x}&y=${y}`;
    browserHistory.push(path);
    this.props.data.onMarkerChange(options.coords);
  }
};

Tabs.contextTypes = {
  router: React.PropTypes.object
};
