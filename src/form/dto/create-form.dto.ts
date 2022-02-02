enum Type {
  A = 'A',
  B = 'B',
  C = 'C'
}

class CreatePostDto {
  name: string;
}

export class CreateFormDto {
  title: string;
  type: Type;
  posts: CreatePostDto[];
}
