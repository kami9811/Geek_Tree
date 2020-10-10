import { MypopComponent } from './../popovers/mypop/mypop.component';
import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private popover: PopoverController) {}
  
  CreatePopover() {
     this.popover.create({
       component: MypopComponent, showBackdrop:true}).then((
         popoverElement)=>{
          popoverElement.present();
        })
  }
}
