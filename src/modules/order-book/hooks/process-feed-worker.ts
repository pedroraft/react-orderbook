import {
  FeedMap,
  FeedStorage,
  FeedType,
  OrderBookFeed,
  OrderBookFeedMap,
} from "../order-book";

export const processFeed = async ({
  feedStorage,
  tick,
}: {
  feedStorage: FeedStorage;
  tick: number;
}): Promise<OrderBookFeedMap> => {
  const groupBy = (feed: FeedMap) =>
    Object.keys(feed)?.reduce((acc, key) => {
      const price = +key;
      const nearestNeighbor = Math.floor(price / tick) * tick;
      return Object.assign(acc, {
        [nearestNeighbor]: feed[price] + (acc[nearestNeighbor] || 0),
      });
    }, {} as FeedMap);

  const processFeedMapToFeedArray = ({
    feedMap,
    type,
  }: {
    feedMap?: FeedMap;
    type: FeedType;
  }): OrderBookFeed[] => {
    if (!feedMap) return [];
    // To array, then sort, and calculate total size
    return Object.keys(feedMap)
      .map((key) => {
        return { price: +key, size: feedMap[+key], total: 0 };
      })
      .sort((a, b) => {
        if (type === "bid") return a.price - b.price;
        return b.price - a.price;
      })
      .reduce((acc, item, index) => {
        const total = (acc[index - 1]?.total || 0) + item.size;
        return [
          ...acc,
          {
            ...item,
            total,
          },
        ];
      }, [] as OrderBookFeed[]);
  };

  const feedMapGrouped = {
    asks: groupBy(feedStorage.asks),
    bids: groupBy(feedStorage.bids),
  };
  const feedMapArray = {
    asks: processFeedMapToFeedArray({
      type: "ask",
      feedMap: feedMapGrouped.asks,
    }),
    bids: processFeedMapToFeedArray({
      type: "bid",
      feedMap: feedMapGrouped.bids,
    }),
  };

  const priceArr = feedMapArray.asks
    .concat(feedMapArray.bids)
    .map(({ price }) => price);
  const maxPrice = Math.max(...priceArr);
  const minPrice = Math.min(...priceArr);
  const combinedSizeAsks =
    feedMapArray.asks[feedMapArray.asks.length - 1]?.total;
  const combinedSizeBids =
    feedMapArray.bids[feedMapArray.bids.length - 1]?.total;
  const maxSize = Math.max(combinedSizeAsks, combinedSizeBids);

  const getChartPropsFromFeed = (feed: OrderBookFeed[]) =>
    feed.map((item) => ({
      ...item,
      pricePercent: ((item.price - minPrice) / (maxPrice - minPrice)) * 100,
      sizePercent: (item.size / maxSize) * 100,
    }));

  return {
    asks: getChartPropsFromFeed(feedMapArray.asks),
    bids: getChartPropsFromFeed(feedMapArray.bids),
  };
};
