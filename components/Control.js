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

type Props = {
  data: Object,
  locale: String
};

export default class Control extends Component<Props> {

  constructor(props) {
    super(props);

    moment.locale(props.locale);
    const lastUpdateDate = new Date();

    this.state = {
      lastUpdateDate: lastUpdateDate,
      lastUpdateText: moment(lastUpdateDate).fromNow(),
      isSettingsModalVisible: false,
      refreshIntervalValue: 15,
    };

    this._initAutoRefreshLastUpdateDuration();
  }

  _initAutoRefreshLastUpdateDuration = () => {
    setInterval(() => {
      this.setState({
        lastUpdateText: moment(this.state.lastUpdateDate).fromNow()
      });
    }, 60000);
  }

  _onPressRefreshButton = () => {
    this.props.onPressRefreshButton();

    const lastUpdateDate = new Date();
    this.setState({
      lastUpdateDate: lastUpdateDate,
      lastUpdateText: moment(lastUpdateDate).fromNow()
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
    const output = '';
    const duration = moment.duration(value, 'minutes');
    const hours = ('' + duration.hours()).padStart(2, '0');
    const minutes = ('' + duration.minutes()).padStart(2, '0');
    return hours + ':' + minutes;
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
          <Grid style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Row>
              <Col size={2}><Text>every</Text></Col>
              <Col size={2}><Text>day</Text></Col>
            </Row>
          </Grid>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon name='refresh-cw' size={16} />
            <Text>Refresh Interval</Text>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={15}
              maximumValue={180}
              step={15}
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
            <Text style={styles.lastUpdateText}>{this.state.lastUpdateText}</Text>
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
  lastUpdateText: {
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
