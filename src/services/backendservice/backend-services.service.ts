import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { CategoryViewmodel } from "../../viewmodel/category-viewmodel.viewmodel";
import { ProductViewmodel } from "../../viewmodel/product-viewmodel.viewmodel";
import { SidenavViewmodel } from "../../viewmodel/sidenav-viewmodel.viewmodel";
import { HttpErrorResponse } from "@angular/common/http";

const helper = new JwtHelperService();
const url = 'http://localhost:8072/'

@Injectable()
export class BackendServices {
    token: string;
    httpOptions = {
    headers: new HttpHeaders({
        'module':  '1',
        'role' : 'APPLICATION'
    })
};
public categories : SidenavViewmodel[];

 public Data = new Data(
        [], // categories
        [], // compareList
        [],  // wishList
        [],  // cartList
        null //totalPrice
    )

 constructor(private httpclient: HttpClient, private router: Router) {}

 getCategories():Observable<CategoryViewmodel[]>{
    return this.httpclient.get<CategoryViewmodel[]>(url+'/rest/page/categories/sidebarmenu',this.httpOptions)  
}

 getSideNav():Observable<SidenavViewmodel[]>{
    return  this.httpclient.get<SidenavViewmodel[]>(url+'/rest/page/categories/sidebarmenu',this.httpOptions)  ;
     
}

}

export class Data {
    constructor(public categories: CategoryViewmodel[],
                public compareList: ProductViewmodel[],
                public wishList: ProductViewmodel[],
                public cartList: ProductViewmodel[],
                public totalPrice: number) { }
}
