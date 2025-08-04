import { DynamicModule, Global, Module } from "@nestjs/common";
import { join } from "path";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { EmailService } from "./services";
import { configuration } from "../../configs";

@Global()
@Module({})
export class EmailModule {
    static forRoot(templateDir: string): DynamicModule {
        return {
            module: EmailModule,
            imports: [
                MailerModule.forRoot({
                    transport: configuration().smtp,
                    defaults: {
                        from: `"eLMS" <${configuration().smtp.from}>`,
                    },
                    preview: true,
                    template: {
                        dir: join(process.cwd(), templateDir, "pages"),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                    options: {
                        partials: {
                            dir: join(process.cwd(), templateDir, "partials"),
                            options: {
                                strict: true,
                            },
                        },
                    },
                }),
            ],
            providers: [EmailService],
            exports: [EmailService],
        };
    }
}
