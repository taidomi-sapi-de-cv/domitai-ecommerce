require('popper.js');
require('bootstrap')
const DomitaiLib = require('@domitai/domitai-sdk')
const $ = jQuery = require('jquery')
  , qr = require('jquery.qrcode')
  , templates = require('./template')
  , _ = require('lodash')


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
    console.log('accepted', acceptedGroup[currency])
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

    $('#domitai-payment-qr').qrcode(acceptedGroup[currency].standard[0].uri);
    let remaining = 100;
    const fn = () => {
      remaining--;
      $('.progress-bar').css('width', `${remaining}%`);
      $('.progress-bar-text').text(`Expires in ${remaining}`);
      if (remaining > 0) setTimeout(fn, 250);
      console.log('Remaining', remaining)
    }
    fn();
    $('#myTab li:first-child a').tab('show')
  }

  return {
    ...domitai,
    render: async (paymentOpts) => {
      const { slug, amount, currency, customer_data, generateQR, cartName = '' } = this.paymentOpts = paymentOpts;
      const store = this.store = await domitai.pos.getBySlug(slug);
      // const payment = this.payment = await domitai.pos.newPayment({ slug, amount, currency, customer_data, generateQR });
      const payment = this.payment = {
        "success": true, "oid": "5e91f65787d74c4ed23f9b1b", "payload": {
          "accepted": [ {
            "currency": "BTCt",
            "amount": "0.00073973",
            "label": "Compatible",
            "name": "Bitcoin Testnet Coins",
            "address": "2N6UjWroYsR7nxRLnfVC95AdLN4UbK46Z53",
            "rate": "135183.05",
            "uri": "bitcoin:2N6UjWroYsR7nxRLnfVC95AdLN4UbK46Z53?message=Domitai&amount=0.00073973",
            "standard": true
          }, {
            "currency": "BTCt",
            "amount": "0.00073973",
            "label": "SegWit",
            "name": "Bitcoin Testnet Coins",
            "address": "tb1qm2gjwy293kfhlxy8raemp7vtu9rspv7r6wu8pn",
            "rate": "135183.05",
            "uri": "bitcoin:tb1qm2gjwy293kfhlxy8raemp7vtu9rspv7r6wu8pn?message=Domitai&amount=0.00073973",
            "standard": true
          }, {
            "currency": "BTCt",
            "amount": "0.00073973",
            "label": "Lightning",
            "name": "Bitcoin Testnet Coins",
            "address": "tb1qm2gjwy293kfhlxy8raemp7vtu9rspv7r6wu8pn",
            "rate": "135183.05",
            "uri": "bitcoin:tb1qm2gjwy293kfhlxy8raemp7vtu9rspv7r6wu8pn?message=Domitai&amount=0.00073973",
            "standard": false
          }, {
            "currency": "ETHt",
            "amount": "0.00138387",
            "label": "Ethereum Testnet",
            "name": "Ether Testnet",
            "address": "0x8c31613af65a56ca6dada27aa71d2a314c555066",
            "rate": "72261.00",
            "uri": "ethereum:0x8c31613af65a56ca6dada27aa71d2a314c555066",
            "standard": true
          }, {
            "currency": "LTCt",
            "amount": "0.13221392",
            "label": "Compatible",
            "name": "Litecoin Testnet Coins",
            "address": "QdaTNRgujxUDdvNm9E5KNaiQGu91tFpTBY",
            "rate": "756.35",
            "uri": "litecoin:QdaTNRgujxUDdvNm9E5KNaiQGu91tFpTBY?message=Domitai&amount=0.13221392",
            "standard": true
          }, {
            "currency": "LTCt",
            "amount": "0.13221392",
            "label": "SegWit",
            "name": "Litecoin Testnet Coins",
            "address": "tltc1q4yvy4cet3gqav64fmsc7768cngqfx0jf0u6r5c",
            "rate": "756.35",
            "uri": "litecoin:tltc1q4yvy4cet3gqav64fmsc7768cngqfx0jf0u6r5c?message=Domitai&amount=0.13221392",
            "standard": true
          }, {
            "currency": "LTCt",
            "amount": "0.13221392",
            "label": "Lightning",
            "name": "Litecoin Testnet Coins",
            "address": "tltc1q4yvy4cet3gqav64fmsc7768cngqfx0jf0u6r5c",
            "rate": "756.35",
            "uri": "litecoin:tltc1q4yvy4cet3gqav64fmsc7768cngqfx0jf0u6r5c?message=Domitai&amount=0.13221392",
            "standard": false
          }, {
            "currency": "DOMIt",
            "amount": "0.09582950",
            "label": "Label Undefined",
            "name": "DOMI Token Testnet",
            "address": "0x8c31613af65a56ca6dada27aa71d2a314c555066",
            "rate": "1043.52",
            "uri": "ethereum:0x8c31613af65a56ca6dada27aa71d2a314c555066",
            "standard": true
          } ],
          "original_amount": "100.00",
          "original_currency": "MXNt",
          "pos_id": 11,
          "pos_slug": "opticaltest",
          "created_at": "2020-04-11T16:54:47.046Z",
          "expires_at": "2020-04-11T17:14:47.046Z",
          "customer_data": {},
          "status": "waiting_payment",
          "oid": "5e91f65787d74c4ed23f9b1b"
        }
      };
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