import { Component, Input, OnInit } from "@angular/core";
import { ChartType } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";

@Component({
  selector: "app-dona",
  templateUrl: "./dona.component.html",
  styleUrls: ["./dona.component.css"],
})
export class DonaComponent implements OnInit {
  @Input() titulo: string = "Sin Título";
  @Input("labels") doughnutChartLabels: Label[] = [
    "Label1",
    "Label2",
    "Label3",
  ];
  @Input("data") doughnutChartData: MultiDataSet = [[350, 450, 100]];

  public doughnutChartType: ChartType = "doughnut";
  constructor() {}

  ngOnInit(): void {}
}
