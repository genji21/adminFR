import axiosClient  from "./axiosClient";
import {urlApi} from '../const/index'
import axios from "axios";

const userApi = {
    register(data) {
        const url =  `${urlApi}/users/register`
        return axiosClient.post(url,data)
    },
    login(data){
        const url = `${urlApi}/users/login`
        return axiosClient.post(url,data)
    },
      getInfor(token){
        const url = `${urlApi}/users/infor`
        return axiosClient.get(url,{headers: {Authorization: token}})
    },
    // for admin
    getAlluser(idAdmin) {
        const url = `${urlApi}/users/getAllUser`
        return axiosClient.post(url,{"user":{"id":idAdmin}})
    },
    // get detail user 
    getUser(idAdmin,idUser){
        const url = `${urlApi}/users/getInforUser`
        return axiosClient.post(url,{"user":{"id":idAdmin},"id":idUser})
    },
    // update User 
    updateUser(idAdmin,idUser,data){
        const url = `${urlApi}/users/updateUser`
        return axiosClient.patch(url,{"user":{"id":idAdmin},"id":idUser,data})
    },
    // delete User
    DeleteUser(idUser){
        const url = `${urlApi}/users/deleteUser/${idUser}`
        return axiosClient.delete(url)
    }
}
export default userApi
