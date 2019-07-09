import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class MembersService{

    constructor(){}


    getMembers() {
        const url = `${API_URL}/api/members/`;
        return axios.get(url).then(response => response.data);
    }  
    getMembersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getMember(pk) {
        const url = `${API_URL}/api/members/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteMember(member){
        const url = `${API_URL}/api/members/${member.pk}`;
        return axios.delete(url);
    }
    createMember(member){
        const url = `${API_URL}/api/members/`;
        return axios.post(url,member);
    }
    updateMember(member){
        const url = `${API_URL}/api/members/${member.pk}`;
        return axios.put(url,member);
    }
}