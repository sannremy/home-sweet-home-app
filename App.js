/**
 * Home Sweet Home App
 *
 * @format
 * @flow
 */

import { HOME_SWEET_HOME_API_URL } from 'react-native-dotenv'

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Progress from 'react-native-progress';

import River from './components/River';
import Indoor from './components/Indoor';
import Traffic from './components/Traffic';
import Network from './components/Network';
import Weather from './components/Weather';
import Control from './components/Control';

type Props = {};

type State = {
  river: Object,
  weather: Object,
  indoor: Object,
  traffic: Object,
  network: Object,
};

export default class App extends Component<Props, State> {
  state = {
    river: null,
    weather: null,
    indoor: null,
    traffic: null,
    network: null,
  };

  constructor(props) {
    super(props);
  }

  _getServiceFromApi = async (view) => {
    const mapViewEndpoint = {
      indoor: 'netatmo',
      weather: 'weather',
      river: 'vigicrue',
      traffic: 'traffic',
      network: 'network'
    };

    try {
      let response = await fetch(
        HOME_SWEET_HOME_API_URL + '/' + mapViewEndpoint[view],
      );

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  _refreshService = async (service) => {
    // Refresh
    let state = {};
    state[service] = null;
    this.setState(state);

    // Fetch new data
    const data = await this._getServiceFromApi(service);
    state[service] = data;
    this.setState(state);
  }

  _refreshAllServices = () => {
    this._refreshService('river');
    this._refreshService('weather');
    this._refreshService('indoor');
    this._refreshService('traffic');
    this._refreshService('network');
  };

  componentDidMount() {
    this._refreshAllServices();
  }

  render() {
    // Loader
    const loader = <Progress.Circle size={30} indeterminate={true} color='rgba(0, 0, 0, 1)' style={styles.loader} />;

    // River
    let riverComponent = null;

    if (this.state.river) {
      riverComponent = <River data={this.state.river} />;
    } else {
      riverComponent = loader;
    }

    // Weather
    let weatherComponent = null;

    if (this.state.weather) {
      weatherComponent = <Weather data={this.state.weather} />;
    } else {
      weatherComponent = loader;
    }

    // Indoor
    let indoorComponent = null;

    if (this.state.indoor) {
      indoorComponent = <Indoor data={this.state.indoor} />;
    } else {
      indoorComponent = loader;
    }

    // Traffic
    let trafficComponent = null;

    if (this.state.traffic) {
      trafficComponent = <Traffic data={this.state.traffic} />;
    } else {
      trafficComponent = loader;
    }

    // Network
    let networkComponent = null;

    if (this.state.network) {
      networkComponent = <Network data={this.state.network} />;
    } else {
      networkComponent = loader;
    }

    return (
      <View style={styles.app}>
        <SafeAreaView style={styles.appSafe}>
          <Grid style={{ padding: styles.box.padding }}>
            <Col size={6}>
              <Row style={styles.box}>
                <View style={[styles.componentWrapper, styles.componentWrapperBorder]}>
                  {weatherComponent}
                </View>
              </Row>
              <Row style={styles.box}>
                <View style={[styles.componentWrapper, styles.componentWrapperBorder]}>
                  {indoorComponent}
                </View>
              </Row>
            </Col>
            <Col size={6}>
              <Row size={1} style={styles.box}>
                <View style={[styles.componentWrapper, styles.componentWrapperControl]}>
                  <Control onPressRefreshButton={this._refreshAllServices} />
                </View>
              </Row>
              <Row size={4} style={styles.box}>
                <View style={[styles.componentWrapper]}>
                  {trafficComponent}
                </View>
              </Row>
              <Row size={3} style={styles.box}>
                <View style={[styles.componentWrapper, styles.componentWrapperBorder]}>
                  {riverComponent}
                </View>
              </Row>
              <Row size={4} style={styles.box}>
                <View style={[styles.componentWrapper]}>
                  {networkComponent}
                </View>
              </Row>
            </Col>
          </Grid>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  appSafe: {
    flex: 1,
  },
  box: {
    padding: 5,
  },
  componentWrapper: {
    flex: 1,
  },
  componentWrapperBorder: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 10,
  },
  componentWrapperControl: {
    // backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 10,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
