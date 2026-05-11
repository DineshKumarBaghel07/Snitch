
import{body,validationResult} from "express-validator"



const validatorUserResult =(req,res,next) =>{
    const result = validationResult(req);
    console.log(result)
    if(!result.isEmpty()){
        return res.status(404).json({message:"Bad request",sucess:false})
    }
    next()
}

 export const validatorResgisterUser = [
    body('email').isEmail().withMessage('Email not correct fromat or not find'),
    body('contact').isLength({min:10,max:10}).withMessage("phone mumber must be 10 digit"),
    body('password').isLength({min:6}).withMessage("Password must"),
    body('fullname').notEmpty().withMessage("Full Name must required").isLength({min:3}).withMessage("Atlest min 3 char must be required"),
    validatorUserResult
]




export const validatorLogin =[
     body("email").isEmail().withMessage("email must be required"),
    body('password').isLength({min:6}).matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage("Password must"),
   
     validatorUserResult
]