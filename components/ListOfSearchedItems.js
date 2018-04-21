import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, View } from "react-native";
import {PubSub} from 'pubsub-js';
import SingleItem from "./SingleItem";


export default class ListOfSearchedItems extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            itemDatabase: [],
        }
        this.mySubscriber = this.mySubscriber.bind(this)
        this.mySubscriber2 = this.mySubscriber2.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount(){
        this.token = PubSub.subscribe("RESPONSE", this.mySubscriber)
        this.token2 = PubSub.subscribe("RESPONSE2", this.mySubscriber2)
    }

    mySubscriber(msg,data){
        this.setState({itemDatabase: JSON.parse(data)});
    }

    mySubscriber2(msg,data){
        this.setState({itemDatabase: this.state.itemDatabase.concat(JSON.parse(data))});
    }

    askForNewEntries(){
        PubSub.publish("ASK",null);
    }
    renderItem = (item) => <SingleItem item={item}/>;

    getItemKey = (item) => item.id;

    render(){
           return(
               <FlatList
                   data={this.state.itemDatabase}
                   renderItem={this.renderItem}
                   keyExtractor={this.getItemKey}
                   onEndReached={()=>{if(this.state.itemDatabase.length>0){this.askForNewEntries()}}}
               />
           )
    }


}