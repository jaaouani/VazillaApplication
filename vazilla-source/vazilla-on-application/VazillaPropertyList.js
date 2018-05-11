'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import VazillaPropertyFragment from '../vazilla-fragment/VazillaPropertyFragment';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

type Props = {};
export default class VazillaPropertyList extends Component<Props> {
	static navigationOptions = {
		tabBarLabel : ('Mes Propriétés'),
		tabBarIcon : (<Icon name='map-marker' size={23} color='#00C6FF' />),
	};

	constructor(props) { 
		super(props); 
		this._goPropertyNew = this._goPropertyNew.bind(this);
	}

	_goPropertyNew = () => {
		const { navigate } = this.props.navigation;
		navigate('PropertyNewScreen');
	}

	render() {
		return(
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<TouchableWithoutFeedback style={styles.container}>
					<View style={styles.container}>
						<VazillaPropertyFragment goPropertyNew={this._goPropertyNew} />
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