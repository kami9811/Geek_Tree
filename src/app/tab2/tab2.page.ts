import { MypopComponent } from './../popovers/mypop/mypop.component';
import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private popover: PopoverController) {}
  
  CreatePopover() {
     this.popover.create({
       component: MypopComponent, showBackdrop:true}).then((
         popoverElement)=>{
          popoverElement.present();
        })
  }

}
