import sendgridMail from '@sendgrid/mail'
import { sendgridKey, defaultEmail } from '../../config'

/**
 * With the SENDGRID_KEY from .env we load
 */
sendgridMail.setApiKey(sendgridKey)

/**
 * This method receives the email from is going to be sended the email, the destination email
 * Subject of the email indeed, and the content. This can be as HTML string sure
 * @param {*} param0 Receives an object with basic data to send an email
 */
export const sendMail = ({
  fromEmail = defaultEmail,
  toEmail,
  subject,
  content
}) => {
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject,
    html: content
  }
  return sendgridMail.send(msg)
}
