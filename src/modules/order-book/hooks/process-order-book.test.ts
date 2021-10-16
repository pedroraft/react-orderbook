import { processFeed } from "./process-feed-worker";
import { mergeRawFeedToFeedMap } from "./process-order-book";
import {
  feedMapMockData,
  incomingMessagesMockData,
  orderBookMockData,
} from "./order-book.mock";

it("merge order book WS messages to local state", () => {
  expect(
    mergeRawFeedToFeedMap({ incomingMessages: incomingMessagesMockData })
  ).toStrictEqual(feedMapMockData);
});

it("order book feed processor", async () => {
  await expect(
    processFeed({
      tick: 0.5,
      feedStorage: feedMapMockData,
    })
  ).resolves.toStrictEqual(orderBookMockData);
});
