import { Transport } from "@nestjs/microservices";
import { configuration } from "./configuration";

export enum Service {
    USER = "user",
    TWEET = "tweet",
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const microservices = () => ({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    commands: (service: Service) => ({
        CREATE: `create_${service}`,
        GET: `get_${service}`,
        GET_ONE: `get_one_${service}`,
        GET_MANY: `get_many_${service}s`,
        GET_ALL: `get_all_${service}s`,
        UPDATE: `update_${service}`,
        DELETE: `delete_${service}`,
        DELETE_ONE: `delete_one_${service}`,
    }),
    [Service.USER]: {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
            host: configuration().ms.user.host,
            port: configuration().ms.user.port,
        },
        commands: {
            UPDATE_USER: `update_${Service.USER}`,
            DELETE_USER: `delete_${Service.USER}`,
        },
    } as const,
    [Service.TWEET]: {
        name: "TWEET_SERVICE",
        transport: Transport.TCP,
        options: {
            host: configuration().ms.tweet.host,
            port: configuration().ms.tweet.port,
        },
        commands: {
            GET_TWEETS: `get_${Service.TWEET}s`,
            CREATE_TWEET: `create_${Service.TWEET}`,
            UPDATE_TWEET: `update_${Service.TWEET}`,
            DELETE_TWEET: `delete_${Service.TWEET}`,
            TOGGLE_TWEET_LIKE: `toggle_${Service.TWEET}_like`,
            REPLY_TWEET: `reply_${Service.TWEET}`,
            GET_TWEET_REPLIES: `get_${Service.TWEET}_replies`,
            DELETE_TWEET_REPLY: `delete_${Service.TWEET}_reply`,
        },
    } as const,
});
