import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
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
      <Row key={'row-traffic-header'} size={2} style={styles.trafficHeaderRow}>
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
    let rows = [];

    for (let i = 0; i < durations.length; i++) {
      const formattedDuration = moment.duration(durations[i].duration, 'seconds').humanize();
      const trafficFirstRow = i === 0 ? styles.trafficFirstRow : null;
      rows.push((
        <Row key={'row-traffic-' + i} style={[styles.trafficRow, trafficFirstRow]}>
          <Col size={3}>
            <Text>{formattedDuration}</Text>
          </Col>
          <Col size={7}>
            <Text>{durations[i].label}</Text>
          </Col>
          <Col size={2}>
            {/*<Text>{Math.round(durations[i].distance/1000, 1)} km</Text>*/}
            <Text>{Math.round(durations[i].distance/1000 / (durations[i].duration / 3600), 1)} km/h</Text>
          </Col>
        </Row>
      ));
    }

    list.push((
      <Row size={10} key='row-traffic-wrapper'>
        <ScrollView>
          <Grid>
            {rows}
          </Grid>
        </ScrollView>
      </Row>
    ));

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
    color: '#000',
    paddingTop: 10,
    paddingBottom: 10,
  },
  trafficRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
    paddingBottom: 10,
  },
  trafficFirstRow: {
    borderTopWidth: 0
  },
});
