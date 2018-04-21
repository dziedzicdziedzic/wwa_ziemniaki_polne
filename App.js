import React from 'react';
import {createStore} from 'redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import SearchField  from './components/SearchField';
import BarCodeReader from './components/BarCodeReader';
import ListOfSearchedItems from './components/ListOfSearchedItems'
import {BarCodeScanner} from 'expo';
import Predicter from './components/Predicter'


export default class App extends React.Component {


  render() {
    return (
        <Predicter/>
    );
  }
}



var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ef7e14',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  list:{
    marginLeft: 18,
    marginRight: 18,
  }
});
