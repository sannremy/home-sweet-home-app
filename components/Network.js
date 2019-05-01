/**
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  data: Object
};

export default class Network extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {
    let cols = [[], [], []];

    // Dispatch devices in cols
    let devices = this.props.data.devices;
    for (let i = 0; i < devices.length; i++) {
      const reference = devices[i].reference ? devices[i].reference : null;
      const isAllowed = devices[i].access_control === 'Allow';
      let iconName = 'help-circle';
      let label = devices[i].name;

      if (reference) {
        label = reference.label;
        switch (reference.type) {
          case 'pc':
            iconName = 'monitor';
          break;
          case 'mobile':
            iconName = 'smartphone';
          break;
          case 'tablet':
            iconName = 'tablet';
          break;
          case 'console':
            iconName = 'tv';
          break;
          case 'montre':
            iconName = 'watch';
          break;
          case 'autre':
            iconName = 'cpu';
          break;
          case 'guest':
            iconName = 'user-check';
          break;
          default:
          break;
        }
      }

      cols[i % cols.length].push((
        <Row key={'row-device-' + i} style={styles.deviceRow}>
          <Col size={2}>
            <Icon name={iconName} size={16} />
          </Col>
          <Col size={10}>
            <Text>{label}</Text>
          </Col>
        </Row>
      ));

      cols[i % cols.length].push((
        <Row key={'row-gutter-' + i} style={styles.rowGutter} />
      ));
    }

    // Fill the cols with empty rows to be equals
    let maxRows = Math.ceil(devices.length / cols.length) * 2 - 1; // n * 2 - 1 for gutter

    for (let i = 0; i < cols.length; i++) {
      if (cols[i].length < maxRows) {
        for (let r = cols[i].length; r < maxRows; r++) {
          cols[i].push((
            <Row key={'row-empty-' + i + r} style={[styles.deviceRow, styles.deviceRowEmpty]} />
          ));

          cols[i].push((
            <Row key={'row-empty-gutter-' + i + r} style={styles.rowGutter} />
          ));
        }
      }
    }

    // Push cols in the main structure
    const content = [];

    for (let i = 0; i < cols.length; i++) {
      content.push((
        <Col key={'col-devices-' + i} style={styles.deviceCol}>
          {cols[i]}
        </Col>
      ));

      if (i < cols.length - 1) {
        content.push((
          <Col key={'col-gutter-' + i} style={styles.colGutter} />
        ));
      }
    }

    return (
      <ScrollView>
        <Grid style={styles.wrapper}>
          {content}
        </Grid>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 0
  },
  deviceCol: {
    marginRight: 5,
  },
  deviceRow: {
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#f8f9fa',
    // borderColor: '#eee',
    // borderWidth: 1,
  },
  rowGutter: {
    height: 5,
  },
  colGutter: {
    width: 5,
  },
  deviceRowEmpty: {
    backgroundColor: 'transparent',
  }
});
