import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;

  get accountControl(): FormControl {
    return this.formGroup.get('account') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      account: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/gi)
        ]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(16)]
      ]
    });
  }

  getErrorMessage(formControl: FormControl): string {
    let errorMessage: string;
    if (!formControl.errors || formControl.pristine) {
      errorMessage = '';
    } else if (formControl.errors.required) {
      errorMessage = '此欄位必填';
    } else if (formControl.errors.pattern) {
      errorMessage = '格式有誤，請重新輸入';
    } else if (formControl.errors.minlength) {
      errorMessage = '密碼長度最短不得低於8碼';
    } else if (formControl.errors.maxlength) {
      errorMessage = '密碼長度最長不得超過16碼';
    }
    return errorMessage;
  }

  login(): void {
    console.log('do login...');
  }
}
