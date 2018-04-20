import axios from 'axios';
import Config from '../config'
export default class Requests {


    static searchRequest(text){

        console.log(text);
        console.log('https://api.github.com/users/'+text);
        axios.get('https://api.github.com/users/'+text)
            .then(function(response){
                console.log(response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
            });
    }
 }