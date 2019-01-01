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
    let date = null;
    let dateComponent = null;

    if (this.props.data.date) {
      date = new Date(this.props.data.date);
      dateComponent = <Text>{date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })}</Text>;
    }

    return (
      <View style={styles.box}>
        <Icon name={info.name} size={info.size} color={info.color} />
        {dateComponent}
        <Text>{this.props.data.level} m</Text>
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
