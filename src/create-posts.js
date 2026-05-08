import { proxy, snapshot } from 'valtio';
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

    state.currentFeed = state.currentFeed !== feed ? feed : state.currentFeed;

    console.log(feed);
    const snapCurrentFeeds = snapshot(state.currentFeed);
    console.log(snapCurrentFeeds);
    const snapFeeds = snapshot(state.data.feeds);
    console.log(snapFeeds);
}

//const createPosts = (state, posts, title, description) => {
 //  
//}