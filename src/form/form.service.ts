import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateFormDto } from './dto/update-form.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class FormService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {
  }

  async create(createFormDto: CreateFormDto) {
    console.log(createFormDto);
    return await this.prismaService.form.create({
      data: {
        title: createFormDto.title,
        type: createFormDto.type,
        posts: {
          create: createFormDto.posts,
        },
      },
      include: {
        posts: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.form.findMany({
      include: {
        posts: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.form.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
  }

  async update(id: number, updateFormDto: UpdateFormDto) {
    return await this.prismaService.form.update({
      where: {
        id,
      },
      data: {
        title: updateFormDto.title,
        type: updateFormDto.type,
      },
      include: {
        posts: true,
      },
    });
  }

  async updatePost(postId: number, updatePostDto: UpdatePostDto) {
    return await this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        name: updatePostDto.name,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.form.delete({
      where: {
        id,
      },
    });
  }

  removePost(formId: number) {

    return this.prismaService.form.delete({
      where: {
        id: formId,
      },
    });
  }
}
