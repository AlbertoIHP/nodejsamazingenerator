export const htmlEmailContent = (username, link) => (`
Hey, ${username}.<br><br>
You requested a new password for your ProPlanner v2 account.<br>
Please use the following link to set a new password. It will expire in 1 day.<br><br>
<a href="${link}">${link}</a><br><br>
If you didn't make this request then you can safely ignore this email. :)<br><br>
&mdash; back_nodejs Team
`)
