import axios from "axios";

const Nasa_api_KEY = 'jNuLFxcuwbmygtJAqyDYaRag3bqaPTLfkNWM9YHV';

export const Get_APOD = (count=18)=>{
   const url =  `https://api.nasa.gov/planetary/apod`;
  return axios.get(url,{
      params:{
         api_key:Nasa_api_KEY,
         count:count,
      }
   })
}
export const Get_MARS = (sol="1000",page=1)=>{
   const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`;
   return axios.get(url,{
      params:{
         api_key:Nasa_api_KEY,
         sol:sol,
         page:page
      }
   });
}
export const Get_EARTH = (count = 18, width = 500, height = 400) => {
   const images = [];
 
   for (let i = 0; i < count; i++) {
     const seed = Math.random().toString(36).substring(2, 10); // تولید seed تصادفی
     const url = `https://picsum.photos/seed/${seed}/${width}/${height}`;
 
     images.push({
       id: seed,
       url,
     });
   }
 
   return images;
 };
 