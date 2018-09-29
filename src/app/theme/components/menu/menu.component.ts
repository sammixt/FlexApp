import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { BackendServices } from "../../../../services/backendservice/backend-services.service";
import "rxjs/Rx";
import { Observable } from "rxjs";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  cat : any ;
  constructor(private service: BackendServices) { }

  ngOnInit() {
    this.getMenus();
   }

  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }        
    });
  }

  getMenus(){
       this.service.getCategories().subscribe((data : any) =>{
          this.cat = data['body'].response.payload;
       },
     (err : HttpErrorResponse) => {
        //alert('An error occurred');
     });
  }


}
