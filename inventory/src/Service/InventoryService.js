import axios from 'axios';
const GET_PACKAGE_API_BASE_URL = "http://localhost:9876/";
class InventoryService {

addItem(invent){
   console.log(invent);
   return axios.post(GET_PACKAGE_API_BASE_URL+"add",invent); 
}



}
export default InventoryService;