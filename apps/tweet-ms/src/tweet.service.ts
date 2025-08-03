import { Injectable } from "@nestjs/common";

@Injectable()
export class TweetService {
    getTweets(): Promise<string[]> {
        return Promise.resolve(["oldTweet1:hello", "ondTweet2:there"]);
    }

    createTweet(content: string): Promise<string> {
        return Promise.resolve(`newTweet:${content}`);
    }
}
