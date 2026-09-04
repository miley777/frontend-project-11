import createFeeds from './create-feeds.js';
import createPosts from './create-posts.js';

export default (state, data) => {
    const RSSTest = /<rss\b|<feed\b|<channel\b|<item\b/i.test(data)
    //console.log(RSSTest)
    if (RSSTest) {
        const parser = new DOMParser();
        const ty = parser.parseFromString(data, "text/html");
        createFeeds(state, ty);
        createPosts(state, ty);
    } else {
        state.form.errors = { success: false, message: `errors.validation.matches` };
    }
    
}