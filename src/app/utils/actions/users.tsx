import api from '../api'

export async function getUsersData() {
    const { data } = await api.get('battle',{})
    let players = data.players
    players = players.filter((obj: any) => obj.hasOwnProperty('username'));
    return players
}


export async function getUserData(username: string) {
    const { data } = await api.get(`player/${username}`,{})
    return data
}




