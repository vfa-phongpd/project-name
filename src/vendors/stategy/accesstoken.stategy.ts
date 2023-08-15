import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from "../../modules/auth/auth.service";

@Injectable()

export class AccessTokenStategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.accessToken, // Replace with your actual secret key
        });
    }

    async validate(payload: any) {
        // console.log(payload);

        // const user = await this.authService.validateToken(payload.access_token);
        // if (!user) {
        //     throw new UnauthorizedException();
        // }
        return payload;
    }
}