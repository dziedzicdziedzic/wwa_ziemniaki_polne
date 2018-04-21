import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Requests from '../services/Requests';
import {Ionicons} from '@expo/vector-icons';

export default class SearchField extends React.Component {
    state = {
        searchedPhrase:" ",
    }
    render() {
        return (
                <View style={styles.searchField}>
                    <TextInput style={styles.searchFieldInput} onChangeText={(searchedPhrase) => this.setState({searchedPhrase})} placeholder="input searched phrase"> </TextInput>
                    <TouchableOpacity style={styles.searchFieldIcon} onPress={this.searchPhrase}>
                        <Ionicons name="ios-search" size={50} color="white"/>
                    </TouchableOpacity>
                </View>
        );
    }
    searchPhrase = () => {
        Requests.searchAllegroRequest(this.state.searchedPhrase);
    }


}

var styles = StyleSheet.create({
    searchField:{
        height: 60,
        margin: 17,
        marginTop: 47+80,
        borderRadius: 6,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: '#ff5a00',


    },
    searchFieldInput:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'#f2f0ee',
        height: 60,
        fontSize: 22,
        padding: 6,

    },
    searchFieldIcon:{
        minWidth: 60,
        backgroundColor:'#666',
        height: 60,
        padding: 5,
        paddingLeft: 10,

    },
});