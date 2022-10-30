import { login } from "@/services";
import { ActionContext } from "vuex";
import { State } from ".";
import { LoginApiData } from "@/models";

export interface UserState{
    userToken: String,
    userName: String
}

type Context = ActionContext<UserState, State>;

const users_state = {
    state: () => ({
        userToken: "",
        userName: ""
    }) as UserState,

    mutations:{
        setUserToken(state: UserState, payload: UserState) {
            state.userToken = payload.userToken
            localStorage.setItem("userToken", payload.userToken.toString())
            localStorage.setItem("userName", payload.userName.toString())
          }
    },

    actions:{
        async login(context: Context, data: LoginApiData) {
            console.log("store", data)
            var response = await login(data)
            context.commit('setUserToken', {username: data.userName, token: response})
        },  
    }
}

export default users_state