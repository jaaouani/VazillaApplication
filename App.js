
import React, { Component } from 'react';
import { Platform, StyleSheet, Text,  View } from 'react-native';
import VazillaNavigation from './vazilla-source/VazillaNavigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <VazillaNavigation />
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', },
});
