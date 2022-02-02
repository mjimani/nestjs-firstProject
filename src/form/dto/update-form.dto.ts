enum Type {
  A = 'A',
  B = 'B',
  C = 'C'
}

export class UpdateFormDto {
  title: string;
  type: Type;
}