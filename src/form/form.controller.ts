import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {
  }

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.formService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(+id, updateFormDto);
  }

  @Patch('post/:postId')
  updatePost(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto) {
    return this.formService.updatePost(+postId, updatePostDto);
  }

  @Delete('post/:postId')
  removePost(@Param('postId') postId: string) {
    return this.formService.removePost(+postId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(+id);
  }
}
