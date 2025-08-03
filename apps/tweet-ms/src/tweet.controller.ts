import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { TweetService } from "./tweet.service";
import { microservices } from "@tweet/config";

const { GET_TWEETS, CREATE_TWEET } = microservices().tweet.commands;

@Controller()
export class TweetController {
    constructor(private readonly tweetService: TweetService) {}

    @MessagePattern({ cmd: GET_TWEETS })
    getTweets(): Promise<string[]> {
        return this.tweetService.getTweets();
    }

    @MessagePattern({ cmd: CREATE_TWEET })
    createTweet(content: string): Promise<string> {
        return this.tweetService.createTweet(content);
    }
}
