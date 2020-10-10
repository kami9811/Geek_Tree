import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GlobalService } from '../global.service';

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

  constructor(
    private nativeStorage: NativeStorage,
    public gs: GlobalService,
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
              }
            }
          )
        }
      }
    )
  }

}
