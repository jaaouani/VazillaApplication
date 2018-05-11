'use strict';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

type Props = {};
export default class VazillaProfileFragment extends Component<Props> {
	constructor(props) {
		super(props);
	}

	render() {
		return(
		<React.Fragment>
			<View style={styles.body}>
			</View>
		</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	body: { flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF' }
});