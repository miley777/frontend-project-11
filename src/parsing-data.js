import createFeeds from './create-feeds.js';
import createPosts from './create-posts.js';

export default async (state, data, urlList, link) => {
    const RSSTest = /<rss\b|<feed\b|<channel\b|<item\b/i.test(data)
    console.log(RSSTest)
    if (RSSTest) {
        try {
            const parser = new DOMParser();
            const ty = parser.parseFromString(data, "text/html");
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
    } else {
        console.log('else parsing')
        state.form.errors = { success: false, message: `errors.validation.matches` };
    }
    
}