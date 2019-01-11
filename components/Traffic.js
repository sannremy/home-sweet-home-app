import React from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

export default class Traffic extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let list = [];

    list.push((
      <Row key={'row-traffic-header'} style={styles.trafficHeaderRow}>
        <Col size={3}>
          <Icon name='clock' size={styles.trafficHeaderRow.fontSize} color={styles.trafficHeaderRow.color} />
        </Col>
        <Col size={7}>
          <Icon name='map-pin' size={styles.trafficHeaderRow.fontSize} color={styles.trafficHeaderRow.color} />
        </Col>
        <Col size={2}>
          <Icon name='maximize-2' size={styles.trafficHeaderRow.fontSize} color={styles.trafficHeaderRow.color} />
        </Col>
      </Row>
    ));

    let durations = this.props.data.durations;

    for (let i = 0; i < durations.length; i++) {
      const formattedDuration = moment.duration(durations[i].duration, 'seconds').humanize();
      const altStyleRow = i % 2 === 0 ? styles.trafficRowOdd : styles.trafficRowEven;
      list.push((
        <Row key={'row-traffic-' + i} style={[styles.trafficRow, altStyleRow]}>
          <Col size={3}>
            <Text>{formattedDuration}</Text>
          </Col>
          <Col size={7}>
            <Text>{durations[i].label}</Text>
          </Col>
          <Col size={2}>
            <Text>{Math.round(durations[i].distance/1000, 1)} km</Text>
          </Col>
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
    padding: 0
  },
  trafficHeaderRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
    fontSize: 16,
    color: '#000'
  },
  trafficRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  trafficRowOdd: {
  },
  trafficRowEven: {
  },
});
