const nodeMailer = require("nodemailer");
const envObj = require("../config/env");

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: envObj.app_email,
        pass: envObj.app_password
    }
});

const testTransporter = async () => {
    try {
        await transporter.verify();
        console.log("Server is ready to take our messages.");
    } catch (error) {
        console.error("Verification transporter:", error);
    }
};

const sendWelcomeingEmail = async () => {
    try {
            await transporter.sendMail({
                
            })
        
    } catch (error) {
        
    }
}

module.exports = { transporter, testTransporter };