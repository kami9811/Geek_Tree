import { Component, OnInit, OnDestroy } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GlobalService } from '../global.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
​
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id: string;
  password: string;
​
  postObj: any = {};
  returnObj: any = {};
​
  gitFlag: Boolean = false;
​
  interval: any;
​
  loginFlag: Boolean = false;
​
  status: number = 0;
​
  constructor(
    private nativeStorage: NativeStorage,
    public gs: GlobalService,
    private iab: InAppBrowser,
    private router: Router,
    private alertController: AlertController,
  ) { }
​
  ngOnInit() {
  }
  ngOnDestroy() {
    if(this.status != 200){
      console.log(this.gitFlag);
      this.router.navigate(['/login']);
    }
  }
​
  insertNative = () => {
    this.nativeStorage.setItem('login', {
      user_id: this.id,
      password: this.password,
      login: false,
    });
    this.intervalFuntion();
    this.postObj['user_id'] = this.id;
    const body = this.postObj;
    this.gs.http('https://kn46itblog.com/hackathon/SPAJAM2020/php_apis/checkDatabase.php', body).subscribe(
      res => {
        console.log(res);
        if(res['verification'] != 1){
          this.postObj['password'] = this.password;
          const body = this.postObj;
          this.gs.http('https://kn46itblog.com/hackathon/SPAJAM2020/php_apis/registerInfo.php', body).subscribe(
            res => {
              console.log(res);
              if(res['status'] == 200){
                console.log('status is 200');
                this.alertRegister();
                this.gitFlag = true;
                // const browser = this.iab.create('https://github.com/login/oauth/authorize?client_id=db79d4b963293b84a753&scope=user%20public_repo', '_system');
                // browser.show();
              }
            }
          )
        }
      }
    )
  }
​
  getOauth = () => {
    if(this.gitFlag == false){
      console.log(this.gitFlag);
      this.alertBadRequest();
    }
    else{
      const browser = this.iab.create('https://github.com/login/oauth/authorize?client_id=db79d4b963293b84a753&scope=user%20public_repo', '_system');
      browser.show();
      this.intervalFuntion();
    }
  }
​
  intervalFuntion = () => {
    this.interval = setInterval(() => {
      this.login();
    }, 2000);
  }
​
  login = () => {
    this.postObj['user_id'] = this.id;
    this.postObj['password'] = this.password;
    const body = this.postObj;
    this.nativeStorage.getItem('login').then(
      data => {
        this.loginFlag = data['login'];
      },
      error => console.error(error)
    );
    if(this.loginFlag == false){
      this.gs.http('https://kn46itblog.com/hackathon/SPAJAM2020/php_apis/checkDatabase.php', body).subscribe(
        res => {
          if(res['verification'] == 1){
            console.log('login process');
            this.gs.http('https://kn46itblog.com/hackathon/SPAJAM2020/php_apis/login.php', body).subscribe(
              res => {
                clearInterval(this.interval);
                if(res['status'] == 200){
                  this.status = res['status'];
                  console.log('login has successed');
                  // this.alertLogin();
                  this.nativeStorage.setItem('login', {
                    user_id: this.id,
                    password: this.password,
                    login: true,
                  });
                  this.gs.http('http://liquidmetal.ml/_api/user/new', body).subscribe(
                    res => {
                      console.log(res);
                      this.router.navigate(['']);
                    },
                    error => {
                      console.error(error);
                      this.router.navigate(['']);
                    }
                  )
                }
              }
            )
          }
        }
      );
    }
  }
​
  async alertLogin() {
    const alert = await this.alertController.create({
      message: 'ログインに成功しました.',
      buttons: ['OK']
    })
​
    await alert.present();
  }
  async alertBadRequest() {
    const alert = await this.alertController.create({
      message: 'GitHub IDとApplication Passwordが設定されていません.',
      buttons: ['OK']
    })
​
    await alert.present();
  }
  async alertRegister() {
    const alert = await this.alertController.create({
      message: 'GitHub IDとApplication Passwordが設定ました.',
      buttons: ['OK']
    })
​
    await alert.present();
  }
​
}
