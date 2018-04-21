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
                        style={styles.mainImage}
                        source={{ uri: this.props.item.images[0].url }}
                    />
                </View>
                <Text style={styles.itemName}>
                    Jestem nazwa przedmiotu /*tutaj trzeba wstawic nazwe z propsow*/
                    {this.props.item.name}
                </Text>
                {/*<Text style={styles.itemName}>
                    informuje o stanie /*tutaj trzeba wstawic stan z propsow*/
                    /*{{this.props.item.state}}
                </Text>*/}
                <Text style={styles.itemName}>
                    informuję o cenie /*tutaj trzeba wstawic cene z propsow*/
                    {this.props.item.prices.buyNow.amount}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    itemContainer: {
        width: 50,
        height: 50,
        backgroundColor: 'grey',
        flexDirection: 'row'
    },
    mainImage:{
        flex: 2,
    },
    itemName: {
        flex: 7,
        backgroundColor: 'blue'
    }
});