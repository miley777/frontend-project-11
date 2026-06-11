import { proxy, snapshot } from 'valtio';
import { uniqueId } from 'lodash';
//import parsingData from './parsing-data.js'

export default (state, parsedData) => {

    const title = parsedData.title;
    const description = parsedData.querySelector("description").innerHTML;
    //const feeds = state.data.feeds;
    const clearTitle = title.replace(/<!\[CDATA\[|\]\]>/g, '');
    const clearDescription = description.replace(/<!--\[CDATA\[|\]\]-->/g, '');
    const link = parsedData.link;
    //console.log("clearTitle", clearTitle);
    //console.log("clearDescription", clearDescription);
    
    const feed = {
        id: uniqueId(),
        title : clearTitle,
        description: clearDescription,
        parsedData: link,
    }

    const feeds = state.data.feeds;
    const snapFeeds = snapshot(feeds);
    const currFeedsLinks = snapFeeds.filter((feed) => feed.link);

   // console.log(!currFeedsLinks.includes(feed.link))
    //console.log(currFeedsLinks)
    //console.log(feed.link)
        if (!currFeedsLinks.includes(feeds.link)) {
            feeds.push(feed);
        }
    

    state.currentFeed = state.currentFeed !== feed ? feed : state.currentFeed;

    //console.log(feed);
    const snapCurrentFeeds = snapshot(state.currentFeed);
    //console.log(snapCurrentFeeds);
    //const snapFeeds = snapshot(state.data.feeds);
    //console.log(snapFeeds);
}