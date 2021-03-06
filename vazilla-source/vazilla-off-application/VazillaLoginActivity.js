'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import VazillaLoginFragment from '../vazilla-fragment/VazillaLoginFragment';
import VazillaAuthentication from '../vazilla-service/VazillaAuthentication';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const title = "Vaz://a";

type Props = {};
export default class VazillaLoginActivity extends Component<Props> {
	static navigationOptions = {
		tabBarLabel : ('Connexion'),
		tabBarIcon : (<Icon name='neuter' size={23} color='#00C6FF' />),
	};

	constructor(props) { 
		super(props); 
		this.state = { email: '', password: '', animating: false, error : false, message: '' }
		this._getPassword = this._getPassword.bind(this); this._getEmail = this._getEmail.bind(this);
		this._submit = this._submit.bind(this); this._closeErrorBox = this._closeErrorBox.bind(this);
	}

	_getEmail = (text) => { this.setState({ email: text }); }
	_getPassword = (text) => { this.setState({ password: text }); }
	_submit = () => { const { navigate } = this.props.navigation;
		this.setState({ animating : true });
		VazillaAuthentication.authenticateUser(this.state.email, this.state.password).then((result) => { 
				if(result.hasOwnProperty('access_token')) { this.setState({ animating: false }); console.log("connected");
					VazillaAuthentication.storageInformation(result); navigate('ApplicationOnline');
				} else { this.setState({ animating: false }); this.setState({ message : 'Impossible de se connecter', error : true }); console.log("not connected"); }
		});
	}
	_closeErrorBox = () => { this.setState({ error: false, message: '' }); }

	render() {
		return(
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<TouchableWithoutFeedback style={styles.container}>
					<View style={styles.container}>
						<View style={styles.header}><Text style={styles.title}>{title}</Text></View>
						<VazillaLoginFragment getEmail={this._getEmail} getPassword={this._getPassword} animating={this.state.animating}
								submit={this._submit} />
						<Modal visible={this.state.error} animationType="slide" transparent={true}>
	                    	<View style={styles.modalContainer}>
                        		<View style={styles.modalView}>
                            		<View style={styles.errorView}>
                                		<Text style={styles.message}>{this.state.message}</Text>
                                			<TouchableOpacity onPress={this._closeErrorBox}>
                                    			<Icon name="close" size={20} style={styles.errorClose} color="#0084FF"/>
                                			</TouchableOpacity>
                            			</View>
                        			</View>
							</View>						
						</Modal>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF' },
	header: { width: width, height: 200, justifyContent: 'center', alignItems: 'center' },
	title: { color: '#0084FF', fontFamily: 'Nunito-ExtraBold', fontSize: 65, },
	modalContainer: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', },
    modalView: { width: width - 25, height: 50, backgroundColor: '#FFFFFF', borderColor: '#DCDDE1', borderWidth: 1, borderRadius: 10, position: 'absolute', top: 60, justifyContent: 'center', alignItems: 'center', },
    errorView: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
    errorClose: { width: 25, height: 25, position: 'relative', right: - 15 },
	message: { fontFamily: 'Nunito-ExtraBold', color: '#000000', fontSize: 14 },
});