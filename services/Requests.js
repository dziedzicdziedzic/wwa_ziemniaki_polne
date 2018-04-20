import axios from 'axios';
import Config from '../config'
class Requests {

    constructor(){
        this.pageToken = null;
        this.pageLimit = 1;
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
        console.log('https://allegroapi.io/offers?phrase='+text+'&sort=+price&country.code=PL&limit='+this.pageLimit);
        axios.get('https://allegroapi.io/offers?phrase='+text+'&sort=+price&country.code=PL&limit='+this.pageLimit, config)
            .then((response) => {
            this.setPageToken(response.data.pageToken.next);
            console.log(response.data.pageToken.next);
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