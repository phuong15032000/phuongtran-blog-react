import axios from "axios";
import http from "../http-common";
import authHeader from "../services/auth-header"
const API_URL = 'http://localhost:8080/api';
class BlogDataService {
  getAllPost(){
    return axios.get(API_URL + `/posts`, { headers: authHeader() })
  }
  getSocialPost() {
    return axios.get(API_URL + `/posts/1`, { headers: authHeader() })
  }
  getSportPost() {
    return axios.get(API_URL + `/posts/2`, { headers: authHeader() })
  }
  getTechnologyPost() {
    return axios.get(API_URL + `/posts/3`, { headers: authHeader() })
  }
  getPostById(id) {
    return http.get(`/posts/post?id=` + id, { headers: authHeader() })
  }
  getListPostByUserId(id) {
    return axios.get(API_URL + `/posts/userId?id=` + id, { headers: authHeader() })
  }
  getListCategory() {
    return axios.get(API_URL + `/categories`, { headers: authHeader() })
  }
  createPost(post) {
    return axios.post(API_URL + "/posts",post, { headers: authHeader() })
  }
  editPost(id, post){
    return axios.put(API_URL+"/posts/edit/"+id, post, { headers: authHeader() })
  }
  getPostByTag(nametag){
    return axios.get(API_URL + `/posts/tag?nameTag=` + nametag, { headers: authHeader() })
  }
}

export default new BlogDataService();