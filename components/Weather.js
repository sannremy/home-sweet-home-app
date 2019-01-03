import React from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

export default class Weather extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid style={styles.wrapper}>
        <Row>
          <Text>{JSON.stringify(this.props.data)}</Text>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20
  }
});
