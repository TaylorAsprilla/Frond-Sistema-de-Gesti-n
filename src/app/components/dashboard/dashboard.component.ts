import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() totalUsuarios: number = 0;
  @Input() totalCongregaciones: number = 2;
  @Input() totalCampos: number = 3;
  @Input() totalMinisterios: number = 3;

  constructor() {}

  ngOnInit(): void {}
}
