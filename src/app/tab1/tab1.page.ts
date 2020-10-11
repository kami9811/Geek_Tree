import { MypopComponent } from './../popovers/mypop/mypop.component';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  id: string;
  password: string;
  // API用
  postObj: any = {};
  returnObj: any = {};

  constructor(
    private popover: PopoverController,
    private router: Router,
    private nativeStorage: NativeStorage,
    public gs: GlobalService,
  ) {}

  ngOnInit(){
    // 自動ログイン処理
    this.nativeStorage.getItem('login').then(
      data => {
        console.log(data);
        this.postObj["user_id"] = data["user_id"];
        this.postObj["password"] = data["password"];
        const body = this.postObj;

        this.gs.http('https://kn46itblog.com/hackathon/SPAJAM2020/php_apis/checkDatabase.php', body).subscribe(
          res => {
            if(res['verification'] == 1){
              console.log('login process');
              this.gs.http('https://kn46itblog.com/hackathon/SPAJAM2020/php_apis/login.php', body).subscribe(
                res => {
                  if(res['status'] == 200){
                    console.log('login has successed');
                    this.nativeStorage.setItem('login', {
                      user_id: this.id,
                      password: this.password,
                      login: true,
                    });
                  }
                }
              );
            }
            else{
              this.router.navigate(['/login']);
            }
          }
        );
      },
      error => {
        console.error(error);
        this.router.navigate(['/login']);
      }
    );
    // ここまで自動ログイン
  }

  CreatePopover() {
     this.popover.create({
       component: MypopComponent, showBackdrop:true}).then((
         popoverElement)=>{
          popoverElement.present();
        })
  }

}