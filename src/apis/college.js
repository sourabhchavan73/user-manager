import axios from 'axios';

export default axios.create({
    baseURL: `http://universities.hipolabs.com/search?`
}); 