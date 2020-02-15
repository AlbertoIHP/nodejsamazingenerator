export const registerEmailHtmlContent = (newUser, link) => (`
Hey, ${newUser.name}.<br><br>
You have register at ProPlannerV2.<br>
Please go to confirmation link to active your account<br><br>
<a href="${link}">${link}</a><br><br>
&mdash; ProPlannerv2 Team
`)