import { proxy, snapshot } from 'valtio';
import { uniqueId } from 'lodash';
//import parsingData from './parsing-data.js'

export default async (state, parsedData) => {
    //console.log(parsedData);
    const items = parsedData.querySelectorAll("item");
    //console.log(items);
    const posts = state.data.posts;
    //const rt = await posts
    //console.log(rt)
    //const currPostsLinks = posts.filter((post) => post.link);
    items.forEach((item) => {
        const title = item.querySelector("title").innerHTML;
        //console.log(item.innerHTML);
        const snapPosts = snapshot(posts);
        
        const clearTitle = title.replace(/&lt;!\[CDATA\[|\]\]&gt;/g, '');
        const link = item.querySelector("guid").innerHTML;
        //console.log(link);
        const post = {
            id: uniqueId(),
            feedId: state.currentFeed.id,
            title: clearTitle,
            link: link,
        }
        const currPostsLinks = snapPosts.map((post) => post.link);
        //console.log(!currPostsLinks.includes(post.link))
        //console.log(post.link)
        //console.log(currPostsLinks)
        if (!currPostsLinks.includes(post.link)) {
            posts.push(post);
        }
    });
    //const snapPosts = snapshot(state.data.posts);
    //console.log(snapPosts);
}