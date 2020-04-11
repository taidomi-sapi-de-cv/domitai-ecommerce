require('popper.js');
require('bootstrap')
const DomitaiLib = require('@domitai/domitai-sdk')
const $ = require('jquery')
  , templates = require('./template')

module.exports = (params) => {
  const domitai = DomitaiLib(params);
  return {
    ...domitai,
    render: async (target, paymentOpts) => {
      if (!target) return alert('You need to send the target parameter');
      const { slug, amount, currency, customer_data, generateQR, cartName = '' } = paymentOpts;
      const store = await domitai.pos.getBySlug(slug);
      const payment = await domitai.pos.newPayment({ slug, amount, currency, customer_data, generateQR });
      console.log('Store', store);
      console.log('Payment', payment);
      $(target).html(templates.main({ ...payment, store: store.payload, cartName }));
      return payment;
    },
    show: () => {
      $('#domitaiPosModal').modal({ show: true })
    }
  };
};