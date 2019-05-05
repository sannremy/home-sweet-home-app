/**
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Alert
} from 'react-native';

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
    this.setState({isSettingsModalVisible: visible});
  }

  _onOpenSettingsModal = () => {
    Alert.alert('Modal has been opened.');
  }

  _onCloseSettingsModal = () => {
    Alert.alert('Modal has been closed.');
  }

  render() {
    return (
      <Grid style={styles.wrapper}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isSettingsModalVisible}
          onShow={this._onOpenSettingsModal}
          onDismiss={this._onCloseSettingsModal}
          onRequestClose={this._onCloseSettingsModal}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                this._setSettingsModalVisible(!this.state.isSettingsModalVisible);
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </Modal>
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
    flexDirection: 'row'
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
