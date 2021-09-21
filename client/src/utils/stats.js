import axios from 'axios';

export async function getStats() {
     const res = await axios.get('/api/stats');
     return res.data;
}

export default getStats;
