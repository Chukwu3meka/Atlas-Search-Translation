module.exports = ({ verifyLink, name, email }) => `
<tr>
  <td
    align="left"
    bgcolor="#ffffff"
    style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px"
  >
    <p style="margin: 0">
      Hi ${name}, Welcome to Atlas Search Translation. Confirm your email address
      by tapping the button below to verify that ${email} is the email address you provided during signup. If you didn't create an
      account with
      <a href="${process.env.CLIENT}">Atlas Search Translation</a>, you can safely delete this email.
    </p>
  </td>
</tr>

<!-- start button -->
<tr>
  <td align="left" bgcolor="#ffffff">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" bgcolor="#ffffff" style="padding: 8px">
          <table border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" bgcolor="#1a82e2" style="border-radius: 6px">
                <a
                  href="${process.env.CLIENT}${verifyLink}"
                  target="_blank"
                  style="
                    display: inline-block;
                    padding: 13px 30px;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                  "
                  >Verify Mail</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>
<!-- end button -->

<tr>
  <td
    align="left"
    bgcolor="#ffffff"
    style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px"
  >
    <p style="margin: 0">If that doesn't work, copy and paste the following link in your browser:
    <br/>
    <a href="${process.env.CLIENT}${verifyLink}" target="_blank">${process.env.CLIENT}${verifyLink}</a>
    <br/>
This link will expire in the next 24 hours
    </p>
  </td>
</tr>
`;
