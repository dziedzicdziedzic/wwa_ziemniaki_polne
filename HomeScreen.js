import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import SearchField  from './components/SearchField';
import ListOfSearchedItems from './components/ListOfSearchedItems';
import {PubSub} from 'pubsub-js';


export default class HomeScreen extends React.Component {


    render() {
        PubSub.publish("UP", "text");
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