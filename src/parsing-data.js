import createFeeds from './create-feeds.js';
import createPosts from './create-posts.js';

export default (state, data) => {
    const parser = new DOMParser();
    const ty = parser.parseFromString(data, "text/html");
    //const title = ty.title;
    //const description = ty.querySelector("description").innerHTML;
    //const items = ty.querySelectorAll("item").innerHTML;
    //console.log(items);
    //return ty;
    createFeeds(state, ty);
    createPosts(state, ty);
}