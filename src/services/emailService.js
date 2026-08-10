import nodemailer from "nodemailer";


// SENDING INVITATION LINK
export const sendInviteEmail = async (email, inviteLink) => {
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Team Invitation",
        html: `
        <h3>You have been invited to join a team </h3>
        <p> click the link below to join: </p>
        <a href="${inviteLink}">${inviteLink} </a>`
    })
}


// SENDING RESET PASSWORD LINK
export const sendPasswordResetEmail = async (email, resetLink) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        html: `
        <h3>You have initiated a password reset </h3>
        <p> click the link below to reset your password: </p>
        <a href="${resetLink}">${resetLink} </a>`
    })
}