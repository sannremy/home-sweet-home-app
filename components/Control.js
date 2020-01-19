/**
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Slider from '@react-native-community/slider';
import { ButtonGroup, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Col, Row, Grid } from 'react-native-easy-grid';
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
    const refreshIntervalValue = 3600;

    this.state = {
      lastUpdateDate: lastUpdateDate,
      isSettingsModalVisible: false,
      previousRefreshValue: refreshIntervalValue,
      refreshIntervalValue: refreshIntervalValue, // seconds
      modeIndex: 0,
    };
  }

  componentDidMount() {
    this._applySettings(true);
  }

  _onPressRefreshButton = () => {
    this._applySettings(true);
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
    const hours = ('' + duration.hours()).padStart(2, '0');
    const minutes = ('' + duration.minutes()).padStart(2, '0');
    // const seconds = ('' + duration.seconds()).padStart(2, '0');
    // return `${hours}:${minutes}:${seconds}`;
    return `${hours}:${minutes}`;
  }

  _applySettings = (forceApply = false) => {
    if (!forceApply && this.state.previousRefreshValue === this.state.refreshIntervalValue) {
      return;
    }

    this.props.onPressRefreshButton();

    const lastUpdateDate = new Date();
    this.setState({
      previousRefreshValue: this.state.refreshIntervalValue,
      lastUpdateDate: lastUpdateDate,
    });

    // Clear existing timer and set new timer
    if (serviceUpdatesTimer) {
      clearTimeout(serviceUpdatesTimer);
      serviceUpdatesTimer = null;
    }

    serviceUpdatesTimer = setTimeout(() => {
      this._applySettings();
    }, this.state.refreshIntervalValue * 1000);
  }

  _onPressModeAtHomeButton = () => {
    this.setState({
      modeAtHomeEnabled: !this.state.modeAtHomeEnabled
    });
  }

  _onPressModeButton = (modeIndex) => {
    if (this.state.modeIndex !== modeIndex) {
      this.props.onPressModeButton(this.props.data.modes[modeIndex].key);
      this.setState({modeIndex});
    }
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
              minimumTrackTintColor='#00b16a'
              maximumTrackTintColor='#cccccc'
              onValueChange={this._onValueChangeRefreshInterval}
            />
            <Text>{this._formatRefreshIntervalValue(this.state.refreshIntervalValue)}</Text>
          </View>
        </View>
      </Modal>
    );
  }

  _renderControlModes = () => {
    let buttons = [];

    if (this.props.data && this.props.data.modes) {
      buttons = this.props.data.modes.map((mode) => {
        return mode.label;
      });
    }

    return (
      <ButtonGroup
        onPress={this._onPressModeButton}
        selectedIndex={this.state.modeIndex}
        buttons={buttons}
        selectedButtonStyle={{
          backgroundColor: '#00b16a'
        }}
        innerBorderStyle={{
          color: '#f0f0f0'
        }}
      />
    );
  }

  render() {
    return (
      <Grid style={styles.wrapper}>
        <Row style={styles.rowWrapper}>
          <Col size={1}>
            <Icon
              name='refresh-cw'
              type='feather'
              size={16}
              color='#000'
              onPress={this._onPressRefreshButton}
            />
          </Col>
          <Col size={9}>
            <Text>{moment(this.state.lastUpdateDate).calendar()}</Text>
          </Col>
          <Col size={1}>
            <Icon
              name='settings'
              size={16}
              color='#000'
              type='feather'
              onPress={this._onPressSettingsButton}
            />
          </Col>
        </Row>
        <Row style={styles.rowWrapper}>
          <Col size={1}>
            {this._renderControlModes()}
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
});
