import {fromJS} from 'immutable';
import {partial} from 'lodash';
import React, {Component} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Row from 'react-bootstrap/lib/Row';
import {browserHistory} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import {Dialog} from './modal';
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
    this.state = {
      modal: {
        tabs: true,
        image: true,
        graph: true
      }
    };
    this.closeModal = this.closeModal.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
  }
  componentWillMount() {
    this.updateMarker(this.props.data.activeMarker);
  }
  render() {
    return (
      <div>
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
              {this.renderTabPanel()}
            </Col>
          </Row>
        </Grid>
        <Dialog
          show={this.state.modal.tabs}
          title="SVG football pitch"
          body={<p>Calculates the angle to goal from any point on the pitch.</p>}
          onClickClose={partial(this.closeModal, 'tabs')}
        />
      </div>
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
    const {params, pitch} = this.props.data;
    let el;
    this.pitchFactory = PitchFactory(pitch);
    if (params.tab === 'graph') {
      el = (
        <div style={{padding: '1em'}}>
          <Graph
            data={this.props.data}
            pitchFactory={this.pitchFactory}
            handleClick={this.updateMarker}
            closeModal={partial(this.closeModal, 'graph')}
            showModal={this.state.modal.graph && !this.state.modal.tabs}
          />
        </div>
      );
    }
    if (params.tab === 'image') {
      el = (
        <div style={{padding: '1em'}}>
          <Image
            data={this.props.data}
            pitchFactory={this.pitchFactory}
            handleClick={this.updateMarker}
            closeModal={partial(this.closeModal, 'image')}
            showModal={this.state.modal.image && !this.state.modal.tabs}
          />
        </div>
      );
    }
    return (<div>{el}</div>);
  }
  updateMarker(coords) {
    this.navigate({
      coords,
      orientation: this.getParam('orientation'),
      scale: this.getParam('scale'),
      tab: this.getPath()
    });
  }
  navigate(options) {
    const x = options.coords[0];
    const y = options.coords[1];
    const path = `${process.env.PUBLIC_URL}${options.tab}?orientation=${options.orientation}&scale=${options.scale}&x=${x}&y=${y}`;
    browserHistory.push(path);
    this.props.data.onMarkerChange(options.coords);
  }
  getPath() {
    return this.context.router.params.tab || this.props.data.tabs.activeTabPath;
  }
  getParam(prop) {
    return this.props.data.location.query[prop] || this.props.data.pitch[prop];
  }
  closeModal(modal) {
    const nextState = fromJS(this.state).updateIn(
      ['modal', modal],
      (val) => false
    );
    this.setState(nextState.toJS());
  }
};

Tabs.contextTypes = {
  router: React.PropTypes.object
};
