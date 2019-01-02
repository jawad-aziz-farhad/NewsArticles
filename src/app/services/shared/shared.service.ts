import { Injectable, Injector } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { MESSAGE } from "../../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public injector: Injector){}

  private loadingCtrl$: LoadingController;
  private loading$: any;

  private toastCtrl$: ToastController;
  public pageTitle: string;

  public selectedAction: string;
  
  public get loadingCtrl(): LoadingController {
    if(!this.loadingCtrl$)
        this.loadingCtrl$ = this.injector.get(LoadingController);
    return this.loadingCtrl$;    
  }

  public get toastCtrl(): ToastController {
    if(!this.toastCtrl$)
        this.toastCtrl$ = this.injector.get(ToastController);
    return this.toastCtrl$;
  }

  /* 
  |----------------------
  |  SHOWING LOADER  
  |----------------------
  */
  async showLoader() {
    this.loading$ = await this.loadingCtrl.create({
        message: MESSAGE,
        duration: 2000
      });
      return await this.loading$.present(); 
  }
  /*
  |----------------------------------------
  |  HIDING LOADER
  |----------------------------------------
  */
  hideLoader(): void { this.loading$ ? this.loading$.dismiss().catch(()=>{}) : false; }
  /*
  |----------------------------------------
  | SHOWING TOAST
  |----------------------------------------
  */
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
 
}