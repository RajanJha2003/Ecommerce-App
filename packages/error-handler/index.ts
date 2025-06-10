export class AppError extends Error{
    public readonly statusCode:number;
    public readonly isOperational:boolean;
    public readonly details?:any;


    constructor(message:string,statusCode:number,isOperational=true,details?:any){
        super(message);
        this.statusCode=statusCode;
        this.isOperational=isOperational;
        this.details=details;
        Error.captureStackTrace(this);
    }


}


// Not Found Error

export class NotFoundError extends AppError{
    constructor(message="Resources not found"){
        super(message,404);
    }
}


// validation error

export class ValidationError extends AppError{
    constructor(message="Invalid request data",details?:any){
        super(message,400,true,details);
    }
}


// Authentication Error

export class AuthenticationError extends AppError{
    constructor(message="Unauthorized"){
        super(message,401);
    }
}

// Database error

export class DatabaseError extends AppError{
    constructor(message="Database Error",details?:any){
        super(message,500,true,details);
    }
}


// Forbidden Error

export class ForBiddenError extends AppError{
    constructor(message="Forbidden Access"){
        super(message,403);
    }
}

// Rate Limit Error

export class RateLimitError extends AppError{
    constructor(message="Too many requests, please try again later"){
        super(message,429);
    }
}



