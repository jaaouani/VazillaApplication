'use strict';

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Root } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import VazillaPropertyList from './VazillaPropertyList';
import VazillaPropertyNew from './VazillaPropertyNew';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const _propertyNavigation = createStackNavigator({
				PropertyScreen : { screen : VazillaPropertyList },
				PropertyNewScreen : { screen : VazillaPropertyNew }
			}, { initialRouteName: 'PropertyScreen', headerMode : 'none' });

type Props = {};
export default class VazillaPropertyActivity extends Component<Props> {
	static router = _propertyNavigation.router;
	static navigationOptions = { tabBarLabel : ('Mes Propriétés'), tabBarIcon : (<Icon name='map-marker' size={23} color='#00C6FF' />), };

	constructor(props) { super(props); }

	render() {
		return ( 
			<Root><_propertyNavigation navigation={this.props.navigation} /></Root> 
		);
	}
}