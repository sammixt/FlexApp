import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR','NGN'];
  public currency:any;
  public message: string;
  public Name: string;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  constructor(public appService:AppService) { }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];  
    this.checkLoginState();  
  }

public  checkLoginState(): void{
  if(localStorage.getItem('currentUser') !== null){
    //debugger;
    var userdetail = JSON.parse(localStorage.getItem('currentUser'))
    console.log(localStorage.getItem('currentUser'));
    this.Name = userdetail.data.sub;
    this.message = "Sign out";
  }else{
    this.message = "Sign in";
  }
}
  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }

  

}
