import axios from 'axios';
import redux from 'redux';
import Config from '../config'
import ListOfSearchedItems from '../components/ListOfSearchedItems';
import {PubSub} from 'pubsub-js';


class Requests {

    constructor(){
        this.pageToken = null;
        this.pageLimit = 20;
        this.requestPending = false;
        this.mySubscriber = this.mySubscriber.bind(this);
        this.lastSearchedText = "";
        this.token = PubSub.subscribe("ASK", this.mySubscriber);

    }
    componentWillMount(){
        this.token = PubSub.subscribe("ASK", this.mySubscriber)
    }

    mySubscriber(msg,data){
        //console.log("ask2");
        this.searchMore()
    }

    getPageToken(){
        if (this.pageToken === null){
            return "";
        }else {
            return "&pageToken="+this.pageToken;
        }
    }

    setFlag(flag){
        this.requestPending = flag;
    }

    setPageToken(token){
        this.pageToken = token
    }

    setText(text){
        this.lastSearchedText = text;
    }


    searchAllegroRequest(text){
        var config = {
            headers: {
                'Api-Key': Config.api_key(),
                'User-Agent': Config.user_agent(),
                'Accept': Config.accept(),
            }
        };

        if(!this.requestPending) {
            this.setFlag(true);
            //console.log('https://allegroapi.io/offers?phrase='+text+'&sort=+price&country.code=PL&limit='+this.pageLimit);
            axios.get('https://allegroapi.io/offers?phrase=' + text + '&sort=relevance&country.code=PL&limit=' + this.pageLimit, config)
                .then((response) => {
                    //console.log(response.data.pageToken.next);
                    this.setPageToken(response.data.pageToken.next);
                    this.setText(text);
                    this.setFlag(false);
                    PubSub.publish("RESPONSE", JSON.stringify(response.data.offers));
                }).catch((err)=> {
                this.setFlag(false);
            });
        }
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


    searchMore(text) {
        var config = {
            headers: {
                'Api-Key': Config.api_key(),
                'User-Agent': Config.user_agent(),
                'Accept': Config.accept(),
            }
        };
        if(!this.requestPending) {
            this.setFlag(true);
            //console.log('https://allegroapi.io/offers?phrase=' + this.lastSearchedText + '&sort=relevance&country.code=PL&limit=' + this.pageLimit + this.getPageToken());
            axios.get('https://allegroapi.io/offers?phrase=' + this.lastSearchedText + '&sort=relevance&country.code=PL&limit=' + this.pageLimit + this.getPageToken(), config)
                .then((response) => {
                    //console.log(response.data.pageToken.next);
                    this.setPageToken(response.data.pageToken.next);
                    this.setFlag(false);
                    PubSub.publish("RESPONSE2", JSON.stringify(response.data.offers));
                }).catch((err)=> {
                this.setFlag(false);
            });
        }
    }
 }
 export default new Requests();