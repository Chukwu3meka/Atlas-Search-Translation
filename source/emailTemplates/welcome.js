module.exports = ({ name }) => `
<tr>
  <td
    align="left"
    bgcolor="#ffffff"
    style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px"
  >
  <p style="margin: 0">Welcome ${name},  
  <br/>
  <br/>
  We’re so excited to have you as a part of our family. We strive to provide high quality translations.
<br/>
<br/>
  Thank you for signing up with Atlas Search Translation.
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
                  href="${process.env.CLIENT}"
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
                  >Start Translating</a
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
`;
