import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = ''
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void { 
    
  }

  checkCredentials() {
    console.log(this.loginForm.value)
  }

}
