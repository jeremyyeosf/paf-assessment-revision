import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraService } from '../camera.service';
import { AuthenticationService } from '../authentication.service';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  imagePath = '/assets/cactus.png';
  isThereImage: boolean = false;
  mainform: FormGroup;

  constructor(
    private cameraSvc: CameraService,
    private fb: FormBuilder,
    private shareService: ShareService,
    private authSvc: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.cameraSvc.hasImage()) {
      const img = this.cameraSvc.getImage();
      this.imagePath = img.imageAsDataUrl;
	  this.isThereImage = this.cameraSvc.hasImage();
	}
    this.mainform = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      comments: this.fb.control('', [Validators.required]),
      username: this.fb.control(this.authSvc.loginCredentials.username, [
        Validators.required,
      ]),
      password: this.fb.control(this.authSvc.loginCredentials.password, [
        Validators.required,
      ]),
    });
  }

  clear() {
    this.imagePath = '/assets/cactus.png';
    this.cameraSvc.clear();
    this.mainform.reset();
    this.isThereImage = this.cameraSvc.hasImage();
  }

  share() {
    const img = this.cameraSvc.getImage();

    this.authSvc
      .authenticateCredentials(this.authSvc.loginCredentials)
      .subscribe((result) => {
        // console.log('result ---> ', result)
        if (result) {
          // if login then proceed
          console.log('User checked. ');
          const data = {
            ...img,
            ...this.authSvc.loginCredentials,
            ...this.mainform.value,
          };
          this.shareService
            .share(data)
            .then((res) => {
              console.log('>>>Upload result: ', res);
              this.clear();
            })
            .catch((e) => {
              console.error('>>Upload error', e);
              if (e['status'] == 401) this.router.navigate(['/']);
            });
        } else {
          this.router.navigate(['/main']);
        }
      });
    this.clear();
  }
}
