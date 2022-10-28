import { fetchRepositoriesServices } from "../services";
import { Repository } from "@/models/Repository";
import { State } from '.'
import { ActionContext } from "vuex";

export interface RepositoryState{
    repositories: Repository[]
}

type Context = ActionContext<RepositoryState, State>;

const repositories_state =  {
    state: {
        repositories: []
    } as RepositoryState,
    mutations: {
        setRepositories(state: RepositoryState, payload: Repository[]){
            state.repositories = payload
        }
    },
    actions: {
        async fetchRepositories(context: Context){
            var repositories = await fetchRepositoriesServices()
            context.commit('setRepositories', repositories.data)
        }
    }
}

export default repositories_state;