import { EachMessagePayload } from "kafkajs";

import isInEnum from "../../util/isInEnum";
import kafka from "../kafka";
import CollaborationTopics from "../topics/collaboration";
import MatchingTopics from "../topics/matching";
import QuestionTopics from "../topics/question";
import { ConsumerFunction } from "./main.interface";
import { matchingCreatedConsumer } from "./matchingCreated";
import { sessionEndConsumer } from "./sessionEnd";

const SubscribedCollaborationTopics: Map<string, ConsumerFunction> = new Map([
  [CollaborationTopics.ENDED, sessionEndConsumer],
]);

const SubscribedMatchingTopics: Map<string, ConsumerFunction> = new Map([
  [MatchingTopics.CREATE, matchingCreatedConsumer],
]);

const consumer = kafka.consumer({ groupId: "question-service" });

const questionEventConsumer = async () => {
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();

  await consumer.subscribe({
    topics: Array.from(SubscribedCollaborationTopics.keys()).concat(
      Array.from(SubscribedMatchingTopics.keys()),
    ),
  });

  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: async ({ topic, message }: EachMessagePayload) => {
      // here, we just log the message to the standard output
      if (
        isInEnum(QuestionTopics, topic) &&
        SubscribedCollaborationTopics.has(topic)
      ) {
        await SubscribedCollaborationTopics.get(topic)!(message);
      }

      if (
        isInEnum(MatchingTopics, topic) &&
        SubscribedMatchingTopics.has(topic)
      ) {
        await SubscribedMatchingTopics.get(topic)!(message);
      }
    },
  });
};

export default questionEventConsumer;
