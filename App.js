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

      <View style={styles.container}>
          <SearchField/>
          <ListOfSearchedItems style={styles.list}/>
      </View>
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
