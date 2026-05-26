import { proxy, snapshot } from 'valtio';
import { uniqueId } from 'lodash';

export default (state, data) => {
    const parser = new DOMParser();
    const ty = parser.parseFromString(data, "text/html");
    //const title = ty.title;
    //const description = ty.querySelector("description").innerHTML;
    //const items = ty.querySelectorAll("item").innerHTML;
    //console.log(items);
    createFeeds(state, ty);
    createPosts(state, ty);
}

const createFeeds = (state, parsedData) => {
    const title = parsedData.title;
    const description = parsedData.querySelector("description").innerHTML;
    const feeds = state.data.feeds;
    const clearTitle = title.replace(/<!\[CDATA\[|\]\]>/g, '');
    const clearDescription = description.replace(/<!--\[CDATA\[|\]\]-->/g, '');
    //console.log("clearTitle", clearTitle);
    //console.log("clearDescription", clearDescription);
    
    const feed = {
        id: uniqueId(),
        title : clearTitle,
        description: clearDescription,
    }
    feeds.push(feed);

    state.currentFeed = state.currentFeed !== feed ? feed : state.currentFeed;

    //console.log(feed);
    const snapCurrentFeeds = snapshot(state.currentFeed);
    //console.log(snapCurrentFeeds);
    const snapFeeds = snapshot(state.data.feeds);
    //console.log(snapFeeds);
}

const createPosts = (state, parsedData) => {
    //console.log(parsedData);
    const items = parsedData.querySelectorAll("item");
    //console.log(items);
    const posts = state.data.posts;
    items.forEach((item) => {
        const title = item.querySelector("title").innerHTML;
        //console.log(item.innerHTML);
        const clearTitle = title.replace(/&lt;!\[CDATA\[|\]\]&gt;/g, '');
        const link = item.querySelector("guid").innerHTML;
        //console.log(link);
        const post = {
            id: uniqueId(),
            feedId: state.currentFeed.id,
            title: clearTitle,
            link: link,
        }
        posts.push(post);
    });
    const snapPosts = snapshot(state.data.posts);
    //console.log(snapPosts);
}