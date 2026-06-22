import { proxy, snapshot } from 'valtio';
import { uniqueId } from 'lodash';
//import parsingData from './parsing-data.js'

export default (state, parsedData) => {

    const title = parsedData.title;
    const description = parsedData.querySelector("description").innerHTML;
    const clearTitle = title.replace(/<!\[CDATA\[|\]\]>/g, '');
    const clearDescription = description.replace(/<!--\[CDATA\[|\]\]-->/g, '');
    //const link = parsedData.link;
    const link = parsedData.querySelector("link").nextSibling.textContent;
    //console.log(link)
    const feed = {
        id: uniqueId(),
        title : clearTitle,
        description: clearDescription,
        link: link,
    }

    const feeds = state.data.feeds;
    const snapFeeds = snapshot(feeds);
    const currFeedsLinks = snapFeeds.map((feed) => feed.link);
    //console.log(currFeedsLinks)
    //console.log(feed.link)
    //console.log(!currFeedsLinks.includes(feed.link))
        if (!currFeedsLinks.includes(feed.link)) {
            feeds.push(feed);
        }
    

   state.currentFeed = feed;
}