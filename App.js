import { HOME_SWEET_HOME_API_URL } from 'react-native-dotenv'

import React from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';

import River from './components/River';
import Indoor from './components/Indoor';
import Traffic from './components/Traffic';
import Network from './components/Network';
import Weather from './components/Weather';

export default class App extends React.Component {
  // _onPressChangeView = async (view) => {
  //   this.setState({
  //     currentView: view,
  //     refreshing: true,
  //   });

  //   try {
  //     let data = await this._getServiceFromApi(view);

  //     this.setState({
  //       refreshing: false,
  //       data: data
  //     });
  //   } catch (err) {
  //     console.error(err);

  //     this.setState({
  //       refreshing: false,
  //       data: null
  //     });
  //   }
  // }

  constructor(props) {
    super(props);
    this.state = {
      river: null,
      weather: null,
      indoor: null,
      traffic: null,
      network: null,
    };
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

  _onRefresh = async () => {
    // this.setState({
    //   refreshing: true
    // });

    // try {
    //   let data = await this._getServiceFromApi(this.state.currentView);

    //   this.setState({
    //     refreshing: false,
    //     data: data
    //   });
    // } catch (err) {
    //   console.error(err);

    //   this.setState({
    //     refreshing: false,
    //     data: null
    //   });
    // }
  }

  _refreshService = async (service) => {
    const data = await this._getServiceFromApi(service);
    const state = {};
    state[service] = data;

    this.setState(state);
  }

  componentDidMount() {

    this._refreshService('river');
    this._refreshService('weather');
    this._refreshService('indoor');
    this._refreshService('traffic');
    this._refreshService('network');
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
              <Row style={styles.box}>
                <View style={[styles.componentWrapper]}>
                  {trafficComponent}
                </View>
              </Row>
              <Row style={styles.box}>
                <View style={[styles.componentWrapper, styles.componentWrapperBorder]}>
                  {riverComponent}
                </View>
              </Row>
              <Row style={styles.box}>
                <View style={[styles.componentWrapper]}>
                  {networkComponent}
                </View>
              </Row>
            </Col>
          </Grid>

          {/* Header menu */}
          {/*<View style={styles.header}>
            <Icon name='home' size={styles.header.fontSize} color={styles.header.color} />
          </View>*/}

          {/* Content */}
          {/*<ScrollView
            style={styles.content}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            {content}
          </ScrollView>*/}

          {/* Footer menu */}
          {/*<View style={styles.menu}>
            <TouchableOpacity onPress={() => this._onPressChangeView('temperature')} style={[styles.menuItem, this.state.currentView === 'temperature' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name='thermometer' size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onPressChangeView('weather')} style={[styles.menuItem, this.state.currentView === 'weather' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name='sun' size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onPressChangeView('river')} style={[styles.menuItem, this.state.currentView === 'river' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name='droplet' size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onPressChangeView('traffic')} style={[styles.menuItem, this.state.currentView === 'traffic' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name='map-pin' size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onPressChangeView('network')} style={[styles.menuItem, this.state.currentView === 'network' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name='wifi' size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
          </View>*/}
        </SafeAreaView>
      </View>
    );
  }
}

const colors = {
  light: '#fad390',
  background: '#f6b93b',
  dark: '#fa983a',
  veryDark: '#e58e26'
};

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  appSafe: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 44,
    color: 'white'
  },
  content: {
    backgroundColor: '#f3f3f3',
    flex: 0.8,
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
  menu: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  menuItem: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: 28,
    borderTopWidth: 10,
    borderTopColor: colors.background
  },
  menuItemHighlighted: {
    borderTopColor: colors.veryDark
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
