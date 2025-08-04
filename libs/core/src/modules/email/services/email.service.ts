import { HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { PasswordResetMailContext, VerificationMailContext, WelcomeMailContext } from "../contexts";
import { Errors } from "../../../responses";
import { configuration } from "../../../configs";

@Injectable()
export class EmailService {
    constructor(private readonly mailService: MailerService) {}

    // noinspection JSUnusedGlobalSymbols
    async sendWelcomeMail(email: string, context: WelcomeMailContext): Promise<boolean> {
        try {
            await this.mailService.sendMail({
                to: email,
                subject: "Subject: Welcome to Heaven",
                template: "account-welcome",
                context,
            });
            return true;
        } catch {
            throw new InternalServerErrorException();
        }
    }

    async sendVerificationEmail(email: string, ctx: VerificationMailContext): Promise<boolean> {
        if (!configuration().app.emailVerifyRedirectUrl) {
            throw Errors.internal("Email verification redirect URL is not set.");
        }

        try {
            await this.mailService.sendMail({
                to: email,
                subject: "Subject: Verify your email",
                template: "account-verification",
                context: {
                    ...ctx,
                    email,
                    verificationLink: configuration().app.emailVerifyRedirectUrl,
                },
            });
            return true;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            Logger.error(error, this.constructor.name);
            throw Errors.internal("There was an error sending the email.");
        }
    }

    async sendPasswordResetEmail(email: string, ctx: PasswordResetMailContext): Promise<boolean> {
        if (!configuration().app.passwordResetUrl) {
            throw Errors.internal("Password reset redirect URL is not set.");
        }

        try {
            await this.mailService.sendMail({
                to: email,
                subject: "Subject: Password Reset",
                template: "password-reset",
                context: {
                    ...ctx,
                    resetLink: configuration().app.passwordResetUrl,
                },
            });
            return true;
        } catch {
            throw new InternalServerErrorException();
        }
    }
}
