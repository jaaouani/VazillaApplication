'use strict';

import React, { Component } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const title = "Vaz://a";

import VazillaAuthentication from '../vazilla-service/VazillaAuthentication';

type Props = {};
export default class VazillaLoadingActivity extends Component<Props> {
	constructor(props) { super(props); }

	componentWillMount() {
		const { navigate } = this.props.navigation;
		VazillaAuthentication.userConnected().then((result) => { const response = JSON.parse(result);
				if((response.hasOwnProperty('status') && response.status == false) || result == null) { navigate('ApplicationOffline'); }
				else if(response.hasOwnProperty('status') && response.status == true) { VazillaAuthentication.verifyAuthentication(response.token, response.rtoken).then((result) => {
						if(result == true) { navigate('ApplicationOnline'); }
						else if(result == false) { navigate('ApplicationOffline'); }
				}); }
		});
	}
	componentWillUnMount() {}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<View style={styles.header}><Text style={styles.title}>{title}</Text></View>
					<ActivityIndicator size='large' color='#FFFFFF' animating={true} />
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container : { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0084FF' },
	header: { width: width, height: 200, justifyContent: 'center', alignItems: 'center' },
	title: { color: '#FFFFFF', fontFamily: 'Nunito-ExtraBold', fontSize: 65, }
});