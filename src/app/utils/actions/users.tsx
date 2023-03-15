import api from '../api'

export async function getUsersData() {
    const { data } = await api.get('players',{})
    let players = data.players
    players = players.filter((obj: any) => obj.hasOwnProperty('username'));
    return players
}

export async function getUserBattlesData(username: string) {
    const { data } = await api.get(`battle_logs/${username}`,{})
    return data
}


export async function getUserData(username: string) {
    const { data } = await api.get(`player/${username}`,{})
    return data
}




