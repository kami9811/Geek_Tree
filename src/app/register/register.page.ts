import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  id: string;
  user_id: string;

  postObj: any = {}
  request_member: any[];

  constructor(
    public gs: GlobalService,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.nativeStorage.getItem('login').then(
      data => {
        this.user_id = data['user_id'];
        this.postObj['user_id'] = this.user_id;

        const body = this.postObj;
        this.gs.http('http://liquidmetal.ml/_api/friend/request_from', body).subscribe(
          res => {
            console.log(res);
            this.request_member = res['request_from'];
          }
        );
      }
    );
  }

  apply = () => {
    this.nativeStorage.getItem('login').then(
      data => {
        this.user_id = data['user_id'];
        this.postObj['user_id_do'] = this.user_id;
        this.postObj['user_id_done'] = this.id;

        const body = this.postObj;
        this.gs.http('http://liquidmetal.ml/_api/friend/request', body).subscribe(
          res => {
            console.log(res);
            this.alertApply();
            this.id = "";
          },
          error => {
            this.alertApply2();
            this.id = "";
          }
        );
      }
    );
  }
  follow = (user_id_done: string) => {
    this.nativeStorage.getItem('login').then(
      data => {
        this.user_id = data['user_id'];
        this.postObj['user_id_do'] = user_id_done;
        this.postObj['user_id_done'] = this.user_id;

        const body = this.postObj;
        console.log(body);
        this.gs.http('http://liquidmetal.ml/_api/friend/accept', body).subscribe(
          res => {
            console.log(res);
            this.alertFollow();
            this.nativeStorage.getItem('login').then(
              data => {
                this.user_id = data['user_id'];
                this.postObj['user_id'] = this.user_id;

                const body = this.postObj;
                this.gs.http('http://liquidmetal.ml/_api/friend/request_from', body).subscribe(
                  res => {
                    console.log(res);
                    this.request_member = res['request_from'];
                  }
                );
              }
            );
          }
        );
      }
    );
  }
  async alertApply() {
    const alert = await this.alertController.create({
      message: 'フレンド申請を行いました.',
      buttons: ['OK']
    })

    await alert.present();
  }
  async alertApply2() {
    const alert = await this.alertController.create({
      message: 'IDが存在しないか、既にフレンドとなっています.',
      buttons: ['OK']
    })

    await alert.present();
  }
  async alertFollow() {
    const alert = await this.alertController.create({
      message: 'フレンドに登録しました.',
      buttons: ['OK']
    })

    await alert.present();
  }
}
