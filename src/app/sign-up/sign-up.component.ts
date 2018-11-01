import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {DbService} from '../db.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  maximunDate: string;
  private actualDate: Date;
  constructor(private dataService: DbService) {
    this.actualDate = new Date();
    this.actualDate.setFullYear((this.actualDate.getFullYear() - 18));
    const month = ('0' + (this.actualDate.getMonth() + 1)).slice(-2);
    const day = ('0' + (this.actualDate.getDate())).slice(-2);
    this.maximunDate = `${this.actualDate.getFullYear()}-${month}-${day}`;
    this.signUpForm = new FormGroup({
      id: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$')]),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      birthDay: new FormControl('', [Validators.required, this.forbiddenDateValidator()]),
    });
    }

  ngOnInit() {

  }
  onSubmit(id) {
    if (!!this.signUpForm.valid) {
    this.dataService.getClient(id.value).subscribe(client => {
        if (!!client) {
          alert('Este usuario ya existe');
          this.signUpForm.reset();
        } else {
          this.dataService.addClient(id.value, this.signUpForm.value).subscribe(result => {
            alert('Usuario registrado, gracias por ser parte de nosotros');
            this.signUpForm.reset();
          });
        }
      },
      error => {
      }); } else {
      alert('Algunos datos no son correctos, se recargará la página para restaurar los cambios que hayas hecho en el inspector');
      location.reload();
    }
  }
  forbiddenDateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if ( control.value ) {
      const year = control.value.toString().split('-')[0];
      const month = control.value.toString().split('-')[1];
      const day = control.value.toString().split('-')[2];
      const forbidden = new Date(+year + 18, +month - 1, +day  ) >= new Date();
      return forbidden ? {'forbiddenDate': {value: 'isOk'}} : null;}
    }; }
  get id() { return this.signUpForm.get('id'); }
  get firstName() { return this.signUpForm.get('firstName'); }
  get lastName() { return this.signUpForm.get('lastName'); }
  get birthDay() { return this.signUpForm.get('birthDay'); }
}

