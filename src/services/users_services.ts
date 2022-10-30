import { api } from '@/plugins/index'
import { LoginApiData } from '@/models'

export async function login(data: LoginApiData) {
    try {
        var response = await api.post(`auth/login/`, data)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}