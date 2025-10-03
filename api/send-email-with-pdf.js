// Backend API endpoint for sending email with PDF generation
import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, subject, message, documentTitle, documentContent, templateId, clientName } = req.body

    // Generate PDF using Puppeteer (backend)
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    const page = await browser.newPage()
    
    // Set content with proper styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${documentTitle}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              margin: 0; 
              padding: 24px;
              background: #ffffff;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .content {
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/assets/images/logo/logo.svg" alt="Logo" style="max-height: 60px; max-width: 200px;" />
          </div>
          <div class="content">
            ${documentContent}
          </div>
        </body>
      </html>
    `

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true
    })

    await browser.close()

    // Configure email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Send email with PDF attachment
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: subject,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
      attachments: [
        {
          filename: `${documentTitle}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ 
      message: 'Email sent successfully',
      recipient: email,
      subject: subject
    })

  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ 
      message: 'Failed to send email',
      error: error.message 
    })
  }
}
