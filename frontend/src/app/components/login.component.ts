import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

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

	constructor(private fb: FormBuilder, private authSvc: AuthenticationService, private router: Router) { }

	ngOnInit(): void { 
    
  }

  checkCredentials() {
    this.authSvc.authenticateCredentials(this.loginForm.value).subscribe(
      result=>{
        console.log('response from express: ', result)
        if (result === undefined) {
          this.errorMessage = 'Wrong username or password'
        } else {
          console.log('user authenticated!')
          this.router.navigate(['/main'])
        }
      }
    )
    this.authSvc.loginCredentials = this.loginForm.value

  }

}
