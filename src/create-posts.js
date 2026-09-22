import { proxy, snapshot } from 'valtio';
import { uniqueId } from 'lodash';

export default async (state, parsedData) => {
    const items = parsedData.querySelectorAll("item");
    //console.log(items)
    const posts = state.data.posts;
    const feeds = state.data.feeds;
    const snapFeeds = snapshot(feeds);
    items.forEach((item) => {
        const title = item.querySelector("title").innerHTML;
        //console.log(title)
        const snapPosts = snapshot(posts);
        const clearTitle = title.replace(/<!\[CDATA\[|\]\]>/g, '');
        const description = item.querySelector("description").innerHTML;
        const clearDescription = description.replace(/<!\[CDATA\[|\]\]>/g, '');
        const link = item.querySelector("guid").innerHTML;
        const matchedFeed = snapFeeds.find((feed) => state.currentFeed.link === feed.link);
        const post = {
            id: uniqueId(),
            feedId: matchedFeed.id,
            title: clearTitle,
            description: clearDescription,
            link: link,
        }
        const currPostsLinks = snapPosts.map((post) => post.link);
        if (!currPostsLinks.includes(post.link)) {
            posts.push(post);
        }
    });
}