'use strict';

import React, { Component } from 'react';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import VazillaLoadingActivity from './vazilla-off-application/VazillaLoadingActivity';
import VazillaLoginActivity from './vazilla-off-application/VazillaLoginActivity';
import VazillaRegisterActivity from './vazilla-off-application/VazillaRegisterActivity';

import VazillaProfileActivity from './vazilla-on-application/VazillaProfileActivity';
import VazillaLogoutActivity from './vazilla-on-application/VazillaLogoutActivity';
import VazillaPropertyActivity from './vazilla-on-application/VazillaPropertyActivity';

const _offlineNavigation = createBottomTabNavigator({
	LoginScreen : { screen : VazillaLoginActivity },
	RegisterScreen : { screen : VazillaRegisterActivity }
}, {
	animationEnabled : true,
	swipeEnabled : true,
	initialRouteName: 'LoginScreen',
	tabBarOptions: {
		style: { height: 50, backgroundColor: '#FFFFFF', borderTopWidth: 0, borderTopColor: '#FFFFFF', paddingTop: 5 },
		labelStyle: { color: '#00C6FF', fontFamily: 'Nunito-ExtraBold' },
		tabStyle : { backgroundColor: '#FFFFFF' },
	}
});

const _onlineNavigation = createBottomTabNavigator({
	ProfileScreen : { screen : VazillaProfileActivity },
	PropertyScreen : { screen : VazillaPropertyActivity },
	LogoutScreen : { screen : VazillaLogoutActivity },
}, {
	animationEnabled : true,
	swipeEnabled : true,
	initialRouteName: 'PropertyScreen',
	tabBarOptions: {
		style: { height: 50, backgroundColor: '#FFFFFF', borderTopWidth: 0, borderTopColor: '#FFFFFF', paddingTop: 5 },
		labelStyle: { color: '#00C6FF', fontFamily: 'Nunito-ExtraBold' },
		tabStyle : { backgroundColor: '#FFFFFF' }
	}
});

const _switchNavigation = createSwitchNavigator({
	ApplicationLoading : { screen : VazillaLoadingActivity },
	ApplicationOffline : { screen : _offlineNavigation },
	ApplicationOnline : { screen : _onlineNavigation },
}, { initialRouteName: 'ApplicationLoading'});

type Props = {};
export default class VazillaNavigation extends Component<Props> {
	constructor(props) { super(props); }
	render() { return (<_switchNavigation />); }
}