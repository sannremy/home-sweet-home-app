import React from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

export default class River extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // Icon
    const info = {
      name: 'help-circle', // Unknown
      size: 20,
      color: this.props.data.color
    };

    if (this.props.data.color === 'green') {
      info.name = 'check-circle';
    } else if (this.props.data.color === 'red') {
      info.name = 'alert-circle';
    } else if (this.props.data.color === 'orange') {
      info.name = 'alert-circle';
    } else if (this.props.data.color === 'yellow') {
      info.name = 'alert-circle';
    }

    // Date

    return (
      <View style={styles.box}>
        <Icon name={info.name} size={info.size} color={info.color} />
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
