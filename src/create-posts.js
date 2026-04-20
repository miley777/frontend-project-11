import { proxy, useSnapshot } from 'valtio';
import { uniqueId } from 'lodash';

export default (state, data) => {
    //console.log(typeof data);
    const parser = new DOMParser();
    const ty = parser.parseFromString(data, "text/html");
    //console.log(ty.contentType);innerHTML
    
    //console.log(ty.title);
    //console.log(ty.querySelector("description").innerHTML);
    const title = ty.title;
    const description = ty.querySelector("description").innerHTML;
    let id = 0;
    //const feeds = [];feeds,
    //const posts = [];
    //createPosts(stateData, posts, title, description);
    createFeeds(state, title, description);
    //console.log(ty);
}

const createFeeds = (state, title, description) => {
    //console.log("title", title);feeds,
    //console.log("description", description);
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
    console.log(feeds);
    //if (title) state.data.
    //const titl = 
}

//const createPosts = (state, posts, title, description) => {
 //  
//}