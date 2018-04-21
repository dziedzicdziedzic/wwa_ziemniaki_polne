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
        this.refs.listRef.scrollToOffset({y: 0, animated: false})

    }

    mySubscriber2(msg,data){
        var data2 = JSON.parse(data);
        console.log(data2);
        //data3 = data2.filter((el)=>!this.state.itemDatabase.includes(el));
        var data3 = [];
        for (let el of  data2){
            var add = true;
            for (let el2 of this.state.itemDatabase){
                if (el.id === el2.id){
                    add = false;
                }
            }
            if (add){
                data3.push(el);
            }
        }
        console.log(data3);
        this.setState({itemDatabase: this.state.itemDatabase.concat(data3)});
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
                   ref="listRef"
               />
           )
    }


}