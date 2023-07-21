const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

require('dotenv').config()

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const date = new Date();
const today = `${date.getDate()}/${
  date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

const sendMailFromContact = (email, first_name, last_name, phone, message, cb) => {
  const mailOptions = {
    from: email,
    to: "restarter.dev@gmail.com",
    subject: `Los Girasoles Consulta Web - ${first_name} ${last_name}`,
    html: `<h1>Los Girasoles</h1><h2>Consulta Web ${today}</h2><p><ul><li>Nombre: ${first_name}</li><li>Apellido: ${last_name}</li><li>Telefono: ${phone}</li><li>Email: ${email}</li></ul></p><h2>Mensaje</h2><p>${message}</p>`,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const sendOrderConfirmation = (user, cart, order, cb) => {
  const { _id } = order;
  const mailOptions = {
    from: "restarter.dev@gmail.com",
    // to: user.email, // should be user.email once upgrade mailgun
    to: "sanvil000@gmail.com",
    bcc: "restarter.dev@gmail.com",
    subject: `Los Girasoles Pedido Web - Nro: ${_id}, ${user.first_name} ${user.last_name}`,
    html: 
      `
      <h1>Los Girasoles</h1>
      <h2>Pedido Web ${today}</h2>
      <p>
        <ul>Cliente
          <li>Nombre: ${user.first_name}</li>
          <li>Apellido: ${user.last_name}</li>
          <li>Telefono: ${user.phone}</li>
          <li>Email: ${user.email}</li>
          <li>Direccion: ${user.address}</li>
          <li>Ciudad: ${user.city}</li>
          <li>Departamento: ${user.state}</li>
        </ul>
      </p>
      <h2>Pedido</h2>
      <h3>Nro de Pedido: ${_id}</h3>
      ${cart.cartItems.map((c) => (
        `<div>
          <p>ID: ${c.id}</p>
          <p>Producto: ${c.name}</p>
          <p>Precio: ${c.price}</p>
          <p>Cantidad: ${c.quantity}</p>
          <p>Unidad: ${c.unidad ? c.unidad : null}</p>
          <div>Descripcion: ${c.description ? c.description.map((i) => (
            `
            <div>
              <p>Producto: ${i.name}</p>
              <p>Cantidad: ${i.cantidad}</p>
            </div>
            `
          )) : null}</div>
        </div>`))}
      
     
      <h2>Total: ${cart.cartTotal}</h2>
      `
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = {
  sendMailFromContact,
  sendOrderConfirmation,
};
