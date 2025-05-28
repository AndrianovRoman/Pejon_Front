import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {

  warehouseId: string | null = null;

  lines = [
    {
      title: 'Линия 1',
      id: '1',
    },
    {
      title: 'Линия 2',
      id: '2',
    },
  ]

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.warehouseId = this.activatedRoute.snapshot.paramMap.get('warehouseId');
    console.log(this.warehouseId)
  }

}
