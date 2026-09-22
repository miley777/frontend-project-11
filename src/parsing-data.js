import createFeeds from './create-feeds.js';
import createPosts from './create-posts.js';

export default (state, data, urlList, link) => {
  //  console.log('start parse')
    const parser = new DOMParser();
    const ty = parser.parseFromString(data, "application/xml");
    const parserError = ty.querySelector("parsererror");
    if (parserError) {
        console.log('else parsing')
        state.form.errors = { success: false, message: `errors.validation.matches` };
        state.form.processState = 'error';
        console.error('XML parse error:', parserError)
    } else {
        const rootTag = ty.documentElement.tagName;
        const isRSS = rootTag === 'rss' || rootTag === 'feed';
        //console.log(isRSS)
        if (isRSS) {
            try {
                createFeeds(state, ty);
                createPosts(state, ty);
                if (!urlList.includes(link)) {
                    urlList.push(link);
                    console.log(urlList);
                }
            } catch (error) {
                console.log('if parsing')
                console.log(error.message)
                return error.message;
            }
        } 
    }
    
    
    

}