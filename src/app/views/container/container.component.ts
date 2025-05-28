import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  containers = [
    {
      title: 'Контейнер 1',
      id: '1',
    },
    {
      title: 'Контейнер 2',
      id: '2',
    },
    {
      title: 'Контейнер 3',
      id: '3',
    },
    {
      title: 'Контейнер 4',
      id: '4',
    },
    {
      title: 'Контейнер 5',
      id: '5',
    },
    {
      title: 'Контейнер 6',
      id: '6',
    },
    {
      title: 'Контейнер 7',
      id: '7',
    },
    {
      title: 'Контейнер 8',
      id: '8',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
