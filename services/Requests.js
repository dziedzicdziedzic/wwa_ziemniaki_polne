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


    searchRequest(text){
        var config = {
            headers: {
                'Api-Key': Config.api_key(),
                'User-Agent': Config.user_agent(),
                'Accept': Config.accept(),
            }
        };
        console.log('https://allegroapi.io/offers?phrase='+text+'&sort=&country.code=PL&limit='+this.pageLimit);
        axios.get('https://allegroapi.io/offers?phrase='+text+'&sort=+date&country.code=PL&limit='+this.pageLimit, config)
            .then((response) => {
            this.setPageToken(response.data.pageToken.next);
            console.log(response.data.pageToken.next);
            //ListOfSearchedItems.Change(response.data.offers);

            PubSub.publish("RESPONSE",JSON.stringify(response.data.offers));


        });
    }


    searchMore(text){
        var config = {
            headers: {
                'Api-Key': Config.api_key(),
                'User-Agent': Config.user_agent(),
                'Accept': Config.accept(),
            }
        };
        console.log('https://allegroapi.io/offers?phrase='+text+'&sort=+price&country.code=PL&limit='+this.pageLimit+this.getPageToken());
        axios.get('https://allegroapi.io/offers?phrase='+text+'&sort=+price&country.code=PL&limit='+this.pageLimit+this.getPageToken(), config)
            .then((response) => {
                this.setPageToken(response.data.pageToken.next);
                console.log(response.data.pageToken.next);


            });
    }
 }
 export default new Requests();