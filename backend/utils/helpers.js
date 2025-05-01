export const generateFiveDigitOTP = () => {
  const otp = Math.floor(Math.random() * 100000);
  return otp.toString().padStart(5, "0");
};

export const signupWelcomeEmailHtml = (name) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Talkify!</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            color: #333;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .header {
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            padding: 30px 20px;
            text-align: center;
        }
        
        .logo {
            height: 60px;
            margin-bottom: 15px;
        }
        
        .title {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
        }
        
        .subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin-top: 10px;
        }
        
        .content {
            padding: 30px;
        }
        
        .welcome-text {
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .verification-code {
            background-color: #f0f4ff;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
            font-size: 24px;
            font-weight: 700;
            color: #6e8efb;
            letter-spacing: 2px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            color: white !important;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 50px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(110, 142, 251, 0.3);
        }
        
        .features {
            margin: 30px 0;
        }
        
        .feature {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .feature-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            color: #6e8efb;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            color: #888;
            font-size: 14px;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://img.icons8.com/?size=512w&id=yg_1BRRCDTMO&format=png" alt="Talkify Logo" class="logo">
            <h1 class="title">Welcome to Talkify ${name}! ⚡</h1>
            <p class="subtitle">Your next-gen chat experience starts here</p>
        </div>
        
        <div class="content">
            <p class="welcome-text">
                Hey there! 👋<br><br>
                We're thrilled to have you join the Talkify community! Get ready for lightning-fast ⚡, 
                secure, and fun conversations with your friends, family, and colleagues.
            </p>        
            <p style="text-align: center;">
                <a href="#" class="cta-button">Start Chatting Now</a>
            </p>
            
            <div class="features">
                <h3 style="margin-bottom: 20px; color: #6e8efb;">Here's what makes Talkify special:</h3>
                
                <div class="feature">
                    <span class="feature-icon">⚡</span>
                    <span>Lightning-fast real-time messaging</span>
                </div>
                
                <div class="feature">
                    <span class="feature-icon">🔒</span>
                    <span>End-to-end encrypted conversations</span>
                </div>
                
                <div class="feature">
                    <span class="feature-icon">🎨</span>
                    <span>Customizable chat themes</span>
                </div>
                
                <div class="feature">
                    <span class="feature-icon">🌐</span>
                    <span>Available across all your devices</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2023 Talkify. All rights reserved.</p>
            <p>If you didn't request this email, please ignore it.</p>
        </div>
    </div>
</body>
</html>`;
};

export const forgotPasswordEmailHtml = (resetUrl , name) => {
  return `
 <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Your Talkify Password</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .header {
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            height: 60px;
            margin-bottom: 15px;
        }
        
        .title {
            font-size: 24px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .content {
            padding: 30px;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
        }
        
        .reset-box {
            background-color: #f0f4ff;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
        }
        
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            color: white !important;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 50px;
            font-weight: 600;
            margin: 15px 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(110, 142, 251, 0.3);
        }
        
        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(110, 142, 251, 0.4);
        }
        
        .expire-note {
            font-size: 14px;
            color: #666;
            margin-top: 15px;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            color: #888;
            font-size: 13px;
            border-top: 1px solid #eee;
        }
        
        .security-note {
            background-color: #fff8f8;
            border-left: 4px solid #ff6b6b;
            padding: 12px;
            margin: 20px 0;
            font-size: 14px;
            border-radius: 0 4px 4px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://img.icons8.com/?size=512w&id=yg_1BRRCDTMO&format=png" alt="Talkify Logo" class="logo">
            <h1 class="title">Reset Your Password ⚡</h1>
            <p>Get back to your chats in seconds</p>
        </div>
        
        <div class="content">
            <p class="greeting">Hi ${name},</p>
            
            <p>We received a request to reset your Talkify password. Click the button below to set a new one:</p>
            
            <div class="reset-box">
                <a href="${resetUrl}" class="reset-button">
                    Reset Password
                </a>
                <p class="expire-note">This link expires in <strong>1 hour</strong>.</p>
            </div>
            
            <div class="security-note">
                <strong>Note:</strong> If you didn't request this, please ignore this email.
            </div>
            
            <p>Cheers,<br>The <strong>Talkify</strong> Team</p>
        </div>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} Talkify. All rights reserved.</p>
            <p>This is an automated email—please do not reply.</p>
        </div>
    </div>
</body>
</html>`;
};
