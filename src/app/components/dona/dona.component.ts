import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css'],
})
export class DonaComponent implements OnInit {
  @Input() titulo: string = 'Sin Título';

  constructor() {}

  ngOnInit(): void {}
}
