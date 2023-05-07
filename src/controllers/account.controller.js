// Important requires
const createError = require("http-errors");
const { createRecord, readRecord, updateRecord, deleteRecord } = require('../utils/CRUD');
const { hashSync, compareSync } = require("bcrypt");
const accountValidSchemaRegister =
    require("../utils/account.validationSchema").accountValidSchemaRegister;
const accountValidSchemaLogin =
    require("../utils/account.validationSchema").accountValidSchemaLogin;

/**
 * Create User function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const createUser = async (req, res,next) => {
    try {

        const validResult = await accountValidSchemaRegister.validateAsync(req.body);

        /**
         * Read Record
         */
        const encodedEmail = Buffer.from(validResult.email).toString('base64');
        const userPath = `Users/${encodedEmail}`;
        const testData = await readRecord(userPath);

        if(testData){
            return res.status(409).json({
                status: 409,
                message: "Error, User email has already been defined"
              });
        }

        /**
         * Create Record
         */
        const recordData = { 
            email: validResult.email,
            password: hashSync(validResult.password, 10),
            fullName: validResult.fullName,
            mobileNo: validResult.mobileNo,
            type: "user"
        };
        await createRecord(userPath, recordData);

        return res.status(200).send({
            message: "true",
        });
        
    } catch (error) {
        //console.log(error)
        if(error.details[0]){
            return res.status(400).json({
                status: 400,
                message: error.details[0].message
            });
        }
        else{
            next(error);
        }
        
    }
};


/**
 * Login function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const login = async (req, res,next) => {
    try {

        const validResult = await accountValidSchemaLogin.validateAsync(req.body);

        /**
         * Read Record
         */
        const encodedEmail = Buffer.from(validResult.email).toString('base64');
        const userPath = `Users/${encodedEmail}`;
        const userData = await readRecord(userPath);

        if(!userData){
            throw new createError[404](
                "Error, No such an email exists"
            );
        }

        /**
         * Validate data
         */
        if (!compareSync(validResult.password, userData.password)) {
            throw new createError[401](
                "Incorrect Password"
            );
        }

        return res.status(200).send({
            message: "true",
            userId: Buffer.from(validResult.email).toString('base64'),
            type: userData.type
        });
        
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    createUser,
    login,
};
