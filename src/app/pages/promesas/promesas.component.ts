import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => {});
  }

  getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((response) => response.json())
        .then((body) => console.log(body.data));
    });

    return promesa;
  }
}
