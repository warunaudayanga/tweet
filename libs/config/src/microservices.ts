// import { Transport } from "@nestjs/microservices";
//
// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const microservices = () => ({
//     commands: {
//         CREATE: "create",
//         GET: "get",
//         GET_ONE: "get_one",
//         GET_MANY: "get_many",
//         GET_ALL: "get_all",
//         UPDATE: "update",
//         DELETE: "delete",
//         DELETE_ONE: "delete_one",
//     },
//     tweet: {
//         name: "TWEET_SERVICE",
//         transport: Transport.TCP,
//         options: {
//             host: "127.0.0.1",
//             port: 3001,
//         },
//         commands: {
//             GET_TWEETS: "get_tweets",
//             CREATE_TWEET: "create_tweet",
//         },
//     } as const,
//     user: {
//         name: "USER_SERVICE",
//         transport: Transport.TCP,
//         options: {
//             host: "127.0.0.1",
//             port: 3002,
//         },
//         commands: {
//             GET_USER: "get_user",
//             GET_ALL_USERS: "get_all_users",
//             UPDATE_USER: "update_user",
//             DELETE_USER: "delete_user",
//         },
//     } as const,
// });
