import { Component, OnInit } from '@angular/core';
import { OperationsService, SharedService } from '../services';
import { QUOTE_URL, MESSAGE } from '../constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private quote: any;
  public buttons: Array<any> = [];

  constructor(private opertaionsService: OperationsService,
              private sharedService: SharedService){}

  ngOnInit(){
    this.buttons = [{ name: 'settings', icon: 'settings'}]
    this.sharedService.showLoader();
    this.opertaionsService.getRequest(QUOTE_URL).subscribe((response: any) => {
      console.log("Quote Response ", response);
      if(response.contents.quotes.length >= 1){
        this.quote = response.contents.quotes[0];
      }
    },
    error => console.error("Quote Error", error),
    () => this.sharedService.hideLoader());
  }

  get image(){
    const image = '/assets/shapes.svg';
    return this.quote  ? ( this.quote.background ? this.quote.background : image ) : image;
  }

}
