import axios from 'axios';
import redux from 'redux';
import Config from '../config'
import ListOfSearchedItems from '../components/ListOfSearchedItems';
import {PubSub} from 'pubsub-js';


class Requests {

    constructor(){
        this.pageToken = null;
        this.pageLimit = 20;

    }

    getPageToken(){
        if (this.pageToken === null){
            return "";
        }else {
            return "&pageToken="+this.pageToken;
        }
    }

    setPageToken(token){
        this.pageToken = token
    }


    searchAllegroRequest(text){
        var config = {
            headers: {
                'Api-Key': Config.api_key(),
                'User-Agent': Config.user_agent(),
                'Accept': Config.accept(),
            }
        };
        //console.log('https://allegroapi.io/offers?phrase='+text+'&sort=+price&country.code=PL&limit='+this.pageLimit);
        axios.get('https://allegroapi.io/offers?phrase='+text+'&sort=+price&country.code=PL&limit='+this.pageLimit, config)
            .then((response) => {
            this.setPageToken(response.data.pageToken.next);
            console.log(response.data);
            //ListOfSearchedItems.Change(response.data.offers);
            PubSub.publish("RESPONSE",JSON.stringify(response.data.offers));
        });
    }

    searchISBNRequest(text){
        //console.log('https://www.googleapis.com/books/v1/volumes?q=isbn' +text);
        axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn' + text)
            .then((response) =>{
                console.log(response.data);
                console.log(response.data.items[0].volumeInfo.title);
            this.searchAllegroRequest(response.data.items[0].volumeInfo.title);
        })
    }


    searchMore(text){
        var config = {
            headers: {
                'Api-Key': Config.api_key(),
                'User-Agent': Config.user_agent(),
                'Accept': Config.accept(),
            }
        };
        //console.log('https://allegroapi.io/offers?phrase='+text+'&sort=+price&country.code=PL&limit='+this.pageLimit+this.getPageToken());
        axios.get('https://allegroapi.io/offers?phrase='+text+'&sort=+price&country.code=PL&limit='+this.pageLimit+this.getPageToken(), config)
            .then((response) => {
                this.setPageToken(response.data.pageToken.next);
                //console.log(response.data.pageToken.next);
            });
    }
 }
 export default new Requests();