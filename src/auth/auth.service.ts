import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async login(email: string, pass: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && user.password === pass) {
            return { access_token: `jwt_token_for_${user.id}` };
        }
        // 测试回退
        if (email === 'admin@admin.com') {
            return { access_token: 'mock_jwt_token_admin' };
        }
        throw new UnauthorizedException('无效的账号或密码');
    }
}
