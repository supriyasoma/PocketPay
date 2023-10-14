import { User } from '../models/user';
import { API_CURRENCIES } from '../utils/constants';
import API from './API';
import Axios from "axios";
const MOCK_URL = "https://bc94mockserver.zemoso.tk";

export const getMyData = async (url: string) => {
  if(url == "countries"){
    return Axios.get(MOCK_URL+`/${url}`);
  }
  if(url == "banks"){
    return Axios.get(MOCK_URL+`/${url}`);
  }
  else{
    return await API.get(`/${url}`);
  }
};
export const postMyData = async (url: string, data: any) => {
  return await API.post(`/${url}`, data);
};

export const getMyDataById = async (url: string, id: number) => {
  return await API.get(`/${url}/${id}`);
};
export const patchMyDataById = async (url: string, data: any) => {
  return await API.patch(`/${url}`, data);
};

export const getLoggedInUser = async (url: string,email:string) => {
  return await API.get(`/${url}?email=${email}`);
};

export const getCurrenciesAPI = (from?:string)=>{
    return Axios.get(
        API_CURRENCIES+`/${from}.json`
      ).then((res:any) => {
        if(res.status == 200){ return res?.data}
      });
}

export const signup = async (data:User) => {
  return await API.post(`user/signup`,data);
};

export const getBusinessList = async () => {
  return await API.get(`businessnames`);
};

export const getBusinessDetails = async (id?:number) => {
  return await API.get(`business/`+id);
};

export const getCategories = async () => {
  return await API.get(`categories`);
};

export const getSubCategories = async () => {
  return await API.get(`subCategories`);
};

export const login = async(data:any)=>{
  return await API.post(`auth/signin`,data);

}



