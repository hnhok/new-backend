import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAll(
        @Query('q') q?: string,
        @Query('isDraft') isDraftStr?: string
    ) {
        let isDraft: boolean | undefined = undefined;
        if (isDraftStr === 'true') isDraft = true;
        if (isDraftStr === 'false') isDraft = false;

        return this.postsService.findAll(q, isDraft);
    }

    @Post()
    create(@Body() createPostDto: any) {
        return this.postsService.create(createPostDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: any) {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.remove(id);
    }
}
