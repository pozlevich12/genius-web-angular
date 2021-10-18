import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {TaskService} from "../_services/task.service";
import {window} from "rxjs/operators";
import {NewTask} from "../common/new.task";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})


export class TaskAddComponent implements OnInit {

  newTask: NewTask = new NewTask();
  isValid: boolean = false;
  getParams: any;
  answer: any;
  tag: any;

  constructor(private taskService: TaskService, private tokenService: TokenStorageService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.taskService.getAddTaskParam().subscribe(
      data => {
        this.tokenService.saveAddTaskParam(data);
        this.getParams = this.tokenService.getAddTaskParam();
      }
    );
  }

  addTag(): void {
    this.tag = this.tag.trim();
    if (this.tag.length >= 3) {
      this.newTask.tags.push(this.tag);
    }
    this.tag = null;
  }

  deleteTag(tag: any): void {
    this.newTask.tags.forEach((item, index) => {
      if (item === tag) this.newTask.tags.splice(index, 1);
      return;
    });
  }

  addAnswer(): void {
    if (this.newTask.answers.length >= 3) {
      alert('Количество ответов к задаче не должно быть больше 3.');
      this.answer = null;
      return;
    }

    this.answer = this.answer.trim();
    if (this.answer.length >= 1) {
      this.newTask.answers.push(this.answer);
    }
    this.answer = null;
  }

  deleteAnswer(answer: any): void {
    this.newTask.answers.forEach((item, index) => {
      if (item === answer) this.newTask.answers.splice(index, 1);
      return;
    });
  }

  addTask(): void {
    this.validAddTask();
    if (this.isValid) {
      this.taskService.addTask(this.newTask).subscribe(data =>
      {
        console.log(data);
      }, err => {
        console.log(err.error.message(err.status));
      })

    } else {
      alert('Ошибка - некорректно заполнены поля формы.')
    }
  }

  validAddTask(): void {
    this.isValid = false;
    if (this.newTask.title) {
      this.newTask.title = this.newTask.title.trim();
    } else {
      return;
    }
    if (this.newTask.body) {
      this.newTask.body = this.newTask.body.trim();
    } else {
      return;
    }

    if (this.newTask.title.length >= 3 && this.newTask.title.length <= 64) {
      if (this.newTask.subject) {
        if (this.newTask.body.length >= 64) {
          if (this.newTask.answers.length <= 3 && this.newTask.answers.length > 0) {
            this.isValid = true;
          }
        }
      }
    }

  }
}
