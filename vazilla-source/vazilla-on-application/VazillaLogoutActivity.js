'use strict';

import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import VazillaLogoutFragment from '../vazilla-fragment/VazillaLogoutFragment';
import VazillaAuthentication from '../vazilla-service/VazillaAuthentication';

const width = Dimensions.get('window').width; 
const height = Dimensions.get('window').height;

type Props = {};
export default class VazillaLogoutActivity extends Component<Props> {
	static navigationOptions = {
		tabBarLabel : ('Déconnexion'),
		tabBarIcon : (<Icon name='unlink' size={23} color='#00C6FF' />),
	};

	constructor(props) { super(props); }

	componentWillMount() {
		const { navigate } = this.props.navigation;
		VazillaAuthentication.logoutUser().then((result) => {
			if(result == true) { navigate('ApplicationLoading'); }
			else if(result == false) { console.log('logging out here'); AsyncStorage.removeItem('access_token'); navigate('ApplicationLoading'); }
		});
	}
	componentWillUnmount() {}

	render() {
		return(
			<SafeAreaView style={styles.container}>
				<VazillaLogoutFragment />
			</SafeAreaView>
		); 
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF' },
});