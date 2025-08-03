import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { microservices } from "@tweet/config";

const { GET_TWEETS, CREATE_TWEET } = microservices().tweet.commands;

@Injectable()
export class TweetClientService {
    constructor(@Inject(microservices().tweet.name) private readonly client: ClientProxy) {}

    getTweets(): Promise<string[]> {
        try {
            return firstValueFrom(this.client.send<string[]>({ cmd: GET_TWEETS }, {}));
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            throw error;
        }
    }

    createTweet(dto: object): Promise<string> {
        return firstValueFrom(this.client.send<string, object>({ cmd: CREATE_TWEET }, dto));
    }
}
