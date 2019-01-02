import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private buttons$: Array<any> = [];

  @Input() pageTitle: string = '';
  @Input() set navButtons(buttons$){ this.buttons$ = buttons$; };
  get navButtons(){ return this.buttons$; }

  @Output() onclick = new EventEmitter<string>();

  constructor(public navCtrl: NavController) {
    console.log('Header Component.');
  }
  /*
    =============================
      NAV BAR BUTTON CLICK EVENT
    =============================
  */
  clickCallBack(iconName: string){
    this.onclick.emit(iconName);
  }
}
