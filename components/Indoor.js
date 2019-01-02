import React from 'react';

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
      <Grid style={{ padding: 20 }}>
        <Row size={2}>
          <View style={styles.moduleNameWrapper}>
            <Text style={styles.moduleNameText}>{data.module_name}</Text>
          </View>
        </Row>
        <Row size={6}>
          <View style={styles.temperatureWrapper}>
            <Text style={styles.temperatureText}>{metrics.Temperature}℃</Text>
          </View>
        </Row>
        <Row size={4}>
          <Col>
            <Row>
              <View style={styles.metricWrapper}>
                <Text style={styles.metricValue}>{metrics.Humidity}%</Text>
                <Text style={styles.metricLabel}>Humidity</Text>
              </View>
            </Row>
            <Row>
              <View style={styles.metricWrapper}>
                <Text style={styles.metricValue}>{metrics.CO2}ppm</Text>
                <Text style={styles.metricLabel}>CO2</Text>
              </View>
            </Row>
          </Col>
          <Col>
            <Row>
              <View style={styles.metricWrapper}>
                <Text style={styles.metricValue}>{batteryPercent}%</Text>
                <Text style={styles.metricLabel}>Battery</Text>
              </View>
            </Row>
            <Row>
              <View style={styles.metricWrapper}>
                <Text style={styles.metricValue}>{isReachable ? 'yes' : 'no'}</Text>
                <Text style={styles.metricLabel}>Reachable</Text>
              </View>
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
    alignItems: 'center'
  },
  temperatureText: {
    fontSize: 32,
  },
  metricWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  metricValue: {
    fontSize: 14,
  },
  metricLabel: {
    fontSize: 10,
  },
});
