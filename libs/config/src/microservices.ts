import { Transport } from "@nestjs/microservices";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const microservices = () => ({
    tweet: {
        name: "TWEET_SERVICE",
        transport: Transport.TCP,
        options: {
            host: "127.0.0.1",
            port: 3001,
        },
        commands: {
            GET_TWEETS: "get_tweets",
            CREATE_TWEET: "create_tweet",
        },
    } as const,
});
