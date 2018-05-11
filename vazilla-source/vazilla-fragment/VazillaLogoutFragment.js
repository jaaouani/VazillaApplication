'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const title = "Vaz://a";

type Props = {};
export default class VazillaLogoutFragment extends Component<Props> {
	constructor(props) {
		super(props);
	}

	render() {
		return(
		<React.Fragment>
			<View style={styles.body}>
				<View style={styles.header}><Text style={styles.title}>{title}</Text></View>
				<Text style={styles.logout}>Déconnexion</Text>
				<ActivityIndicator size='large' color='#0084FF' animating={true} style={styles.indicator} />
			</View>
		</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	body: { flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
	header: { width: width, height: 200, justifyContent: 'center', alignItems: 'center' },
	title: { color: '#0084FF', fontFamily: 'Nunito-ExtraBold', fontSize: 65, },
	logout: { color: '#0084FF', fontFamily: 'Nunito-ExtraBold', fontSize: 20, alignSelf: 'center' },
	indicator: { position: 'relative', top: 20 }
});