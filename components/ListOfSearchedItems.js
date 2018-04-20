import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet } from "react-native";
import { SingleItem } from "components";
import {SearchField} from "components";

class ListOfSearchedItems extends React.Component {

   state={
        itemDatabase:[],
    };

    renderItem = (item) => <SingleItem item={item}/>;

    getItemKey = (item) => item;

    render(){
       if(SearchField.state.searchedHasBeenClicked){
           return(
               <FlatList
                   data={this.state.itemDatabase}
                   renderItem={this.renderItem}
                   keyExtractor={this.getItemKey}
               />
           )
       }else{
           <View>
               <Text>
                   Nic tu nie ma, bo byc nie powinno.
               </Text>
           </View>
       }
    }




}