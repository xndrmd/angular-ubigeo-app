import { Component, OnInit, Input } from '@angular/core';
import { Ubigeo } from '../models/ubigeo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() ubigeos: Ubigeo[];
  constructor() { }

  ngOnInit() {
  }

}
