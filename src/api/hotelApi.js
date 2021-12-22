import axiosClient  from "./axiosClient";
import {urlApi} from '../const/index'
import axios from "axios";

const hotelApi = {
    getAllHotel(data) {
        const url =  `${urlApi}/hotels`
        return axiosClient.get(url)
    },
   
}
export default hotelApi
