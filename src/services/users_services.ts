import { api } from '@/plugins/index'
import { LoginApiData } from '@/models'
import Vue from 'vue'

export async function login(data: LoginApiData) {
    try {
        var response = await api.post(`auth/login/`, data)
        if(response.status == 200){
            Vue.notify({ group: 'rdepot', 
            text: 'successfully logged in',
            type: 'success'})
        }
        return response
    } catch (error) {
        console.log(error)
        Vue.notify({ group: 'rdepot', 
        text: 'Wrong credential data, please try again',
        type: 'warn'})
        return error
    }
}