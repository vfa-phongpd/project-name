import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'; // You might need to import your JWT service or authentication service here

@Injectable()
export class LoginInterceptor implements NestInterceptor {
    constructor(private jwtService: JwtService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            // Unauthorized
            throw new UnauthorizedException('Missing or invalid token');
        }

        try {
            const decodedToken = this.jwtService.verify(token);
            request.user = decodedToken;
        } catch (error) {
            // Invalid token
            throw new UnauthorizedException('Invalid token');
        }

        return next.handle();
    }
}
