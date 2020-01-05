/**
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Slider from '@react-native-community/slider';
import Modal from 'react-native-modal';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment/min/moment-with-locales';

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
// iOS 9.3
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
      targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
      padString = String(padString !== undefined ? padString : ' ');
      if (this.length >= targetLength) {
          return String(this);
      } else {
          targetLength = targetLength - this.length;
          if (targetLength > padString.length) {
              padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
          }
          return padString.slice(0, targetLength) + String(this);
      }
  };
}

type Props = {
  data: Object,
  locale: String
};

let serviceUpdatesTimer = null;

export default class Control extends Component<Props> {

  constructor(props) {
    super(props);

    moment.locale(props.locale);
    const lastUpdateDate = new Date();

    this.state = {
      lastUpdateDate: lastUpdateDate,
      isSettingsModalVisible: false,
      refreshIntervalValue: 3600, // seconds
    };

    this._applySettings();
  }

  _onPressRefreshButton = () => {
    this.props.onPressRefreshButton();

    const lastUpdateDate = new Date();
    this.setState({
      lastUpdateDate: lastUpdateDate,
    });
  }

  _onPressSettingsButton = () => {
    this._setSettingsModalVisible(true);
  }

  _setSettingsModalVisible = (visible) => {
    this.setState({
      isSettingsModalVisible: visible
    });
  }

  _onValueChangeRefreshInterval = (value) => {
    this.setState({
      refreshIntervalValue: value
    });
  }

  _formatRefreshIntervalValue = (value) => {
    const duration = moment.duration(value * 1000);
    const minutes = ('' + duration.minutes()).padStart(2, '0');
    const seconds = ('' + duration.seconds()).padStart(2, '0');
    return minutes + ':' + seconds;
  }

  _applySettings = () => {
    if (serviceUpdatesTimer) {
      clearInterval(serviceUpdatesTimer);
      serviceUpdatesTimer = null;
    }

    serviceUpdatesTimer = setInterval(() => {
      this._onPressRefreshButton();
    }, this.state.refreshIntervalValue * 1000);
  }

  _renderSettingsModal = () => {
    return (
      <Modal
        isVisible={this.state.isSettingsModalVisible}
        backdropOpacity={0.5}
        onSwipeComplete={() => {
          this._setSettingsModalVisible(!this.state.isSettingsModalVisible);
        }}
        onBackdropPress={() => {
          this._setSettingsModalVisible(!this.state.isSettingsModalVisible);
        }}
        onModalHide={() => {
          this._applySettings();
        }}
        swipeDirection={['down']}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: 20
        }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text>Refresh Interval</Text>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={1800}
              maximumValue={21600}
              step={1800}
              value={this.state.refreshIntervalValue}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#cccccc'
              onValueChange={this._onValueChangeRefreshInterval}
            />
            <Text>{this._formatRefreshIntervalValue(this.state.refreshIntervalValue)}</Text>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <Grid style={styles.wrapper}>
        <Row style={styles.rowWrapper}>
          <Col size={2}>
            <TouchableHighlight
              style={styles.refreshButtonTouchable}
              underlayColor='#4183d7'
              onPress={this._onPressRefreshButton}
            >
              <View style={styles.refreshButtonView}>
                <Icon name='refresh-cw' size={16} color={styles.refreshButtonText.color} />
              </View>
            </TouchableHighlight>
          </Col>
          <Col size={10}>
            <Text style={styles.lastUpdateDateText}>{moment(this.state.lastUpdateDate).fromNow()}</Text>
          </Col>
          <Col size={1}>
            <TouchableHighlight
              style={styles.settingsButtonTouchable}
              underlayColor='#fff'
              onPress={this._onPressSettingsButton}
            >
              <View style={styles.settingsButtonView}>
                <Icon name='sliders' size={16} color={styles.settingsButtonView.color} />
              </View>
            </TouchableHighlight>
          </Col>
        </Row>
        {this._renderSettingsModal()}
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  rowWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonTouchable: {
    backgroundColor: '#19b5fe',
    borderRadius: 10,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  refreshButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonText: {
    paddingLeft: 10,
    color: '#fff',
  },
  lastUpdateDateText: {
    paddingLeft: 10,
  },
  settingsButtonTouchable: {
    flexDirection: 'row',
  },
  settingsButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: '#000',
  }
});
