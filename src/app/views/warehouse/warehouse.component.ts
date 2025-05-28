import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouses = [
    {
      title: 'Склад 1',
      id: '1',
    },
    {
      title: 'Склад 2',
      id: '2',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
