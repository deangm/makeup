import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(fb: FormBuilder) { 
    this.form = fb.group({
      email: ['Email Goes Here'],
      password: ['Password Goes Here']
    })
  }

  ngOnInit(): void {
  }

}
