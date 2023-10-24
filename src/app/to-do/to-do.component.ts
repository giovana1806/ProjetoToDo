import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Itarefas } from '../services/itarefas';
import { TarefasService } from '../services/tarefas.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent {
  form = new FormGroup({
    id: new FormControl(),
    tarefa: new FormControl('')
  })
  aFazer: Itarefas[] = [];
  fazendo: Itarefas[] = [];
  finalizado: Itarefas[] = [];

  constructor(private servico: TarefasService){ }
  ngOnInit(){this.listar()}
  add(addObj: any){
    this.aFazer.push(addObj);
  }
  listar(){
    this.servico.listar().subscribe(dados => this.aFazer = dados);
  }
  Salvar(){
    const valorForm = this.form.value;
    this.servico.criar(valorForm).subscribe(success =>{
      alert("Tarefa cadastrada com sucesso!");
      if(this.fazendo.length != 0 || this.finalizado.length != 0){
        this.add(valorForm);
      }
      else{
        this.listar();
      }
    },
    Error => alert("Erro ao cadastrar o curso")
    );
    this.form.reset();
  }
  drop(event: CdkDragDrop<Itarefas[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
