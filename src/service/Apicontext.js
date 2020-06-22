import axios from 'axios';
class Api{
    apiurl = 'https://hn.algolia.com/api/v1/search?page=';

    getRecords(index){
       return axios.get("https://hn.algolia.com/api/v1/search?page=" + index);
    }
}
const ApiContext= new Api();
export default  ApiContext;