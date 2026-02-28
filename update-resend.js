const fs = require('fs');
const file = './app/api/auth/resend-verification/route.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /import \{ Resend \} from "resend";/,
  `import { Resend } from "resend";\nimport { getVerificationEmailHtml } from "@/lib/email-templates";`
);

const htmlRegex = /html: `\s+<!DOCTYPE html>[\s\S]*?<\/html>\s+`,/m;
code = code.replace(
  htmlRegex,
  `html: getVerificationEmailHtml(user.name || "User", verifyLink),`
);

fs.writeFileSync(file, code);
