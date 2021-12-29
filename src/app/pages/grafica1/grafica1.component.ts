import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grafica1",
  templateUrl: "./grafica1.component.html",
  styleUrls: ["./grafica1.component.css"],
})
export class Grafica1Component implements OnInit {
  constructor() {}

  public labels1: string[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail-Order Sales",
  ];

  public data1 = [[250, 130, 70]];

  ngOnInit(): void {}
}
