/**
 * Home Sweet Home App
 *
 * @format
 * @flow
 */

import env from './env.json';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  NativeModules,
  ActivityIndicator,
  Text,
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

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
    river: {
      data: null,
      err: null,
    },
    weather: {
      data: null,
      err: null,
    },
    indoor: {
      data: null,
      err: null,
    },
    traffic: {
      data: null,
      err: null,
    },
    network: {
      data: null,
      err: null,
    },
  };

  constructor(props) {
    super(props);

    // Get user locale
    this.locale = Platform.select({
      ios: () => NativeModules.SettingsManager.settings.AppleLocale,
      android: () => NativeModules.I18nManager.localeIdentifier,
    })();
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
        env.homeSweetHomeAPIUrl + '/' + mapViewEndpoint[view],
      );

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      throw error;
    }
  };

  _refreshService = async (service) => {
    // Refresh
    let state = {};
    state[service] = {
      data: null,
      err: null,
    };

    this.setState(state);

    // Fetch new data
    try {
      const data = await this._getServiceFromApi(service);

      if (data) {
        state[service].data = data;
      }
    } catch (error) {
      state[service].err = error;
    }

    this.setState(state);
  }

  _refreshAllServices = () => {
    this._refreshService('river');
    this._refreshService('weather');
    this._refreshService('indoor');
    this._refreshService('traffic');
    this._refreshService('network');
  };

  _getErrorComponent(error) {
    let errorText = null;
    if (error) {
      errorText = <Text>{JSON.stringify(error)}</Text>;
    }

    return (
      <View style={styles.error}>
        <Icon name='wifi-off' size={styles.error.fontSize} />
        {errorText}
      </View>
    );
  }

  componentDidMount() {
    this._refreshAllServices();
  }

  render() {
    // Loader
    const loader = <ActivityIndicator size='large' style={styles.loader} />;

    // River
    let riverComponent = loader;
    if (this.state.river.data) {
      riverComponent = <River data={this.state.river.data} locale={this.locale} />;
    } else if (this.state.river.err) {
      riverComponent = this._getErrorComponent(this.state.river.err);
    }

    // Weather
    let weatherComponent = loader;
    if (this.state.weather.data) {
      weatherComponent = <Weather data={this.state.weather.data} locale={this.locale} />;
    } else if (this.state.weather.err) {
      weatherComponent = this._getErrorComponent(this.state.weather.err);
    }

    // Indoor
    let indoorComponent = loader;
    if (this.state.indoor.data) {
      indoorComponent = <Indoor data={this.state.indoor.data} locale={this.locale} />;
    } else if (this.state.indoor.err) {
      indoorComponent = this._getErrorComponent(this.state.indoor.err);
    }

    // Traffic
    let trafficComponent = loader;
    if (this.state.traffic.data) {
      trafficComponent = <Traffic data={this.state.traffic.data} locale={this.locale} />;
    } else if (this.state.traffic.err) {
      trafficComponent = this._getErrorComponent(this.state.traffic.err);
    }

    // Network
    let networkComponent = loader;
    if (this.state.network.data) {
      networkComponent = <Network data={this.state.network.data} locale={this.locale} />;
    } else if (this.state.network.err) {
      networkComponent = this._getErrorComponent(this.state.network.err);
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
              <Row size={2} style={styles.box}>
                <View style={[styles.componentWrapper, styles.componentWrapperControl]}>
                  <Control
                    onPressRefreshButton={this._refreshAllServices}
                    locale={this.locale}
                  />
                </View>
              </Row>
              <Row size={4} style={styles.box}>
                <View style={[styles.componentWrapper]}>
                  {trafficComponent}
                </View>
              </Row>
              <Row size={2} style={styles.box}>
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
  },
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
  }
});
