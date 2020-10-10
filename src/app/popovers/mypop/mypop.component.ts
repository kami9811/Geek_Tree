import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mypop',
  templateUrl: './mypop.component.html',
  styleUrls: ['./mypop.component.scss'],
})
export class MypopComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  ClosePopover() {
    this.popoverController.dismiss();
  }

}
