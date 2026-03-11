import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 1. 创建分类树
    const techCategory = await prisma.category.create({
        data: {
            name: '科技前沿',
            children: {
                create: [
                    { name: 'AI纪元' },
                    { name: '量子计算' }
                ]
            }
        }
    });

    const lifeCategory = await prisma.category.create({
        data: { name: '数字生活' }
    });

    // 2. 创建一条超级管理员记录以便关联文章
    const admin = await prisma.user.upsert({
        where: { email: 'admin@explore.cnt' },
        update: {},
        create: {
            email: 'admin@explore.cnt',
            name: '系统主脑',
            password: 'encrypted_password_here' // 仅作示例
        }
    });

    // 3. 发布一些酷炫的初始头条新闻
    await prisma.post.create({
        data: {
            title: '探索未知宇宙的边界与黑洞奥秘',
            content: '# 黑洞的边缘\n\n这是一篇由 AI 自动生成并同步到全端生态的种子数据文章。',
            summary: '全端生态的种子数据展示。',
            coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop',
            isDraft: false,
            categoryId: techCategory.id,
            authorId: admin.id
        }
    });

    await prisma.post.create({
        data: {
            title: '2026年人类数字生活的无缝跨域连接',
            content: '前端 Admin，后端 NestJS，外加 C端 H5 已经完全交织在一起了。',
            summary: '前端后台管理已经可以随时发布这篇文章。',
            coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
            isDraft: false,
            categoryId: lifeCategory.id,
            authorId: admin.id
        }
    });

    console.log('🌱 初始宇宙级种子数据撒播完成！');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
