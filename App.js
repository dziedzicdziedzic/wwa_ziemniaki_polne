import React from 'react';
import {createStore} from 'redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import SearchField  from './components/SearchField';
import BarCodeReader from './components/BarCodeReader';
import ListOfSearchedItems from './components/ListOfSearchedItems'
import {BarCodeScanner} from 'expo';


export default class App extends React.Component {


  render() {
    return (
        <BarCodeReader/>

    );
  }
}



var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
