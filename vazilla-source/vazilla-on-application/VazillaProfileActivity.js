'use strict';

import React, { Component } from 'react';
import { SafeAreaView, View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import VazillaProfileFragment from '../vazilla-fragment/VazillaProfileFragment';
import VazillaAuthentication from '../vazilla-service/VazillaAuthentication';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

type Props = {};
export default class VazillaProfileActivity extends Component<Props> {
	static navigationOptions = {
		tabBarLabel : ('Mon Profile'),
		tabBarIcon : (<Icon name='cogs' size={23} color='#00C6FF' />),
	};

	constructor(props) {
		super(props);
	}

	render() {
		return(
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<TouchableWithoutFeedback style={styles.container}>
					<View style={styles.container}>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF' },
});