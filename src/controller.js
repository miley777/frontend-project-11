import parsingData from './parsing-data.js';
import refreshData from './refresh-data.js';
import { state } from './store.js';

export default  async (link, urlList) => {
   
    setTimeout(refreshData, 5000, urlList, state);

    try { 
        
        const response = await fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`);

        if (!response.ok) {
            throw new Error('errors.networkError')
        }
        const data = await response.json();

        const postsAndFeeds = data.contents
        parsingData(state, postsAndFeeds, urlList, link);
    
    } catch (error) {
        return error.message;    
    }

};