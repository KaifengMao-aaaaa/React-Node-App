import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';
dotenv.config();
import { insert, del, search } from './helpers';
import { errorSender } from '../errors';
const config = {
  service: 'gmail',
  auth: {
    user: process.env.MYEMAIL,
    pass: process.env.MYEMAILPASS
  }
};
const MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: '认证邮箱',
    link: 'http://localhost:3000/'
  }
});
export async function notificationEmail(staffId) {
  const result = await search('users', ['name', 'email'], ['ID'], [staffId]);
  const response = {
    body: {
      name: '新员工注册',
      intro: '该电子邮件地址用于通知和进一步确认.',
      action: {
        instructions: '从这里开放员工基本权限',
        button: {
          color: '#22BC66', // Optional action button color
          text: '管理界面链接',
          link: 'http://localhost:3000/user'
        }
      },
      table: {
        data: [{
          item: '姓名',
          description: result[0].name
        }, {
          item: '邮箱',
          description: result[0].email
        }]
      },
      outro: '不要回复此电子邮件'
    }
  };
  const mail = await MailGenerator.generate(response);
  const message = {
    from: process.env.MYEMAIL,
    to: '1768955213@qq.com',
    subject: '员工通知',
    html: mail
  };
  const transporter = await nodemailer.createTransport(config);

  await transporter.sendMail(message).then(async () => {
    return {};
  }).catch((error) => {
    errorSender('', '', error.message);
  });
}
export async function permissionChangedEmail(email, toPermission) {
  const response = {
    body: {
      name: '权限变化',
      intro: `您的权限被修改成 ${toPermission} 了`,
      outro: '不要回复此电子邮件'
    }
  };
  const mail = await MailGenerator.generate(response);
  const message = {
    from: process.env.MYEMAIL,
    to: email,
    subject: '员工通知',
    html: mail
  };
  const transporter = await nodemailer.createTransport(config);

  await transporter.sendMail(message).then(async () => {
    return {};
  }).catch((error) => {
    errorSender('', '', error.message);
  });
}
export async function emailVerfication(email: string, verficationCode: string, type: string) {
  const response = {
    body: {
      name: '注册',
      intro: '该电子邮件地址用于验证邮箱.',
      action: {
        instructions: '按这个按钮开始验证邮箱',
        button: {
          color: '#22BC66', // Optional action button color
          text: '确认你的邮箱',
          link: `http://localhost:3000/verfication/+ ${verficationCode}`
        }
      },
      table: {
        data: [{
          item: '邮箱',
          description: email
        }, {
          item: '验证码',
          description: verficationCode
        }]
      },
      outro: '不要回复此电子邮件'
    }
  };
  const mail = await MailGenerator.generate(response);
  const message = {
    from: process.env.MYEMAIL,
    to: email,
    subject: `${type}认证`,
    html: mail
  };
  const transporter = await nodemailer.createTransport(config);

  await transporter.sendMail(message).then(async () => {
    await insert('verficationcode', ['code', 'time', 'type'], [verficationCode, new Date(), type]);
    setTimeout(async () => await del('verficationcode', 'code = ?', [verficationCode]), 300 * 1000);
    return {};
  }).catch((error) => {
    errorSender('', '', error.message);
  });
}
