import axios from "axios";

const Nasa_api_KEY = 'jNuLFxcuwbmygtJAqyDYaRag3bqaPTLfkNWM9YHV';

export const Get_APOD = (count=10)=>{
   const url =  `https://api.nasa.gov/planetary/apod`;
  return axios.get(url,{
      params:{
         api_key:Nasa_api_KEY,
         count:count,
         thumbs:true
      }
   })
}