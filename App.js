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
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.setState({refreshing: false});
  }

  render() {
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
            <Text style={{fontSize:96}}>Scroll me plz</Text>
          </ScrollView>

          {/* Footer menu */}
          <View style={styles.menu}>
            <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
              <View>
                <Icon name="thermometer" size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
              <View>
                <Icon name="sun" size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
              <View>
                <Icon name="droplet" size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
              <View>
                <Icon name="map-pin" size={styles.menuItem.fontSize} color={styles.menuItem.color} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
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
  light: '#8effc1',
  background: '#1dbc60',
  dark: '#0dac50',
  veryDark: '#009c41'
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    flex: 0.15,
    flexDirection: 'row',
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 44,
    color: colors.light
  },
  content: {
    backgroundColor: 'white'
  },
  menu: {
    flex: 0.15,
    flexDirection: 'row',
    backgroundColor: colors.background
  },
  menuItem: {
    flex: 0.2,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.light,
    fontSize: 28
  },
});
