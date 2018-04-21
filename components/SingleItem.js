import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';



export default class SingleItem extends React.Component {

    /*
    props: item
    wyglad itemu:

    item:{
        image:{
              uri: jakiestam uri musi byc, z tego uri ma sie pobierac obrazek
      }

        name: nazwa itemku
        state: stan -> uzywany lub nowy
        price: no chyba wiadomix
     }

     */

    render(){
        return(
            <View style={styles.itemContainer}>
                <View>
                <Image
                    style={styles.itemImage}
                    source={{uri: this.props.item.item.images[0].url}}
                />
                </View>

                <Text style={styles.itemName}>
                    {this.props.item.item.name}
                </Text>
                <Text>
                    {this.props.item.item.prices.buyNow.amount}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    itemContainer: {
        width:200,
        height: 100,
        display: 'flex',
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    itemImage:{
        width:50,
        height:100,
    },
    itemName: {
        width: 50,
        height:100,
        backgroundColor: 'blue'
    }
});