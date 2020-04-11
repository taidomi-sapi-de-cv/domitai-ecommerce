require('popper.js');
require('bootstrap');
require('./helpers/toHHMMSS');
const DomitaiLib = require('@domitai/domitai-sdk')
const $ = jQuery = require('jquery')
  , qr = require('jquery.qrcode')
  , templates = require('./template')
  , _ = require('lodash')
  , copyToClipboard = require('./helpers/copyToClipboard')


module.exports = (params) => {
  const domitai = DomitaiLib(params);
  this.target = 'domitai_ecommerce_target_container';
  $("BODY").append("<div id='" + this.target + "'></div>");
  window.domitai_ecommerce = this;
  this.selectCurrency = (currency) => {
    this.currency = currency;
    this.nonstandard = $(`.domitai-nonstandard.${currency}:checked`).attr('id');
    $('.domitai-pay-button').prop('disabled', false).text(`Pay with ${this.nonstandard || this.currency}`);
    $(`.domitai-payment-methods`).removeClass('active btn-outline-primary').addClass('btn-outline-secondary');
    $(`.${currency}`).removeClass('btn-outline-secondary').addClass('active btn-outline-primary');
  }
  this.pay = () => {
    // const { slug, amount, currency, customer_data, generateQR, cartName = '' } = this.paymentOpts;
    const { cartName = '' } = this.paymentOpts;
    const { currency, nonstandard, acceptedGroup, payment, store } = this;
    const accepted = acceptedGroup[currency][nonstandard ? 'nonStandard' : 'standard'];
    console.log('pagando con ', this.currency, this.nonstandard)
    console.log('accepted', accepted)
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

    accepted.forEach(f => $(`div.${f.id} div.domitai-payment-qr`).qrcode(f.uri));

    // $('#domitai-payment-qr').qrcode(acceptedGroup[currency].standard[0].uri);
    let totalTime = Math.floor((new Date(payment.payload.expires_at).getTime() - new Date(payment.payload.created_at).getTime()) / 1000);
    let remaining = totalTime;
    const fn = async () => {
      let remaining = Math.floor((new Date(payment.payload.expires_at).getTime() - new Date().getTime()) / 1000);
      // remaining--;
      $('.progress-bar').css('width', `${Math.floor(100 * remaining / totalTime)}%`);
      $('.progress-bar-text').text(`Expires in ${remaining.toString().toHHMMSS()}`);
      const status = await domitai.pos.getPaymentStatus(payment.oid);
      console.log('Status', status, payment.oid);
      if (status.success && status.oid === payment.oid) {
        if (status.payload === 'payment_expired') return this.expired();
        if (status.payload === 'payment_received') return this.confirmed();
      }
      if (remaining > 0) setTimeout(fn, 5000); else this.expired();
    }
    fn();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      const acceptedLabel = e.target.id.split('-tab').shift();
      const acceptedCoin = accepted.find(f => f.id === acceptedLabel);
      // console.log(e.target.id) // newly activated tab
      // e.relatedTarget // previous active tab
      console.log('Cambiando aceptado', acceptedLabel, acceptedCoin);
    })
    $('#myTab li:first-child a').tab('show')
    $('.copiable-button-addon').on('click', function (e) {
      copyToClipboard(document.getElementById(e.target.id.split('button-addon')[0] + 'input'));
    });
  }

  this.expired = () => {
    const { cartName = '' } = this.paymentOpts;
    const { currency, nonstandard, acceptedGroup, payment, store } = this;
    const accepted = acceptedGroup[currency][nonstandard ? 'nonStandard' : 'standard'];
    console.log('pagando con ', this.currency, this.nonstandard)
    console.log('accepted', acceptedGroup[currency])
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
    console.log('pagando con ', this.currency, this.nonstandard)
    console.log('accepted', acceptedGroup[currency])
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