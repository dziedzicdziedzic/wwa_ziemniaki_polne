import React from 'react';
import BarCodeReader from './components/BarCodeReader';
import HomeScreen from "./HomeScreen";
import {StackNavigator} from "react-navigation";

const RootStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        BarCode: {
            screen: BarCodeReader,
        },
    },
    {
        initialRouteName: 'BarCode',
        header: 'none',
        mode: 'modal',
        navigationOptions: {
            header: null,
        },
    }
);

export default class App extends React.Component {
    render() {
        return( <RootStack/>);
    }
}
