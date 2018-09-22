export class ReturnToken {
    sub? : string;
    userId? : string;
    role? : string[];
    application_modules? : string[];
    message? : string;
    status? : number;
    who? : string;
    question? : string;
    question_number? : number;
    organisation? : number;
    iat? : number;
    exp? : number;
}

export class QuestionAnswer{
     username? : string;
	 id? :number;
	 role?: string;
	 questionNumber?: number;
	 answer?:string;
	 who?: string;
}

