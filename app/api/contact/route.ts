import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email to restaurant
    const restaurantEmail = {
      from: process.env.EMAIL_USER,
      to: 'logosbola@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }

    // Confirmation email to user
    const userEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We Received Your Message - Ahkii Burger',
      html: `
        <h2>Thank You for Contacting Us!</h2>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your Message Summary:</strong></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p>Best regards,<br>The Ahkii Burger Team</p>
      `,
    }

    // Send both emails
    await transporter.sendMail(restaurantEmail)
    await transporter.sendMail(userEmail)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    )
  }
}
