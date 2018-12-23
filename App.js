import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* Header menu */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Title</Text>
        </View>

        {/* Content */}
        <ScrollView>
          <Text style={{fontSize:96}}>Scroll me plz</Text>
        </ScrollView>

        {/* Footer menu */}
        <View style={{flex: 0.15, flexDirection: 'row', backgroundColor: 'powderblue'}}>
          <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
            <View>
              <Text>Menu 1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
            <View>
              <Text>Menu 1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
            <View>
              <Text>Menu 1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
            <View>
              <Text>Menu 1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressButton} style={styles.menuItem}>
            <View>
              <Text>Menu 1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.15,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 44
  },
  headerText: {
    fontSize: 44
  },
  menuItem: {
    flex: 0.2,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
