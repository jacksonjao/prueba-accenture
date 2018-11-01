import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {DbService} from '../db.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-apply-for-credit',
  templateUrl: './apply-for-credit.component.html',
  styleUrls: ['./apply-for-credit.component.css']
})
export class ApplyForCreditComponent implements OnInit {
  applyForCreditForm: FormGroup;
  maximunDate: string;
  private actualDate: Date;

  constructor(private dataService: DbService) {
    this.actualDate = new Date();
    this.actualDate.setDate(this.actualDate.getDate() - 1);
    const month = ('0' + (this.actualDate.getMonth() + 1)).slice(-2);
    const day = ('0' + (this.actualDate.getDate())).slice(-2);
    this.maximunDate = `${this.actualDate.getFullYear()}-${month}-${day}`;
    this.applyForCreditForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]+[A-Z]?')]),
      companyName: new FormControl('', [Validators.required]),
      companyNit: new FormControl('', [Validators.required, Validators.pattern('[0-9]+[A-Z]?')]),
      salary: new FormControl('', [Validators.required, Validators.pattern('[0-9]+[A-Z]?'), Validators.max(100000000)]),
      dateInCompany: new FormControl('', [Validators.required, this.forbiddenDateValidator()]),
    });
  }

  ngOnInit() {
  }

  onSubmit(id, salary, dateInCompany) {

    if (!!this.applyForCreditForm.valid) {
      this.dataService.getClient(id.value).subscribe(client => {
          if (!!client) {
            const application = Object.assign({}, this.applyForCreditForm.value, this.creditValidator(salary.value, dateInCompany.value));
            this.dataService.addApplication(id.value, application).subscribe((result: LoanApplication) => {
              const srt = result.creditState === 'aprobada' ? `aprobado por ${result.borrowedMoney}` : 'rechazado';
              alert(`Su crédito fue ${srt}`);
              this.applyForCreditForm.reset();
            });
          } else {
            alert('Este usuario no existe');
            this.applyForCreditForm.reset();
          }
        },
        error => {
        });
    } else {
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
        const forbidden = new Date(+year, +month - 1, +day + 1) >= new Date();
        return forbidden ? {'forbiddenDate': {value: 'isOk'}} : null;
      }
    }; }

  creditValidator(salary, workingTime) {
    const year = workingTime.toString().split('-')[0];
    const month = workingTime.toString().split('-')[1];
    const day = workingTime.toString().split('-')[2];
    const isMoreOneYear = new Date(+year + 1, +month + 5, +day) <= new Date();
    let creditState = salary >= 800000 ? true : false;
    let salaryApproved = 0;
    if (creditState && isMoreOneYear) {
      if (salary >= 800000 && salary <= 1000000) {
        salaryApproved = 5000000;
      }
      if (salary > 1000000 && salary <= 4000000) {
        salaryApproved = 20000000;
      }
      if (salary >= 4000000) {
        salaryApproved = 50000000;
      }
    } else {
      creditState = false;
    }
    return {creditState: creditState ? 'aprobada' : 'rechazada', borrowedMoney: salaryApproved};
  }


  get id() {
    return this.applyForCreditForm.get('id');
  }

  get companyName() {
    return this.applyForCreditForm.get('companyName');
  }

  get companyNit() {
    return this.applyForCreditForm.get('companyNit');
  }

  get salary() {
    return this.applyForCreditForm.get('salary');
  }

  get dateInCompany() {
    return this.applyForCreditForm.get('dateInCompany');
  }
}
