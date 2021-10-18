export class NewTask {
  title: string;
  subject: string;
  body: string;
  tags: string[];
  answers: string[];

  constructor() {
    this.title = '';
    this.subject = '';
    this.body = '';
    this.tags = [];
    this.answers = [];
  }
}
