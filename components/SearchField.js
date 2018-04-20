import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Requests from '../services/Requests';

class SearchField extends React.Component {
    state = {
        searchedPhrase:" ",
        searchedHasBeenClicked: false,
    }
    render() {
        return (
                <View style={styles.searchField}>
                    <TextInput style={styles.searchFieldInput} onChangeText={(searchedPhrase) => this.setState({searchedPhrase})} placeholder="input searched phrase"> </TextInput>
                    <TouchableOpacity style={styles.searchFieldIcon} onPress={this.searchPhrase}/>
                </View>
        );
    }
    searchPhrase = ()=> {
        Requests.searchRequest(this.state.searchedPhrase);
        this.setState({searchedHasBeenClicked: true})
    }


}
export default SearchField;

var styles = StyleSheet.create({
    searchField:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: 'red',
    },
    searchFieldInput:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'blue',
        height: 50,

    },
    searchFieldIcon:{
        width: 50,
        backgroundColor:'yellow',
        height: 50,

    },
});