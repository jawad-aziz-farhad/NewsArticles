import { Component, OnInit } from '@angular/core';
import { OperationsService, SharedService } from '../services';
import { BBC_URL, GEO_GRAPHIC_URL, REUTERS_URL, NO_NEWS_ERROR } from '../constants/constants';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  private articles: Array<any>;

  constructor(private operationsService: OperationsService,
              private sharedService: SharedService,
              private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.sharedService.showLoader();
    this.operationsService.getRequest(this.url).subscribe((response: any) => {
      if(response && response.status === 'ok' && response.articles.length > 0)
        this.articles = response.articles;
      else
        this.sharedService.showToast(NO_NEWS_ERROR);
    },
    error => console.error("News Error", error),
    () => this.sharedService.hideLoader());
  }

  get url(){
    const source = this.settings ? this.settings['source'].toLowerCase() : null ;
    const url = source ? ( source === 'bbc' ? BBC_URL : (source === 'geographic' ? GEO_GRAPHIC_URL : REUTERS_URL) ) : BBC_URL ;
    return url;
  }

  get settings(){
    const settings = JSON.parse(localStorage.getItem('settings'));
    return settings ? settings : '';
  }

  get source() {
   return this.settings ? this.settings['source'] : 'Bbc'
       
  }

  get titleFont() {
    if(this.settings && this.settings['title-font'])
      return this.settings['title-font'];
  }

  get descFont() {
    if(this.settings && this.settings['desc-font'])
      return this.settings['desc-font'];
  }

  openArticle(article) {
    const browser = this.inAppBrowser.create(article.url);
    browser.show();
  }


}
