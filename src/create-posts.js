import { proxy, snapshot } from 'valtio';
import { uniqueId } from 'lodash';
//import parsingData from './parsing-data.js'

export default async (state, parsedData) => {
    const items = parsedData.querySelectorAll("item");
    const posts = state.data.posts;
    const feeds = state.data.feeds;
    const snapFeeds = snapshot(feeds);
    //const feedsLinks = snapFeeds.map((feed) => feed.link);
    items.forEach((item) => {
        const title = item.querySelector("title").innerHTML;
        const snapPosts = snapshot(posts);
        const clearTitle = title.replace(/&lt;!\[CDATA\[|\]\]&gt;/g, '');
        const link = item.querySelector("guid").innerHTML;
        //console.log(snapFeeds);
        const matchedFeed = snapFeeds.find((feed) => state.currentFeed.link === feed.link)
        //console.log(matchedFeed);
        const thisFeedId = matchedFeed.id;
        const post = {
            id: uniqueId(),
            feedId: thisFeedId,
            title: clearTitle,
            link: link,
        }
        const currPostsLinks = snapPosts.map((post) => post.link);
        if (!currPostsLinks.includes(post.link)) {
            posts.push(post);
        }
    });
    const snapPosts = snapshot(state.data.posts);
    console.log(snapPosts);
}