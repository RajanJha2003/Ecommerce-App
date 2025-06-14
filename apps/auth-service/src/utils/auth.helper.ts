import crypto from 'crypto';
import { ValidationError } from '../../../../packages/error-handler';
import { NextFunction } from 'express';
import redis from '../../../../packages/libs/redis';
import { sendEmail } from './sendMail';

const emailRegex=/^[a-zA-Z0-9_.%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const validateRegistrationData=(data:any,userType:"user"|"seller")=>{
    const {name,email,password,phone_number,country}=data;
    if(!name || !email || !password || (userType==='seller' && (!phone_number || !country)) ){
        throw new ValidationError("Missing required fields!")
    }


    if(!emailRegex.test(email)){
        throw new ValidationError("Invalid email!")
    }

   

}


export const checkOtpRestrictions=async(email:string,next:NextFunction)=>{
    if(await redis.get(`otp_lock:${email}`)){
        return next(new ValidationError("Account locked due to multiple failed attempts! Try again after 30 minutes"))

    }

    if(await redis.get(`otp_spam_lock:${email}`)){
        return next(new ValidationError("Too many OTP requests! Please wait before requesting again"))
    }

    if(await redis.get(`otp_cooldown:${email}`)){
        return next(new ValidationError("Please wait before requesting another OTP"))
    }

    
}

export const trackOtpRequests=async(email:string,next:NextFunction)=>{
    const otpRequestKey=`otp_request_count:${email}`;
    let optRequests=parseInt((await redis.get(otpRequestKey)) || "0");

    if(optRequests>=5){
        await redis.set(`otp_spam_lock:${email}`,"locked","EX",3600);
        return next(new ValidationError("Too many OTP requests! Please wait before requesting again"))
    }

    await redis.set(otpRequestKey,optRequests+1,"EX",3600);
}


export const sendOtp=async(name:string,email:string,template:string)=>{
    const otp=crypto.randomInt(1000,9999).toString();

    await sendEmail(email,"Verify your email",template,{name});
    
    await redis.set(`otp:${email}`,otp,"EX",300);
    await redis.set(`otp_cooldown:${email}`,"true","EX",60);





}