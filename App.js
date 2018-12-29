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

import Icon from 'react-native-vector-icons/Feather';

export default class App extends React.Component {
  _onPressChangeView = async (view) => {
    this.setState({
      currentView: view,
      refreshing: true,
    });

    try {
      let data = await this._getServiceFromApi(view);

      this.setState({
        refreshing: false,
        data: data
      });
    } catch (err) {
      console.error(err);

      this.setState({
        refreshing: false,
        data: null
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      currentView: 'temperature'
    };
  }

  _getServiceFromApi = async (view) => {
    const mapViewEndpoint = {
      temperature: 'weather',
      weather: 'weather',
      river: 'vigicrue',
      traffic: 'weather',
      network: 'weather'
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
    this.setState({
      refreshing: true
    });

    try {
      let data = await this._getServiceFromApi(this.state.currentView);

      this.setState({
        refreshing: false,
        data: data
      });
    } catch (err) {
      console.error(err);

      this.setState({
        refreshing: false,
        data: null
      });
    }
  }

  render() {
    let text = 'text goes here';

    if (this.state.data) {
      text = JSON.stringify(this.state.data);
    }

    return (
      <View style={styles.app}>
        <SafeAreaView style={styles.app}>
          {/* Header menu */}
          <View style={styles.header}>
            <Icon name="home" size={styles.header.fontSize} color={styles.header.color} />
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <Text>{text}</Text>
          </ScrollView>

          {/* Footer menu */}
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => this._onPressChangeView('temperature')} style={[styles.menuItem, this.state.currentView === 'temperature' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name="thermometer" size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onPressChangeView('weather')} style={[styles.menuItem, this.state.currentView === 'weather' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name="sun" size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onPressChangeView('river')} style={[styles.menuItem, this.state.currentView === 'river' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name="droplet" size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onPressChangeView('traffic')} style={[styles.menuItem, this.state.currentView === 'traffic' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name="map-pin" size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onPressChangeView('network')} style={[styles.menuItem, this.state.currentView === 'network' ? styles.menuItemHighlighted : null]}>
              <View>
                <Icon name="wifi" size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
          </View>
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
    flex: 1,
    backgroundColor: colors.background
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
    backgroundColor: 'white',
    flex: 0.8,
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
    color: 'white',
    fontSize: 28,
    borderTopWidth: 10,
    borderTopColor: colors.background
  },
  menuItemHighlighted: {
    borderTopColor: colors.veryDark
  },
});
