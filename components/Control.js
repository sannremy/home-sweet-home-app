import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

export default class Control extends React.Component {

  constructor(props) {
    super(props);

    const lastUpdateDate = new Date();

    this.state = {
      lastUpdateDate: lastUpdateDate,
      lastUpdateText: moment(lastUpdateDate).fromNow()
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

  _onPressButton = () => {
    this.props.onPressRefreshButton();

    const lastUpdateDate = new Date();
    this.setState({
      lastUpdateDate: lastUpdateDate,
      lastUpdateText: moment(lastUpdateDate).fromNow()
    });
  }

  render() {
    return (
      <Grid style={styles.wrapper}>
        <Row style={styles.rowWrapper}>
          <Col size={3}>
            <TouchableHighlight
              style={styles.refreshButtonTouchable}
              underlayColor='#4183d7'
              onPress={this._onPressButton}
            >
              <View style={styles.refreshButtonView}>
                <Icon name='refresh-cw' size={16} color={styles.refreshButtonText.color} />
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </View>
            </TouchableHighlight>
          </Col>
          <Col size={9}>
            <Text style={styles.lastUpdateText}>{this.state.lastUpdateText}</Text>
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
});
