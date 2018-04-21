import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Linking} from 'react-native';



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
    handleClick = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    render(){
            if (typeof this.props.item.item.prices.buyNow !== 'undefined'){
            return(<TouchableOpacity onPress={()=>this.handleClick(this.props.item.item.url)} style={styles.itemContainer}>
                    <View>
                        <Image
                            style={styles.itemImage}
                            source={{uri: this.props.item.item.images[0].url}}
                        />
                    </View>

                    <Text  numberOfLines={1} style={styles.itemName}>
                        {this.props.item.item.name}
                    </Text>
                    <Text style={styles.itemPrice}>
                        {this.props.item.item.prices.buyNow.amount}
                    </Text>
                </TouchableOpacity>);
            }else {return null;}

    }

}

const styles = StyleSheet.create({
    itemContainer: {
        height: 60,
        display: 'flex',
        borderRadius: 10,
        backgroundColor: '#c06614',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'stretch',
        marginTop: 5,
        width: 340,
        opacity: 0.95,
    },
    itemImage:{
        width:60,
        height:60,
    },
    itemName: {
        height:60,
        lineHeight: 60,
        flex:1,

        backgroundColor:'white',
    },
    itemPrice:{
        lineHeight: 60,
        fontSize: 22,
        backgroundColor:'white',
        paddingLeft: 10,
        paddingRight: 10,
    }

});