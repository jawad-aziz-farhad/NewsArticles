import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public sources: Array<any> = [];
  public form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sources = [{name: 'BBC', value: 'bbc'} , {name: 'Reuters', value: 'reuters'} , {name: 'GeoGraphic', value: 'geogrpahic'}]
    this.initForm();
  }

  initForm(){
    const source = this.preferences  ?  this.preferences['source'] : this.sources[0].value ;
    const title_font = this.preferences ? this.preferences['title-font'] : 14 ;
    const desc_font = this.preferences ? this.preferences['desc-font'] : 8;

    this.form = this.formBuilder.group({
      ['source']: [source],
      ['title-font']: [title_font],
      ['desc-font']: [desc_font]
    });
  }

  get preferences(){
    console.log("Preferences",localStorage.getItem("settings"));
    return JSON.parse(localStorage.getItem('settings'));
  }
  onSourceChange(event){
    this.form.get('source').setValue(event.detail.value);    
  }

  onHeadingFontChange(event){
    this.form.get('title-font').setValue(event.detail.value); 
  }

  onDescFontChange(event){
    this.form.get('desc-font').setValue(event.detail.value); 
  }

  savePreferences(){
    localStorage.setItem('settings', JSON.stringify(this.form.value));
  }
}
