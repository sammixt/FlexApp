import { HttpHeaders, HttpClient } from "@angular/common/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

const helper = new JwtHelperService();

@Injectable()
export class AuthService {
  token: string;
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
  constructor(private httpclient: HttpClient, private router: Router) {}
  /*signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
  }*/
   url :string = "http://localhost:8072";
 
  showInterest(data) {
    return this.httpclient.post('/api/show-interest', data, this.httpOptions)
      .map((response) => {
        console.log(response);
        console.log(response['response']);
        const gdata = response['response'];
        if (gdata.status === 0) {
          return gdata;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch((error: Response) => {
        console.log(error);
        return Observable.throw('something went wrong');
      });
  }

  answerQuestion(data) {
    return this.httpclient.post(this.url + '/token/answer/', data, this.httpOptions)
      .map((response) => {
        console.log(response['response']);
        const token = response['response'];
        /*try {
          console.log(jwt.verify(token, 'SECRET'));
        }catch (e) {
          console.log(e);
        }*/
        const decoded = helper.decodeToken(token);
        console.log(decoded);
        if (token) {
          // set token property
           this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ data: decoded, token: token }));
          // return true to indicate successful login
          return decoded;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch ((error: Response) => {
        console.log(error);
        return Observable.throw('something went wrong');
      });
    /*firebase.auth().signInWithEmailAndPassword(email, password)
     .then(
     response => {
     this.router.navigate(['/']);
     firebase.auth().currentUser.getToken()
     .then(
     (token: string) => this.token = token
     )
     }
     )
     .catch(
     error => console.log(error)
     );*/
  }

  signinUser(data) {
    return this.httpclient.post(this.url + '/token', data, this.httpOptions)
      .map((response) => {
        console.log(response);
        console.log(response['response']);
        const token = response['response'];
        const decoded = helper.decodeToken(token);
        console.log(decoded);
        if (token) {
          // set token property
          // this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify({ username: decoded.sub, token: token }));
          // return true to indicate successful login
          return decoded;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch ((error: Response) => {
        console.log(error);
        return Observable.throw('something went wrong');
      });
    /*firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => this.token = token
            )
        }
      )
      .catch(
        error => console.log(error)
      );*/
  }

  logout() {
    // firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    /*firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );*/
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  requestPasswordReset(email){
   var  ResetPasswordDto = { Email : email};
   var reqHeader = new HttpHeaders({'No-Auth':'True'});
   return this.httpclient.post('api/User/ForgetPassword',ResetPasswordDto,{headers:reqHeader});
  }

  resetPassword(password){
    var PasswordDto = {Password : password};
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
   return this.httpclient.post('api/User/ResetPassword',PasswordDto,{headers:reqHeader});
  }
}