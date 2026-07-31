import createFeeds from './create-feeds.js';
import createPosts from './create-posts.js';

export default (state, data) => {
    const parser = new DOMParser();
    const ty = parser.parseFromString(data, "text/html");
    createFeeds(state, ty);
    createPosts(state, ty);
}