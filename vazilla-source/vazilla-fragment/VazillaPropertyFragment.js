'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const title = "Vaz://a";

type Props = {};
export default class VazillaPropertyFragment extends Component<Props> {
	constructor(props) {
		super(props);
	}

	render() {
		return(
		<React.Fragment>
			<View style={styles.body}>
				<View style={styles.searchSection}>
					<Icon name='search' size={22} color="#0084FF" style={styles.searchIcon} />
					<TextInput style={styles.search} placeholder='Rechercher une propriété..' placeholderTextColor='#000000' returnKeyType='next' underlineColorAndroid='transparent'
							autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='email-address' />
					<TouchableOpacity onPress={this.props.goPropertyNew}>
						<Icon name='plus' size={22} color="#0084FF" style={styles.icon} />
					</TouchableOpacity>
				</View>
			</View>
		</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	body: { flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF' },
	searchSection : { flexDirection : 'row', justifyContent: 'center', position: 'relative', top: 8, padding: 10, alignItems: 'center' },
	search: { width: width - 10, height: 45, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', marginTop: -10, paddingLeft: 50, fontFamily: 'Nunito-Bold' },
	icon : { position: 'relative', zIndex: 2, left: -30, top: -5 },
	searchIcon : { position: 'relative', zIndex: 2, top: -5.5, left: 35 }
});