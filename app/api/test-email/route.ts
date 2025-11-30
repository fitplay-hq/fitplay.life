import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const verificationMail = process.env.VERIFICATION_MAIL || "no-reply@fitplaysolutions.com";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        
        console.log("🔍 Testing email configuration:");
        console.log(`📧 From: ${verificationMail}`);
        console.log(`📧 To: ${email}`);
        console.log(`🔑 API Key exists: ${!!resendApiKey}`);
        console.log(`🔑 API Key starts with: ${resendApiKey?.substring(0, 10)}...`);
        
        if (!resendApiKey) {
            return NextResponse.json(
                { error: "RESEND_API_KEY is not configured" },
                { status: 500 }
            );
        }

        const resend = new Resend(resendApiKey);
        
        const emailResult = await resend.emails.send({
            from: verificationMail,
            to: email,
            subject: "🧪 Test Email from FitPlay",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>✅ Email Test Successful!</h2>
                    <p>This is a test email from your FitPlay application.</p>
                    <p><strong>From:</strong> ${verificationMail}</p>
                    <p><strong>To:</strong> ${email}</p>
                    <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                    
                    <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>📋 Configuration Check:</strong></p>
                        <ul>
                            <li>✅ Resend API Key: Configured</li>
                            <li>✅ Email Service: Active</li>
                            <li>✅ Sender Domain: ${verificationMail}</li>
                        </ul>
                    </div>
                    
                    <p style="color: #059669; font-weight: bold;">
                        If you received this email, your email configuration is working correctly! 🎉
                    </p>
                </div>
            `,
        });

        console.log(`✅ Test email sent successfully! Email ID: ${emailResult.data?.id}`);
        
        return NextResponse.json({
            success: true,
            message: "Test email sent successfully",
            emailId: emailResult.data?.id,
            from: verificationMail,
            to: email
        });
        
    } catch (error) {
        console.error("❌ Failed to send test email:", error);
        
        return NextResponse.json(
            { 
                error: "Failed to send test email", 
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}