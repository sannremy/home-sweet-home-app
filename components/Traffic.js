import React from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

export default class Traffic extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let list = [];

    let durations = this.props.data.durations;
    for (let i = 0; i < durations.length; i++) {
      list.push((
        <Row key={'row-traffic-' + i}>
          <Text>{durations[i].label} - {durations[i].duration}s - {durations[i].distance}m</Text>
        </Row>
      ));
    }

    return (
      <Grid style={styles.wrapper}>
        {list}
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20
  }
});
