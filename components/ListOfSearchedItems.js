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
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount(){
        this.token = PubSub.subscribe("RESPONSE", this.mySubscriber)
    }



    mySubscriber(msg,data){
        this.setState({itemDatabase: data});
    }

    renderItem = (item) => <SingleItem item={item}/>;

    getItemKey = (item) => item.id;

    render(){
           return(
               <FlatList
                   data={this.state.itemDatabase}
                   renderItem={this.renderItem}
                   keyExtractor={this.getItemKey}
               />
           )
    }


}