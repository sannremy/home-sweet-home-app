import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

export default class Indoor extends React.Component {

  constructor(props) {
    super(props);
  }

  _getModuleComponent = (data) => {
    const metrics = data.dashboard_data;
    const batteryPercent = data.battery_percent;
    const isReachable = data.reachable;

    return (
      <Grid style={styles.wrapper}>
        <Row size={2}>
          <View style={styles.moduleNameWrapper}>
            <Text style={styles.moduleNameText}>{data.module_name}</Text>
          </View>
        </Row>
        <Row size={6}>
          <View style={styles.temperatureWrapper}>
            <Icon name='thermometer' size={styles.temperatureText.fontSize / 1.25} />
            <Text style={styles.temperatureText}>{isReachable ? metrics.Temperature : '- '}°</Text>
          </View>
        </Row>
        <Row size={4}>
          <Col>
            <Row>
              <Col size={3}>
                <Icon name='home' size={styles.metricValue.fontSize} />
              </Col>
              <Col size={9}>
                <Text style={styles.metricValue}>{isReachable ? metrics.CO2 : '- '} <Text style={{ fontSize: 8 }}>ppm</Text></Text>
              </Col>
            </Row>
            <Row>
              <Col size={3}>
                <Icon name='battery' size={styles.metricValue.fontSize} />
              </Col>
              <Col size={9}>
                <Text style={styles.metricValue}>{batteryPercent}%</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col size={3}>
                <Icon name='droplet' size={styles.metricValue.fontSize} />
              </Col>
              <Col size={9}>
                <Text style={styles.metricValue}>{isReachable ? metrics.Humidity : '- '}%</Text>
              </Col>
            </Row>
            <Row>
              <Col size={3}>
                <Icon name={isReachable ? 'check' : 'x'} size={styles.metricValue.fontSize} />
              </Col>
              <Col size={9}>
                <Text style={styles.metricValue}>{isReachable ? 'on' : 'off'}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }

  render() {
    let modules = [];
    modules = modules.concat(this.props.data.main);
    modules = modules.concat(this.props.data.additional);

    let moduleRows = [];

    // Build rows
    for (let i = 0; i < modules.length; i++) {
      moduleRows.push(<Row key={'row-' + i}>{this._getModuleComponent(modules[i])}</Row>);
    }

    // Dispatch rows to cols
    let half = Math.ceil(moduleRows.length / 2);

    let rows1 = [];
    let rows2 = [];

    for (let i = 0; i < moduleRows.length; i++) {
      if (i < half) {
        rows1.push(moduleRows[i]);
      } else {
        rows2.push(moduleRows[i]);
      }
    }

    return (
      <Grid>
        <Col>{rows1}</Col>
        <Col>{rows2}</Col>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  moduleNameWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  moduleNameText: {
    fontSize: 16,
  },
  temperatureWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  temperatureText: {
    fontSize: 32,
    paddingLeft: 5,
    paddingRight: 5,
  },
  metricValue: {
    fontSize: 14,
  },
});
