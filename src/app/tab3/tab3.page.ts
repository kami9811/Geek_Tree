import { MypopComponent } from './../popovers/mypop/mypop.component';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GlobalService } from '../global.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
​
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
​
  postObj: any = {};
  returnObj: any = {};
​
  gitInfo: any = {};
  /* returnObj = {
    "languages": {
      "name": ["test1",
               "test2"],
      "percentage": [400, 500],
    }
  } */
  constructor(
    private popover: PopoverController,
    public gs: GlobalService,
    private iab: InAppBrowser,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
  ) {}
​
  ngOnInit() {
    this.route.params.subscribe(
      params => {},
      error => console.error(error)
    );
    this.nativeStorage.getItem('login').then(
      data => {
        this.postObj['user_id'] = data['user_id'];
        /* this.postObj['user_id'] = "tj16kimura"; */
        const body = this.postObj;
          /* this.parentFlag = true; */
          this.gs.http('http://liquidmetal.ml/_api/user/get_info', body).subscribe(
            res => {
              console.log(res); 
              if(res['status'] == 200){
                console.log(res);
                console.log('status is 200');
                this.returnObj = res;
                /* this.alertRegister(); */
                /* this.gitFlag = true; */
              }else{
                console.log(res);
              }
            }
          );
        
      },
      error => console.log(error)
    );
  }
​
  CreatePopover() {
     this.popover.create({
       component: MypopComponent, showBackdrop:true}).then((
         popoverElement)=>{
          popoverElement.present();
        })
  }
}