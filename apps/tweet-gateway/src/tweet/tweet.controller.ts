import { Controller, Get, Post, Body } from "@nestjs/common";
import { TweetClientService } from "./tweet-client.service";

@Controller("tweet")
export class TweetController {
    constructor(private readonly tweetService: TweetClientService) {}

    @Get()
    getAllTweets(): Promise<string[]> {
        return this.tweetService.getTweets();
    }

    @Post()
    createTweet(@Body() dto: object): Promise<string> {
        return this.tweetService.createTweet(dto);
    }
}
