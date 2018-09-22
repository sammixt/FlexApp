import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords, inputValidate } from '../../theme/utils/app-validators';
import { AuthService } from "../../../services/auth-service.service";
import { ReturnToken } from "../../../viewmodel/return-token.viewmodel";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  questionForm: FormGroup;
  returntoken : ReturnToken;
  hideclass : boolean = true;
  question : string;
  questionNumber : number;

  constructor(public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar,private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, inputValidate])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

   this.questionForm = this.formBuilder.group({
    'question':['',Validators.compose([Validators.required, inputValidate])],
    'questionNumber':['']
   });
   localStorage.removeItem('currentUser');
  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      //debugger;
       var data = {
        username : this.loginForm.value.email,
        password : this.loginForm.value.password
     };
     this.authService.signinUser(data).subscribe((response) => {
      if(response !== false){
        this.returntoken = response;
        this.hideclass = false;
        this.question = response.question;
        this.questionNumber = response.question_number;
      }
     },(error) => {
      console.log(error);
    });
     //console.log(data);
     // this.router.navigate(['/']);
    }
  }

  public onQuestionFormSubmit(values:Object):void{
    if(this.questionForm.valid){
      const newData = {
        username : this.returntoken.sub,
        id : this.returntoken.userId,
        role : this.returntoken.role,
        questionNumber : this.returntoken.question_number,
        answer : this.questionForm.value.question,
        who : this.returntoken.who
    };
    this.authService.answerQuestion(newData).subscribe((response) => {
      //debugger;
      console.log(response);
      if (response !== false) {
        this.router.navigate(['/']);
      }
    }, (error) => {
      console.log(error);
    });
  }
  }
  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
