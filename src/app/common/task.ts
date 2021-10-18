export class Task {
  title: string;
  subject: string;
  body: string;
  tags: string[];
  rating: number;
  author: string;


  constructor() {
    this.title = '';
    this.subject = '';
    this.body = '';
    this.tags = [];
    this.rating = 0;
    this.author = '';
  }
}
