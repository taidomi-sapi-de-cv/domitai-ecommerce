require('popper.js');
require('bootstrap');
require('./helpers/toHHMMSS');
const DomitaiLib = require('@domitai/domitai-sdk')
const $ = jQuery = require('jquery')
  , qr = require('jquery.qrcode')
  , templates = require('./template')
  , _ = require('lodash')
  , copyToClipboard = require('./helpers/copyToClipboard')


module.exports = (params = { noBootstrap: false }) => {
  const domitai = DomitaiLib(params);
  this.target = 'domitai_ecommerce_target_container';

  if (!params.noBootstrap) $("HEAD").append('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">');
  $("BODY").append("<div id='" + this.target + "'></div>");
  window.domitai_ecommerce = this;
  this.selectCurrency = (currency) => {
    this.currency = currency;
    this.nonstandard = $(`.domitai-nonstandard.${currency}:checked`).attr('id');
    $('.domitai-pay-button').prop('disabled', false).text(`Pay with ${this.nonstandard || this.currency}`);
    $(`.domitai-payment-methods`).removeClass('active btn-outline-primary').addClass('btn-outline-secondary');
    $(`.${currency}`).removeClass('btn-outline-secondary').addClass('active btn-outline-primary');
  }
  this.pay = async () => {
    // const { slug, amount, currency, customer_data, generateQR, cartName = '' } = this.paymentOpts;
    const { cartName = '' } = this.paymentOpts;
    const { currency, nonstandard, acceptedGroup, payment, store } = this;
    const accepted = acceptedGroup[currency][nonstandard ? 'nonStandard' : 'standard'];
    $(`#${this.target} .domitai-modal-body`).html(templates.pay({
      ...payment,
      store: store.payload,
      cartName: cartName,
      currency,
      nonstandard,
      accepted,
      amount: accepted[0].amount,
      address: accepted[0].address,
    }));

    $(`#${this.target} .domitai-modal-footer`).html(templates.pay_footer());

    accepted.forEach(f => $(`div.${f.id} div.domitai-payment-qr`).qrcode(f.uri)); // TODO: calculate the container width to set the qr size

    let totalTime = Math.floor((new Date(payment.payload.expires_at).getTime() - new Date(payment.payload.created_at).getTime()) / 1000);
    let remaining = totalTime;
    const fn = async () => {
      remaining = Math.floor((new Date(payment.payload.expires_at).getTime() - new Date().getTime()) / 1000);
      if (remaining < 0) remaining = 0;
      $('.progress-bar').css('width', `${Math.floor(100 * remaining / totalTime)}%`);
      $('.progress-bar-text').text(`Expires in ${remaining.toString().toHHMMSS()}`);
      if (remaining > 0) setTimeout(fn, 5000); else {
        await domitai.pos.mute(payment.oid);
        return this.expired();
      }
    }
    fn();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      const acceptedLabel = e.target.id.split('-tab').shift();
      const acceptedCoin = accepted.find(f => f.id === acceptedLabel);
      // console.log(e.target.id) // newly activated tab
      // e.relatedTarget // previous active tab
    })
    $('#myTab li:first-child a').tab('show')
    $('.copiable-button-addon').on('click', function (e) {
      copyToClipboard(document.getElementById(e.target.id.split('button-addon')[0] + 'input'));
    });
    const waitingStatus = await domitai.pos.listen(payment.oid);
    console.log('Waiting for payment', waitingStatus);
    do {
      const paymentStatus = await domitai.pos.wait(payment.oid);
      console.log('Status', paymentStatus, payment.oid);
      if (paymentStatus.status === 'payment_expired') {
        await domitai.pos.mute(payment.oid);
        return this.expired();
      }
      if (paymentStatus.status === 'payment_received') {
        await domitai.pos.mute(payment.oid);
        return this.confirmed();
      }
    } while (remaining > 0);
  }

  this.expired = () => {
    const { cartName = '' } = this.paymentOpts;
    const { currency, nonstandard, acceptedGroup, payment, store } = this;
    const accepted = acceptedGroup[currency][nonstandard ? 'nonStandard' : 'standard'];
    $(`#${this.target} .domitai-modal-body`).html(templates.expired({
      ...payment,
      store: store.payload,
      cartName: cartName,
      currency,
      nonstandard,
      accepted,
      amount: accepted[0].amount,
      address: accepted[0].address,
    }));

    $(`#${this.target} .domitai-modal-footer`).html(templates.pay_footer());
  }

  this.confirmed = () => {
    const { cartName = '' } = this.paymentOpts;
    const { currency, nonstandard, acceptedGroup, payment, store } = this;
    const accepted = acceptedGroup[currency][nonstandard ? 'nonStandard' : 'standard'];
    $(`#${this.target} .domitai-modal-body`).html(templates.confirmed({
      ...payment,
      store: store.payload,
      cartName: cartName,
      currency,
      nonstandard,
      accepted,
      amount: accepted[0].amount,
      address: accepted[0].address,
    }));

    $(`#${this.target} .domitai-modal-footer`).html(templates.pay_footer());
  }


  return {
    ...domitai,
    render: async (paymentOpts) => {
      const { slug, amount, currency, customer_data, generateQR, cartName = '' } = this.paymentOpts = paymentOpts;
      const store = this.store = await domitai.pos.getBySlug(slug);
      const payment = this.payment = await domitai.pos.newPayment({
        slug,
        amount,
        currency,
        customer_data,
        generateQR
      });
      // const payment = this.payment = require('../tests/payment.json');
      payment.payload.accepted.forEach(p => p.id = p.label.replace(/\ /g, '-'))
      const acceptedGroup = _.groupBy(payment.payload.accepted, 'currency');
      for ([ k, v ] of Object.entries(acceptedGroup)) {
        const standard = v.filter(i => i.standard);
        const nonStandard = v.filter(i => !i.standard);
        acceptedGroup[k] = { standard, nonStandard };
      }
      this.acceptedGroup = acceptedGroup;
      console.log('Store', store);
      console.log('Payment', payment);
      console.log('Grouped', acceptedGroup);
      $(`#${this.target}`).html(templates.main({
        ...payment, acceptedGroup, store: store.payload, cartName
      }));
      $(`#${this.target} .domitai-modal-body`).html(templates.currency_selection({
        ...payment, acceptedGroup, store: store.payload, cartName
      }));
      $(`#${this.target} .domitai-modal-footer`).html(templates.currency_selection_footer({
        ...payment, acceptedGroup, store: store.payload, cartName
      }));
      return payment;
    },
    show: () => {
      $('.collapse').collapse()
      $('#domitaiPosModal').modal({ show: true })
    }
  };
};