import {
  FeedMap,
  FeedStorage,
  RawFeed,
  RawOrderBookMessage,
} from "../order-book";

export const mergeRawFeedToFeedMap = ({
  incomingMessages,
  currentFeedStorage,
}: {
  incomingMessages: RawOrderBookMessage[];
  currentFeedStorage?: FeedStorage;
}): FeedStorage => {
  const asksRaw = incomingMessages.flatMap((m) => m?.asks);
  const bidsRaw = incomingMessages.flatMap((m) => m?.bids);
  const processFeed = (incomingRawFeed: RawFeed, currentFeedMap?: FeedMap) =>
    (incomingRawFeed || [])?.reduce((acc, current) => {
      if (!current) return acc;
      const price = current[0];
      const size = current[1];
      // remove when returned size is 0
      if (!size || !price) {
        delete acc[price];
        return acc;
      }
      return {
        ...acc,
        [price]: size,
      };
    }, currentFeedMap || {});

  return {
    asks: processFeed(asksRaw, currentFeedStorage?.asks),
    bids: processFeed(bidsRaw, currentFeedStorage?.bids),
  };
};
