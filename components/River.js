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

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  data: Object
};

export default class River extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {
    // Date
    let date = null;
    let dateComponent = null;

    if (this.props.data.date) {
      date = new Date(this.props.data.date);
      dateComponent = <Text>{date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })}</Text>;
    }

    return (
      <Grid style={styles.wrapper}>
        <Row size={2}>
          <View style={styles.name}>
          <Text>{this.props.data.name}</Text>
          </View>
        </Row>
        <Row size={8}>
          <Col>
            <Row>
              <View style={styles.levelWrapper}>
                <Icon name='droplet' size={styles.levelText.fontSize / 1.25} color={this.props.data.color} />
                <Text style={[styles.levelText, { color: this.props.data.color }]}>{this.props.data.level} <Text style={{ fontSize: 16 }}>m</Text></Text>
              </View>
            </Row>
          </Col>
        </Row>
        <Row size={2}>
          <View style={styles.date}>
            {dateComponent}
          </View>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  levelText: {
    paddingLeft: 12,
    fontSize: 32,
    color: '#000'
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
