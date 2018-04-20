import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import SearchField  from './components/SearchField';
import ListOfSearchedItems from './components/ListOfSearchedItems'
import {BarCodeScanner} from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <SearchField/>
          <ListOfSearchedItems/>
      </View>
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
