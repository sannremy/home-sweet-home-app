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

import River from './components/River';
import Indoor from './components/Indoor';

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
      refreshing: false,
      riverData: null,
      weatherData: null,
      indoorData: null
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

  async componentDidMount() {
    let riverData = await this._getServiceFromApi('river');
    let weatherData = await this._getServiceFromApi('weather');
    let indoorData = await this._getServiceFromApi('indoor');

    this.setState({
      refreshing: false,
      riverData: riverData,
      weatherData: weatherData,
      indoorData: indoorData
    });
  }

  render() {
    // River
    let riverComponent = null;

    if (this.state.riverData) {
      riverComponent = <River data={this.state.riverData} />;
    } else {
      riverComponent = <Text>loading</Text>;
    }

    // Weather
    let weatherComponent = null;

    if (this.state.weatherData) {
      weatherComponent = (
        <View>
          <Text>{JSON.stringify(this.state.weatherData.location.city)}</Text>
          <Text>{JSON.stringify(this.state.weatherData.condition)}</Text>
          <Text>{JSON.stringify(this.state.weatherData.forecast)}</Text>
        </View>
      );
    } else {
      weatherComponent = <Text>loading</Text>;
    }

    // Indoor
    let indoorComponent = null;

    if (this.state.indoorData) {
      indoorComponent = (
        <Indoor data={this.state.indoorData} />
      );
    } else {
      indoorComponent = <Text>loading</Text>;
    }

    return (
      <View style={styles.app}>
        <SafeAreaView style={styles.app}>
          <Grid>
            <Col size={6}>
              <Row style={{ backgroundColor: '#aaa' }}>
                <Icon name='sun' size={styles.menuItem.fontSize} color={styles.menuItem.color} />
                {weatherComponent}
              </Row>
              <Row>
                {indoorComponent}
              </Row>
            </Col>
            <Col size={6}>
              <Row style={{ backgroundColor: '#999' }}>
                <Icon name='map-pin' size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </Row>
              <Row>
                {riverComponent}
              </Row>
              <Row style={{ backgroundColor: '#777' }}>
                <Icon name='wifi' size={styles.menuItem.fontSize} color={styles.menuItem.color} />
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
    backgroundColor: '#fff',
    margin: 20,
    padding: 20
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
});
