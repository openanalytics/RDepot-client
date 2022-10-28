import {api} from '../plugins'

export async function fetchRepositoriesServices(){
    var repositories = await api.get('/v2/manager/r/repositories')
    return repositories
}