using DbLibrary;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace ServicesLibrary.Services
{
    public class EmailService
    {
        public void SendEmail(string subject, string body, List<User> users )
        {
            using (MailMessage emailMessage = new MailMessage())
            {
                emailMessage.From = new MailAddress("disiteam7@gmail.com", "DISI7");
                foreach (var u in users)
                {
                    emailMessage.To.Add(new MailAddress(u.Email, u.Email));
                }
                emailMessage.Subject = subject;
                emailMessage.Body = body;
                emailMessage.Priority = MailPriority.Normal;
                using (SmtpClient MailClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    MailClient.EnableSsl = true;
                    MailClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    MailClient.Credentials = new System.Net.NetworkCredential("disiteam7@gmail.com", "P@rola123");
                    MailClient.Send(emailMessage);
                }
            }
        }
    }
}
