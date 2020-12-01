import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mypop',
  templateUrl: './mypop.component.html',
  styleUrls: ['./mypop.component.scss'],
})
export class MypopComponent implements OnInit {
  user_id: string;

  postObj: any = {};

  constructor(
    private popoverController: PopoverController,
    public gs: GlobalService,
    private nativeStorage: NativeStorage,
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  ClosePopover() {
    this.popoverController.dismiss();
  }

  logout = () => {
    console.log('logout start');
    this.nativeStorage.getItem('login').then(
      data=> {
        this.user_id = data['user_id']
        this.nativeStorage.setItem('login', {
          user_id: this.user_id,
          password: "",
          login: false,
        });
        this.postObj['user_id'] = this.user_id;
        const body = this.postObj;
        this.gs.http('https://kn46itblog.com/hackathon/SPAJAM2020/php_apis/logout.php', body).subscribe(
          res => {
            this.popoverController.dismiss();
            this.alertLogout();
            this.router.navigate(['/login']);
          }
        );
      }
    );
  }

  async alertLogout() {
    const alert = await this.alertController.create({
      message: 'ログアウトしました.',
      buttons: ['OK']
    })
​
    await alert.present();
  }

}
