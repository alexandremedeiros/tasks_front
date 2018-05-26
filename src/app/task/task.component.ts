import { Component, OnInit } from '@angular/core';

import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: Task;

  persistirTask: boolean = false;
  editandoRegistro: boolean = false;
  tasks: Task[];
  errorMessage: any = '';


  isPersistindo() {
    return this.persistirTask;
  }

  isEditando() {
    return this.editandoRegistro;
  }

  novaTask() {
    this.persistirTask = true;
  }

  salvarTask() {
    if (!this.isEditando()) {
      this.task.dataCriacao = new Date();
      this.task.status = 'Em aberto';
      this.task.dataConclusao = null;
      this.task.dataEdicao = null;
      this.task.dataRemocao = null;
      
      //Chama método no service para fazer o post da nova task
      this.taskService
        .criarTask(this.task)
        .subscribe(
            result => this.putTaskInArray(result, this.task),
            error => this.errorMessage = <any>error
      );
    }
    else {;
      const index: number = this.tasks.indexOf(this.task);
      this.task.status = 'Editada';
      this.task.dataEdicao = new Date();
      if (index !== -1) {
        //this.tasks[index] = this.task;
        this.taskService
          .editarTask(this.task)
          .subscribe(
              result => this.tasks[index] = this.task,
              error => this.tasks[index] = this.task
        );
        this.editandoRegistro = false;
      }
    }

    this.persistirTask = false;
    
  }

  private putTaskInArray(id: number, task) {
    task.id = id;
    this.tasks.push(task);
    this.task = new Task();
  }


  editTask(task) {
    console.log(task);
    this.task = task;
    this.persistirTask = true;
    this.editandoRegistro = true;
  }


  concluirTask(task) {
    const index: number = this.tasks.indexOf(task);
    if (index !== -1) {
      if (task.status == 'Em aberto' || task.status == 'Editada') {
        task.status = 'Concluída';
        task.dataConclusao = new Date();
      }
      else {
        task.status = 'Em aberto';
        task.dataConclusao = null;
      }
      //this.tasks[index] = task;
      this.taskService
        .concluirTask(task)
        .subscribe(
            result => this.tasks[index] = task,
            error => this.tasks[index] = task
      );

    }
  }

  deleteTask(task) {
    const index: number = this.tasks.indexOf(task);
    if (index !== -1) {
        this.taskService
        .removerTask(task)
        .subscribe(
            result => this.tasks.splice(index, 1),
            error => this.tasks.splice(index, 1)
        );
    }
  }

  constructor(private taskService: TaskService) {
    this.task = new Task();
    this.taskService.getTasks().subscribe(
      data => this.populateTasks(data.json()),
      error => alert(error),
      () => console.log('acesso a api ok...')
    );
  }

  ngOnInit() {}

  populateTasks(tasks) {
    this.tasks = [];
    for (let t of tasks) {
      let newTask = new Task(t['id'], t['titulo'], t['status'], t['descricao'], t['dataCriacao'], t['dataEdicao'], t['dataRemocao'], t['dataConclusao']);
      this.tasks.push(newTask);
    }
  }

}
