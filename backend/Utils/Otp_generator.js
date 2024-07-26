// otpGenerator.js
import otpGenerator from 'otp-generator';

export const generateOTP = () => 
otpGenerator.generate(6, { upperCaseAlphabets: false,
     specialChars: false });
