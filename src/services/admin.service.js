import axios from "axios";
import http from "../http-common";
import authHeader from "../services/auth-header"
const API_URL = 'http://localhost:8080/api';
class AdminService {
    getAllPost() {
        return axios.get(API_URL + `/admin/browse`, { headers: authHeader() })
    }
    activePost(id, post) {
        return axios.put(API_URL + "/admin/browse/" + id, post, { headers: authHeader() })
    }
    deletePost(id) {
        return axios.delete(API_URL + "/posts/" + id, { headers: authHeader() })
    }
    inactivePost(id, post) {
        return axios.put(API_URL + "/admin/browse/inactive/" + id, post, { headers: authHeader() })
    }
    getAllCategory() {
        return axios.get(API_URL + "/admin/category", { headers: authHeader() })
    }
    addCategory(category) {
        return axios.post(API_URL + "/admin/category", category, { headers: authHeader() })
    }
    deleteCategoryById(id) {
        return axios.delete(API_URL + "/admin/category/" + id, { headers: authHeader() })
    }
    updateCategory(id, category) {
        return axios.put(API_URL + `/admin/category/` + id, category, { headers: authHeader() })
    }
    getAllUsers() {
        return axios.get(API_URL + "/admin/users", { headers: authHeader() })
    }
    setAdmin(id) {
        return axios.put(API_URL + "/admin/users/setAdmin/" + id, id, { headers: authHeader() })
    }    
    removeAdmin(id) {
        return axios.put(API_URL + "/admin/users/removeAdmin/" + id, id, { headers: authHeader() })
    }
    activeUser(id) {
        return axios.put(API_URL + "/admin/users/active/" + id, id, { headers: authHeader() })
    }    
    inactiveUser(id) {
        return axios.put(API_URL + "/admin/users/inactive/" + id, id, { headers: authHeader() })
    }
}

export default new AdminService();