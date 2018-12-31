import React from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class River extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.box}>
        <Text>{this.props.data.date}</Text>
        <Text>{this.props.data.level}</Text>
        <Text>{this.props.data.color}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20
  }
});
