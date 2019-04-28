/**
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

type Props = {};
export default class Weather extends Component<Props> {

  constructor(props) {
    super(props);

    this._date = new Date();
  }

  _formatTemp(temperature) {
    return Math.round(temperature, 1) + '°';
  }

  _getIconImageSource = (icon) => {
    let iconImageSource = null;

    switch (icon) {
      case '50n':
        iconImageSource = require('./icons/png/50n.png');
      break;
      case '50d':
        iconImageSource = require('./icons/png/50d.png');
      break;
      case '13n':
        iconImageSource = require('./icons/png/13n.png');
      break;
      case '13d':
        iconImageSource = require('./icons/png/13d.png');
      break;
      case '11d':
        iconImageSource = require('./icons/png/11d.png');
      break;
      case '11n':
        iconImageSource = require('./icons/png/11n.png');
      break;
      case '10d':
        iconImageSource = require('./icons/png/10d.png');
      break;
      case '10n':
        iconImageSource = require('./icons/png/10n.png');
      break;
      case '09d':
        iconImageSource = require('./icons/png/09d.png');
      break;
      case '09n':
        iconImageSource = require('./icons/png/09n.png');
      break;
      case '04n':
        iconImageSource = require('./icons/png/04n.png');
      break;
      case '03n':
        iconImageSource = require('./icons/png/03n.png');
      break;
      case '04d':
        iconImageSource = require('./icons/png/04d.png');
      break;
      case '03d':
        iconImageSource = require('./icons/png/03d.png');
      break;
      case '02n':
        iconImageSource = require('./icons/png/02n.png');
      break;
      case '01n':
        iconImageSource = require('./icons/png/01n.png');
      break;
      case '02d':
        iconImageSource = require('./icons/png/02d.png');
      break;
      case '01d':
        iconImageSource = require('./icons/png/01d.png');
      break;
      default:
      break;
    }

    return iconImageSource;
  };

  _renderCurrent = () => {
    const current = this.props.data.current;

    // Image icon
    let iconCurrentSource = this._getIconImageSource(current.weather[0].icon);

    return (
      <Col>
        <Row style={styles.currentCityNameWrapper}>
          <Text style={styles.currentCityNameText}>{current.name}</Text>
        </Row>
        <Row style={styles.currentConditionWrapper}>
          <Col style={styles.currentConditionColWrapper}>
            <Row style={{ height: 'auto' }}>
              <View style={styles.currentConditionTemperatureWrapper}>
                <Icon name='thermometer' size={styles.currentConditionTempText.fontSize / 1.25} />
                <Text style={styles.currentConditionTempText}>{this._formatTemp(current.main.temp)}</Text>
              </View>
            </Row>
            <Row style={styles.currentConditionMetricWrapper}>
              <Col size={2}>
                <Icon name='arrow-down' size={styles.currentMetricText.fontSize} style={styles.currentMetricIcon} />
              </Col>
              <Col size={4}>
                <Text style={styles.currentMetricText}>{this._formatTemp(current.main.temp_min)}</Text>
              </Col>
              <Col size={2}>
                <Icon name='arrow-up' size={styles.currentMetricText.fontSize} style={styles.currentMetricIcon} />
              </Col>
              <Col size={4}>
                <Text style={styles.currentMetricText}>{this._formatTemp(current.main.temp_max)}</Text>
              </Col>
            </Row>
            <Row style={styles.currentConditionMetricWrapper}>
              <Col size={2}>
                <Icon name='droplet' size={styles.currentMetricText.fontSize} style={styles.currentMetricIcon} />
              </Col>
              <Col size={4}>
                <Text style={styles.currentMetricText}>{current.main.humidity}%</Text>
              </Col>
              <Col size={2}>
                <Icon name='sunset' size={styles.currentMetricText.fontSize} style={styles.currentMetricIcon} />
              </Col>
              <Col size={4}>
                <Text style={styles.currentMetricText}>{(new Date(current.sys.sunset * 1000)).toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' })}</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row style={styles.currentConditionIconWrapper}>
              <Image
                style={styles.currentConditionIcon}
                source={iconCurrentSource}
              />
            </Row>
          </Col>
        </Row>
      </Col>
    );
  };

  _renderForecast = () => {
    // Forecast
    let list = [];
    let forecastList = this.props.data.forecast.list;

    for (let i = 1; i < forecastList.length; i++) {
      const forecast = forecastList[i];

      // Image icon
      const iconForecastSource = this._getIconImageSource(forecast.weather[0].icon);

      list.push((
        <Col key={'row-forecast-' + i}>
          <Row style={styles.forecastDate}>
            <Text>{(new Date(forecast.dt * 1000)).toLocaleDateString('en-US', { weekday: 'short' })}</Text>
          </Row>
          <Row style={{    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',}}>
            <Image
              style={styles.forecastConditionIcon}
              source={iconForecastSource}
            />
          </Row>
          <Row style={styles.forecastTempWrapper}>
            <Col style={styles.forecastTempColWrapper}>
              <Icon name='arrow-down' size={styles.forecastTemp.fontSize} />
              <Text style={styles.forecastTemp}>{this._formatTemp(forecast.temp.min)}</Text>
            </Col>
            <Col style={styles.forecastTempColWrapper}>
              <Icon name='arrow-up' size={styles.forecastTemp.fontSize} />
              <Text style={styles.forecastTemp}>{this._formatTemp(forecast.temp.max)}</Text>
            </Col>
          </Row>
        </Col>
      ));
    }

    return list;
  };

  render() {
    return (
      <Grid style={styles.wrapper}>
        <Row>
          {this._renderCurrent()}
        </Row>
        <Row>
          {this._renderForecast()}
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  currentCityNameWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentCityNameText: {
    fontSize: 16,
  },
  currentConditionTemperatureWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  currentConditionWrapper: {
    height: 128,
  },
  currentConditionColWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentConditionIconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  currentConditionIcon: {
    width: 80,
    height: 80,
  },
  currentConditionMetricWrapper: {
    width: 160,
    height: 'auto',
    paddingTop: 5,
    alignSelf: 'center'
  },
  currentConditionTempText: {
    fontSize: 32,
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  currentMinMaxTempWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  currentMetricIcon: {

  },
  currentMetricText: {
    fontSize: 14,
  },
  forecastConditionIcon: {
    width: 64,
    height: 64,
  },
  forecastTemp: {
    paddingLeft: 5,
    fontSize: 14,
  },
  forecastTempWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forecastDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forecastTempColWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
