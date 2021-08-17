import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  accountErrorMessage = '';
  passwordErrorMessage = '';

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
    const accountControl = this.formGroup.get('account');
    accountControl.valueChanges.subscribe(() => {
      this.validationCheck(accountControl.errors, 'account');
    });
    const passowrdControl = this.formGroup.get('passowrd');
    passowrdControl.valueChanges.subscribe(() => {
      this.validationCheck(passowrdControl.errors, 'password');
    });
  }

  login(): void {}

  private validationCheck(
    errors: ValidationErrors,
    fieldName: 'account' | 'password'
  ): void {
    let errorMessage: string;
    if (!errors) {
      errorMessage = '';
    } else if (errors.required) {
      errorMessage = '此欄位必填';
    } else if (errors.pattern) {
      errorMessage = '格式有誤，請重新輸入';
    } else if (errors.minlength) {
      errorMessage = '密碼長度最短不得低於8碼';
    }
    this.setErrorMessage(fieldName, errorMessage);
  }

  private setErrorMessage(
    fieldName: 'account' | 'password',
    errorMessage: string
  ): void {
    if (fieldName === 'account') {
      this.accountErrorMessage = errorMessage;
    } else {
      this.passwordErrorMessage = errorMessage;
    }
  }
}
