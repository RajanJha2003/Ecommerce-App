import crypto from 'crypto';
import { ValidationError } from '../../../../packages/error-handler';
import { NextFunction } from 'express';

const emailRegex=/^[a-zA-Z0-9_.%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const validateRegistrationData=(data:any,userType:"user"|"seller")=>{
    const {name,email,password,phone_number,country}=data;
    if(!name || !email || !password || (userType==='seller' && (!phone_number || !country)) ){
        return new ValidationError(`Missing required fields!`)
    }


    if(!emailRegex.test(email)){
        return new ValidationError(`Invalid email!`)
    }

   

}


export const checkOtpRestrictions=(email:string,next:NextFunction)=>{

    
}


export const sendOtp=async(name:string,email:string,template:string)=>{
    const otp=crypto.randomInt(1000,9999).toString();
    // set 




}