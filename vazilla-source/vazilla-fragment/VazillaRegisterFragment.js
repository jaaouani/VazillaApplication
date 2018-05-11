'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

type Props = {};
export default class VazillaRegisterFragment extends Component<Props> {
	constructor(props) { super(props); }

	render() {
		return (
			<React.Fragment>
				<View style={styles.body}>
					<View style={styles.fullnameSection}>
						<Icon name='user' size={25} color='#000000' style={styles.icon} />
						<TextInput style={styles.input} autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='email-address' onSubmitEditing={() => { this.emailInput.focus(); }}
								placeholder='Nom Complet' placeholderTextColor='#000000' returnKeyType='next' underlineColorAndroid='transparent' 
								onChangeText={ (text) => {this.props.getFullname(text); }} /> 
					</View>
					<View style={styles.emailSection}>
						<Icon name='envelope' size={25} color='#000000' style={styles.icon} />
						<TextInput style={styles.input} autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='email-address' ref={ input => { this.emailInput = input } }
								placeholder='Addresse E-mail' placeholderTextColor='#000000' returnKeyType='next' underlineColorAndroid='transparent' onSubmitEditing={() => { this.passwordInput.focus(); }} 
								onChangeText={ (text) => {this.props.getEmail(text); }} /> 
					</View>
					<View style={styles.passwordSection}>
						<Icon name='lock' size={25} color='#000000' style={styles.iconPassword} />
						<TextInput style={styles.input} autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='email-address' secureTextEntry={true}
								placeholder='Mot de passe' placeholderTextColor='#000000' returnKeyType='next' underlineColorAndroid='transparent' ref={ input => { this.passwordInput = input } } 
								onChangeText={ (text) => {this.props.getPassword(text); }} /> 
					</View>
					<View style={styles.submitSection}>
						<TouchableOpacity style={styles.touchRegister} onPress={this.props.submit}>
							<Text style={styles.touchText}>Inscription</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.loadingSection}>
						<ActivityIndicator size='large' color='#0084FF' animating={this.props.animating} style={styles.indicator} />
					</View>
				</View>
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	body: { flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative', top: -80 },
	input: { width: width - 50, height: 50, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', marginTop: -10, paddingLeft: 60, fontFamily: 'Nunito-Bold' },
	icon: { position: 'relative', zIndex: 3, top: 26, left: 20, color: '#000000', width: 25, height: 25, backgroundColor: '#FFFFFF' },
	iconPassword: { position: 'relative', zIndex: 3, top: 26, left: 25, color: '#000000', width: 25, height: 25, backgroundColor: '#FFFFFF' },
	touchRegister: { position: 'relative', width: width - 50, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', marginTop: 10, height: 40, justifyContent: 'center', alignItems: 'center' },
	touchText: { fontFamily: 'Nunito-ExtraBold' },
	indicator: { position: 'relative', top: 40 }
});