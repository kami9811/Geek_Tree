import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GlobalService } from '../global.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id: string;
  password: string;

  postObj: any = {};
  returnObj: any = {};

  gitFlag: Boolean = false;

  constructor(
    private nativeStorage: NativeStorage,
    public gs: GlobalService,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
  }

  insertNative = () => {
    this.nativeStorage.setItem('login', {
      user_id: this.id,
      password: this.password,
    });
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

  getOauth = () => {
    const browser = this.iab.create('https://github.com/login/oauth/authorize?client_id=db79d4b963293b84a753&scope=user%20public_repo', '_system');
    browser.show();
  }

}
