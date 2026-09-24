import createFeeds from './create-feeds.js';
import createPosts from './create-posts.js';

export default (state, data, urlList, link) => {
    const parser = new DOMParser();
    const parsedData = parser.parseFromString(data, "application/xml");
    const parserError = parsedData.querySelector("parsererror");
    if (parserError) {
        state.form.errors = { success: false, message: `errors.validation.matches` };
        state.form.processState = 'error';
        console.error('XML parse error:', parserError)
    } else {
        const rootTag = parsedData.documentElement.tagName;
        const isRSS = rootTag === 'rss' || rootTag === 'feed';
        if (isRSS) {
            try {
                createFeeds(state, parsedData);
                createPosts(state, parsedData);
                if (!urlList.includes(link)) {
                    urlList.push(link);
                }
            } catch (error) {
                return error.message;
            }
        } 
    }
}