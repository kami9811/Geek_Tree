import { MypopComponent } from './../popovers/mypop/mypop.component';
import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private popover: PopoverController) {}
  
  CreatePopover() {
     this.popover.create({
       component: MypopComponent, showBackdrop:true}).then((
         popoverElement)=>{
          popoverElement.present();
        })
  }

}
