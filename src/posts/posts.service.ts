import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    async findAll(q?: string, isDraft?: boolean) {
        return this.prisma.post.findMany({
            where: {
                ...(q ? { title: { contains: q } } : {}),
                ...(isDraft !== undefined ? { isDraft } : {}),
            },
            include: { category: true, author: { select: { id: true, name: true, email: true } } }
        });
    }

    async create(data: any) {
        // 强制插入默认 authorId 以供测试
        return this.prisma.post.create({
            data: {
                ...data,
                authorId: data.authorId || 1,
            },
        });
    }

    async update(id: number, data: any) {
        return this.prisma.post.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.post.delete({
            where: { id },
        });
    }
}
