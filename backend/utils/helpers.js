export const generateFiveDigitOTP = () => {
  const otp = Math.floor(Math.random() * 100000);
  return otp.toString().padStart(5, "0");
};

export const signinMailOptionsHtml = (code) => {
  return `
          <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Talkify Access</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
      body { 
        margin: 0; 
        padding: 0; 
        font-family: 'Poppins', sans-serif; 
        background-color: #f5f7ff;
      }
      .container { 
        max-width: 600px; 
        margin: 20px auto; 
        border-radius: 20px; 
        overflow: hidden; 
        box-shadow: 0 15px 40px rgba(101, 90, 255, 0.15);
        transform-style: preserve-3d;
        perspective: 1000px;
      }
      .header {
        background: linear-gradient(135deg, #655AFF 0%, #8E2DE2 100%);
        padding: 40px 30px;
        text-align: center;
        color: white;
        position: relative;
        overflow: hidden;
      }
      .header::after {
        content: "";
        position: absolute;
        bottom: -50px;
        left: -50px;
        width: 150px;
        height: 150px;
        background: rgba(255,255,255,0.1);
        border-radius: 50%;
      }
      .header::before {
        content: "";
        position: absolute;
        top: -30px;
        right: -30px;
        width: 100px;
        height: 100px;
        background: rgba(255,255,255,0.08);
        border-radius: 50%;
      }
      .logo {
        width: 80px;
        height: 80px;
        margin: 0 auto 15px;
        display: block;
      }
      .logo-text {
        font-size: 32px;
        font-weight: 700;
        margin: 0 0 10px 0;
        text-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      .logo-subtext {
        margin: 0;
        opacity: 0.9;
        font-size: 16px;
        font-weight: 400;
      }
      .chat-bubble {
        background: white;
        display: inline-block;
        padding: 15px 25px;
        border-radius: 20px 20px 20px 0;
        margin: 30px auto;
        max-width: 80%;
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        position: relative;
        transform: translateY(0);
        animation: float 3s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .otp-code {
        font-size: 48px;
        font-weight: 700;
        letter-spacing: 5px;
        color: #655AFF;
        margin: 20px 0;
        background: white;
        display: inline-block;
        padding: 20px 40px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(101, 90, 255, 0.2);
        border: 2px dashed rgba(101, 90, 255, 0.3);
      }
      .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #655AFF 0%, #8E2DE2 100%);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        margin: 20px 0;
        box-shadow: 0 10px 20px rgba(101, 90, 255, 0.3);
        transition: all 0.3s ease;
      }
      .cta-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 25px rgba(101, 90, 255, 0.4);
      }
      .footer {
        background: white;
        padding: 30px;
        text-align: center;
        font-size: 12px;
        color: #888;
      }
      .message-preview {
        background: #f9f9ff;
        border-left: 4px solid #655AFF;
        padding: 15px;
        margin: 20px 0;
        border-radius: 0 10px 10px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://img.icons8.com/?size=512w&id=yg_1BRRCDTMO&format=png" class="logo"/>
        <h1 class="logo-text">Talkify</h1>
        <p class="logo-subtext">Your secure access code</p>
      </div>
      
      <div style="background: white; padding: 40px 30px; text-align: center;">
        <div class="chat-bubble">
          <p style="margin: 0; font-size: 16px; color: #555;">Here's your secure login code for Talkify:</p>
        </div>
        
        <div class="otp-code">${code}</div>
        
        <p style="font-size: 14px; color: #888; margin: 10px 0 30px;">
          Expires in <strong style="color: #655AFF;">1 minute</strong> • Do not share this code
        </p>
        
        <div class="message-preview">
          <p style="margin: 0; font-size: 14px; color: #655AFF; font-weight: 600;">New message preview:</p>
          <p style="margin: 5px 0 0; font-size: 13px; color: #666;">"Your friends are waiting to chat! Login now to join the conversation."</p>
        </div>
      </div>
      <div class="footer">
        <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Talkify. All rights reserved.</p>
        <p style="margin: 5px 0 0; font-size: 11px; color: #ccc;">If you didn't request this, please ignore this email.</p>
      </div>
    </div>
  </body>
  </html>
        `;
};
