import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductsViewmodel } from "../../viewmodel/products-viewmodel.viewmodel";
import { ProductViewmodel } from "../../viewmodel/product-viewmodel.viewmodel";

const helper = new JwtHelperService();
const url = 'http://localhost:8072/';

@Injectable()
export class GetProducts {
    token: string;
    httpOptions = {
    headers: new HttpHeaders({
        'module':  '1',
        'role' : 'APPLICATION'
    })
};

constructor(private httpclient: HttpClient, private router: Router) {}

 getProductsByCategoryId(id:number):Observable<ProductsViewmodel[]> {
     console.log('this is the Id ' + id)
    return this.httpclient.get<ProductsViewmodel[]>(url+'/rest/page/category/'+id,this.httpOptions)  
}
public getProductById(id): Observable<ProductsViewmodel>{
        return this.httpclient.get<ProductViewmodel>(url + '/rest/page/product' + id ,this.httpOptions);
    }
}
