'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import VazillaNewFragment from '../vazilla-fragment/VazillaNewFragment';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

type Props = {};
export default class VazillaPropertyNew extends Component<Props> {
	static navigationOptions = {
		tabBarLabel : ('Nouvelle Propriété'),
		tabBarIcon : (<Icon name='map-marker' size={23} color='#00C6FF' />),
	};

	constructor(props) { 
		super(props); 
		this._goPropertyBack = this._goPropertyBack.bind(this);
	}

	_goPropertyBack = () => {
		const { navigate } = this.props.navigation;
		navigate('PropertyScreen');
	}

	render() {
		return(
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<TouchableWithoutFeedback style={styles.container}>
					<View style={styles.container}>
						<VazillaNewFragment goPropertyBack={this._goPropertyBack} />
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