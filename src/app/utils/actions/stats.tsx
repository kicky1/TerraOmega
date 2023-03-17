import api from '../api'

export async function getStatsData() {
    const { data } = await api.get('stats')
    return data
}