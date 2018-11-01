import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css']
})
export class InputErrorComponent implements OnInit {
@Input() customInput: FormControl
  constructor() { }

  ngOnInit() {
  }

}
