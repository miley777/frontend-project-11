import { proxy, useSnapshot } from 'valtio';
import { uniqueId } from 'lodash';

export default (state, data) => {
    const parser = new DOMParser();
    const ty = parser.parseFromString(data, "text/html");
    const title = ty.title;
    const description = ty.querySelector("description").innerHTML;
    let id = 0;
    createFeeds(state, title, description);
}

const createFeeds = (state, title, description) => {
    const feeds = state.data.feeds;
    const clearTitle = title.replace(/<!\[CDATA\[|\]\]>/g, '');
    const clearDescription = description.replace(/<!--\[CDATA\[|\]\]-->/g, '');
    console.log("clearTitle", clearTitle);
    console.log("clearDescription", clearDescription);
    
    const feed = {
        id: uniqueId(),
        title : clearTitle,
        description: clearDescription,
    }
    feeds.push(feed);

    console.log(feed);
    const snapFeeds = snapshot(feeds);
    console.log(snapFeeds);
}

//const createPosts = (state, posts, title, description) => {
 //  
//}