'use strict';

import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet, ActivityIndicator, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { Picker, Header, Left, Right, Button, Body, Title, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import VazillaProperty from '../vazilla-service/VazillaProperty';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const title = "Vaz://a";

type Props = {};
export default class VazillaNewFragment extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = { roomV : false, logement: 'appartement', location: 'vide', listV : false,
								name: '', surface : 0, description: '', address : '', price : 0,
								room_number : 1, rooms: [], names: [], surfaces: [], tmp_name: '', tmp_surface: '' }
		this.submitProperty = this.submitProperty.bind(this);
		this.addNames = this.addNames.bind(this); this.addSurfaces = this.addSurfaces.bind(this);
		this.addRoom = this.addRoom.bind(this); this.listRoom = this.listRoom.bind(this);
		this.showRooms = this.showRooms.bind(this); this.showEverything = this.showEverything.bind(this);
	}
	
	addNames = () => { this.state.names.push({ name : this.state.tmp_name, id : this.state.room_number }); }
	addSurfaces = () => { this.state.surfaces.push({ surface : this.state.tmp_surface, id : this.state.room_number }); }
	showRooms = () => { this.setState({ listV : true }); }

	submitProperty = () => {
		if(this.state.name !== '' && this.state.surface !== 0 && this.state.description !== '' && this.state.address !== '' && this.state.price !== '') {
			AsyncStorage.getItem('access_token').then((result) => {
					const form = { name: this.state.name, surface : this.state.surface, description : this.state.description, 
										address : this.state.address, price : this.state.price, location : this.state.location, logement : this.state.logement,
										room_number : this.state.room_number };
					console.log(result);
			});
		} else { Toast.show({ text: "Insérer tous les champs.", buttonText: "Compris !", buttonTextStyle : styles.buttonTextToast, 
						position: "bottom", duration: 3000, type: "danger", textStyle: styles.textToast }); } 
	}

	submitRoom = () => {
		this.setState({ roomV : false });
		this.setState({ room_number : 1 });
	}

	addRoom = () => { 
		if((this.state.names.length > 0 && this.state.surfaces.length > 0)) {
			if(this.state.names[parseInt(this.state.room_number)-1] !== void 0 && this.state.surfaces[parseInt(this.state.room_number)-1] !== void 0) {
				var i = parseInt(this.state.room_number)+1; this.setState({ room_number: i });
			} else { Toast.show({ text: "Complétez la configuration de votre chambre.", buttonText: "Compris !", buttonTextStyle : styles.buttonTextToast, 
						position: "bottom", duration: 3000, type: "danger", textStyle: styles.textToast }); console.log("no 1"); }
		} else if((this.state.names.length == 0 && this.state.surfaces.length == 0)) {
			Toast.show({ text: "Complétez la configuration de votre chambre.", buttonText: "Compris !", buttonTextStyle : styles.buttonTextToast, 
						position: "bottom", duration: 3000, type: "danger", textStyle: styles.textToast }); console.log("no 2");
		}
	}

	listRoom = () => { const n = this.state.names; const s = this.state.surfaces;
		const inputs = [];
		for(var i = 0; i<this.state.room_number; i++) {
			inputs.push(
				<View style={styles.inputsContainer} key={i}>
					<View style={styles.firstOne}>
						<TextInput style={styles.surfaceInput} placeholder='Surface' placeholderTextColor='#000000' returnKeyType='go' underlineColorAndroid='transparent'
								autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='numeric' onChangeText={ (t) => { this.setState({tmp_surface: t}); } }
								onEndEditing={() => { this.addSurfaces(); }} maxLength={2} value={ (s.length !== 0 && s.hasOwnProperty('surface')) ? parseInt(s[i]['surface']) : '' }/>
						<Icon name='sitemap' size={20} color='#0084FF' style={styles.iconInput}/>
					</View>
					<View style={styles.secondOne}>
						<TextInput style={styles.priceInput} placeholder='Nom' placeholderTextColor='#000000' returnKeyType='go' underlineColorAndroid='transparent'
								autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='default' onChangeText={ (t) => { this.setState({tmp_name: t}); } }
								onSubmitEditing={() => { this.addNames(); }} value={(n.length !== 0 && n.hasOwnProperty('name')) ? n[i]['name'] : ''} />
						<Icon name='address-book' size={20} color='#0084FF' style={styles.iconInput}/>
					</View>
				</View>
			);
		} return inputs;
	}

	showEverything() {
		const list = [];
		if(this.state.names.length == 0) {
			list.push(
				<Text style={styles.nothingMessage}>Aucune chambre ajouté.</Text>
			);
			return list;
		}
		for ( var i = 0; i < this.state.names.length; i++) {
			list.push(
				<View key={i}>
					<Text style={styles.roomTextList}>Chambre {this.state.names[i].name} avec une surface de {this.state.surfaces[i].surface} m2.</Text>
				</View>
			);
		} return list;
	}

	render() {
		return(
		<React.Fragment>
			<View style={styles.body}>
				<View style={styles.searchSection}>
					<TouchableOpacity onPress={this.props.goPropertyBack}><Icon name='window-close' size={30} color="#0084FF" style={styles.icon} /></TouchableOpacity>
				</View>
				<ScrollView style={styles.addSection}>
					<View style={styles.nameSection}>
						<TextInput style={styles.nameInput} placeholder='Nom de la nouvelle Propriété' placeholderTextColor='#000000' returnKeyType='next' underlineColorAndroid='transparent'
							autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='email-address' onChangeText={ (t) => { this.setState({ name: t}); }} />
						<Icon name='address-book' size={20} color='#0084FF' style={styles.iconNew} />
					</View>
					<View style={styles.secondSection}>
						<View style={styles.surfaceSection}>
							<TextInput style={styles.surfaceInput} placeholder='Surface' placeholderTextColor='#000000' returnKeyType='next' underlineColorAndroid='transparent'
								autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='numeric' onChangeText={ (t) => { this.setState({ surface: t}); }} />
							<Icon name='sitemap' size={20} color='#0084FF' style={styles.iconInput} />
						</View>
						<View style={styles.priceSection}>
							<TextInput style={styles.priceInput} placeholder='Prix' placeholderTextColor='#000000' returnKeyType='next' underlineColorAndroid='transparent'
								autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='numeric' onChangeText={ (t) => { this.setState({ price: t}); }} />
							<Icon name='dollar' size={20} color='#0084FF' style={styles.iconInput} />
						</View>
					</View>
					<View style={styles.descriptionSection}>
						<TextInput style={styles.descriptionInput} placeholder='Description de la propriété' placeholderTextColor='#000000' returnKeyType='next' underlineColorAndroid='transparent'
							autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='email-address' multiline={true} numberOfLines={6} editable={true} maxLength={width} onChangeText={ (t) => { this.setState({ description: t}); }} />
					</View>
					<View style={styles.addressSection}>
							<TextInput style={styles.addressInput} placeholder='Addresse complète' placeholderTextColor='#000000' returnKeyType='next' underlineColorAndroid='transparent'
								autoCapitalize='none' autoCorrect={false} autoFocus={false} keyboardType='default' onChangeText={ (t) => { this.setState({ address: t}); }} />
							<Icon name='location-arrow' size={20} color='#0084FF' style={styles.iconAddress} />
					</View>
					<View style={styles.logementSection}>
						            <Picker textStyle={styles.itemText} itemTextStyle={styles.itemText} headerBackButtonText="Je suis sûr" renderHeader={back => <Header style={{ backgroundColor: "#FFFFFF" }}>
                  							<Left><Button transparent onPress={back}><Icon name="angle-left" size={30} style={{ color:'#0084FF' }} /></Button></Left>
                  							<Body style={{ flex: 3 }}><Title style={{ color:'#0084FF', fontFamily: 'Nunito-ExtraBold' }}>Type de logement</Title></Body>
                  							<Right /></Header> }
              			mode="dropdown" iosIcon={<Icon type="FontAwesome" name="angle-double-down" style={{ color: '#0084FF' }} />} style={styles.pickerLogement} selectedValue={this.state.logement}
         				onValueChange={(text) => { this.setState({ logement : text }); }}>
              							<Picker.Item label="Appartement" value="appartement" style={styles.item} />
              							<Picker.Item label="Maison" value="maison" style={styles.item} />
            						</Picker>
					</View>
					<View  style={styles.locationSection}>
									<Picker textStyle={styles.itemText} itemTextStyle={styles.itemText} headerBackButtonText="Je suis sûr" renderHeader={back => <Header style={{ backgroundColor: "#FFFFFF" }}>
                  							<Left><Button transparent onPress={back}><Icon name="angle-left" size={30} style={{ color:'#0084FF' }} /></Button></Left>
                  							<Body style={{ flex: 3 }}><Title style={{ color:'#0084FF', fontFamily: 'Nunito-ExtraBold' }}>Type de location</Title></Body>
                  							<Right /></Header> }
              			mode="dropdown" iosIcon={<Icon type="FontAwesome" name="angle-double-down" style={{ color: '#0084FF' }} />} style={styles.pickerLogement} selectedValue={this.state.location}
         				onValueChange={(text) => { this.setState({ location : text }); }}>
              							<Picker.Item label="Meuble" value="meuble" />
              							<Picker.Item label="Vide" value="vide" />
            						</Picker>
					</View>
					<View style={styles.roomsSection}>
						<TouchableOpacity style={styles.roomOButton} onPress={ () => { this.setState({ listV : true }); }}>
							<Icon name='list-ul' color='#0084FF' size={20} style={styles.iconRoom} />
							<Text style={styles.addText}>Afficher</Text> 
						</TouchableOpacity>
						<TouchableOpacity style={styles.roomTButton} onPress={ () => { this.setState({ roomV : true }); }}>
							<Icon name='plus-square' color='#0084FF' size={20} style={styles.iconRoom} />
							<Text style={styles.addText}>Ajouter des chambres</Text> 
						</TouchableOpacity>
					</View>
					<View style={styles.submitSection}>
						<TouchableOpacity style={styles.submitButton} onPress={this.submitProperty}>
							<Icon name='archive' color='#FFFFFF' size={20} style={styles.iconSubmit} />
							<Text style={styles.submitText}>Sauvegarder</Text> 
						</TouchableOpacity>
					</View>
				</ScrollView>
				<Modal visible={this.state.roomV} animationType="slide" transparent={false}>
	                <View style={styles.modalRoom}>
                        <View style={styles.modalView}>
                            <View style={styles.roomView}>
                            	<TouchableOpacity onPress={() => { this.setState({ roomV : false })}}>
                                  <Icon name="window-close" size={25} style={styles.errorClose} color="#0084FF"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                         <View style={styles.inputView}>
                           	<View style={styles.roomSection}>
                            	<TouchableOpacity style={styles.roomAdd} onPress={this.addRoom}>
                            	  <Text style={styles.roomText}>Ajouter une chambre</Text>
                                  <Icon name="plus-square" size={25} style={styles.roomDone} color="#0084FF"/>
                                </TouchableOpacity>
                            </View>
                         </View>
                         <ScrollView style={styles.inputList}>
                         	{this.listRoom()}
                         	<View style={styles.roomSetup}>
                            	<TouchableOpacity style={styles.roomSubmit} onPress={this.submitRoom}>
                            	  <Text style={styles.roomText} onPress={() => { this.submitRoom(); }}>Sauvegarder</Text>
                                  <Icon name="check-square" size={25} style={styles.roomDone} color="#0084FF"/>
                                </TouchableOpacity>
                         	</View>
                         </ScrollView>
					</View>						
				</Modal>
				<Modal visible={this.state.listV} animationType="slide" transparent={false}>
	                <View style={styles.modalRoom}>
                        <View style={styles.modalView}>
                            <View style={styles.roomView}>
                            	<TouchableOpacity onPress={() => { this.setState({ listV : false })}}>
                                  <Icon name="window-close" size={25} style={styles.errorClose} color="#0084FF"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                         <ScrollView style={styles.inputList}>
                         	{this.showEverything()}
                         </ScrollView>
					</View>					
				</Modal>
			</View>
		</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	body: { flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF' },
	searchSection : { flexDirection : 'row', justifyContent: 'center', position: 'relative', top: 8, padding: 10, alignItems: 'center' },
	secondSection : { flexDirection : 'row', alignSelf: 'center', marginTop: -10 },
	inputsContainer : { flexDirection: 'row', marginTop: 10, position: 'relative', height: 35, width: width - 10, justifyContent: 'center', alignItems: 'center' },
	firstOne : { width: (width / 2) - 10, height: 35, padding: 0, backgroundColor: '#FFFFFF' },
	secondOne : { width: (width / 2) - 10, height: 35, padding: 0, backgroundColor: '#FFFFFF' },
	descriptionSection: { flexDirection : 'row', alignSelf: 'center', marginTop: 10 },
	addressSection: { flexDirection : 'row', alignSelf: 'center', marginTop: 10 },
	surfaceSection : { width: (width / 2) - 10, height: 35, padding: 0, backgroundColor: '#FFFFFF' },
	priceSection : { width: (width / 2) - 10, height: 35, padding: 0, backgroundColor: '#FFFFFF', marginLeft: 5 },
	roomsSection : { flexDirection: 'row', alignSelf:'center', width: width - 10, height: 35, backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 10, borderColor: '#ECF0F1', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
	submitSection : { flexDirection: 'row', alignSelf:'center', width: width - 10, height: 35, backgroundColor: '#0084FF', borderWidth: 1, borderRadius: 10, borderColor: '#ECF0F1', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
	logementSection : { flexDirection: 'row', alignSelf:'center', width: width - 10, height: 35, backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 10, borderColor: '#ECF0F1', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
	locationSection : { flexDirection: 'row', alignSelf:'center', width: width - 10, height: 35, backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 10, borderColor: '#ECF0F1', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
	search: { width: width - 10, height: 45, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', marginTop: -10, paddingLeft: 50, fontFamily: 'Nunito-Bold' },
	icon : { position: 'relative', zIndex: 2, alignSelf:'flex-start' },
	nameInput: { width: width - 10, height: 35, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', paddingLeft: 50, marginTop: 10, alignSelf:'center', fontFamily: 'Nunito-Bold' },
	surfaceInput: { height: 35, width: (width / 2) - 10, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', paddingLeft: 50, alignSelf:'center', fontFamily: 'Nunito-Bold' },
	priceInput: { height: 35, width: (width / 2) - 10, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', paddingLeft: 50, alignSelf:'center', fontFamily: 'Nunito-Bold', marginLeft: 5 },
	descriptionInput: { height: 100, width: width - 10, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', paddingLeft: 40, alignSelf:'center', fontFamily: 'Nunito-Bold', marginLeft: 5 },
	addressInput: { marginLeft: 20, width: width - 10, height: 35, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', paddingLeft: 20, marginTop: 0, alignSelf:'center', fontFamily: 'Nunito-Bold' },
	iconNew : { position: 'relative', zIndex: 2, top: -30, left: 25, width: 20, height: 20 },
	iconInput : { position: 'relative', zIndex: 2, top: -30, left: 15, width: 20, height: 20 },
	iconNameInput : { position: 'relative', zIndex: 2, top: -30, left: 15, width: 25, height: 25 },
	iconAddress: { position: 'relative', zIndex: 2, top: 8, right: 30, width: 20, height: 20 },
	addText: { fontFamily: 'Nunito-ExtraBold', position: 'relative', left: -5 },
	submitText: { fontFamily: 'Nunito-ExtraBold', color: '#FFFFFF' },
	iconRoom: { width: 20, height: 20, position: 'relative', right: 15, top: 0 },
	iconSubmit: { width: 20, height: 20, position: 'relative', right: 15, top: 0 },
	roomTButton: { flexDirection: 'row', position: 'relative', left: 30 },
	roomOButton: { flexDirection: 'row' },
	submitButton: { flexDirection: 'row' },
	itemText : { fontFamily: 'Nunito-Bold', color: '#000000', fontSize: 14 },
	modalRoom : { flex: 1, flexDirection: 'column', position: 'relative', top: 25, alignSelf: 'center' },
	modalView : {  width: width - 10, height: 50, backgroundColor: '#FFFFFF', borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 5 },
	roomView : { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 3 },
	pickerLogement : { width : width - 40,  alignSelf: 'center', height: 35, position: 'relative' },
	textToast : { fontFamily : 'Nunito-Bold' },
	buttonTextToast : { fontFamily : 'Nunito-Bold',},
	inputView : { position: 'relative', top: 10, flexDirection: 'column', width: width - 10 },
	roomInput : { height: 35, width: width - 10, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 10, backgroundColor: '#FFFFFF', paddingLeft: 20, fontFamily: 'Nunito-Bold', fontWeight: '900', alignSelf: 'center' },
	inputList : { position: 'relative', top: 20, flexDirection: 'column', width: width - 10, backgroundColor: '#FFFFFF', alignSelf: 'center', bottom: 60 },
	roomListInput : { position: 'relative', width: width - 10, alignSelf: 'center', height: 40, backgroundColor: '#FFFFFF', marginTop: 10, flexDirection: 'row' },
	roomSetup : { flexDirection: 'row', justifyContent: 'center', width: width - 10, height: 40, alignItems: 'center', marginTop: 10 },
	roomSubmit : { flexDirection: 'row', alignSelf: 'center', width: width - 150, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 5, justifyContent: 'center', alignItems: 'center', height: 30 },
	roomText : { fontFamily: 'Nunito-Bold' },
	roomDone: { position: 'relative', left: 15 },
	roomSection : { flexDirection: 'row', justifyContent: 'center', width: width - 10, height: 40, alignItems: 'center' },
	roomAdd : { flexDirection: 'row', alignSelf: 'center', width: width - 150, borderWidth: 1, borderColor: '#ECF0F1', borderRadius: 5, justifyContent: 'center', alignItems: 'center', height: 30 },
	nothingMessage : { alignSelf: 'center', fontFamily: 'Nunito-Bold', fontWeight: '900' },
	roomTextList : { alignSelf: 'center', fontFamily: 'Nunito-Bold', fontWeight: '900' }
});