import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    fb: FormBuilder,
    public auth: AuthService,
    private router: Router
    ) {
    this.form = fb.group({
      email: ['Email Goes Here'],
      password: ['Password Goes Here']
    });
  }

  ngOnInit(): void {
  }

}
