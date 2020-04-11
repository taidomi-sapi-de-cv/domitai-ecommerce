require('popper.js');
require('bootstrap')
const DomitaiLib = require('@domitai/domitai-sdk')
const $ = require('jquery')
  , templates = require('./template')

module.exports = (params) => {
  const domitai = DomitaiLib(params);
  return {
    ticker: async () => await domitai.ticker('btc_mxn'),
    render: (target) => {
      if (!target) return alert('You need to send the target parameter');
      $(target).html(templates.main);
    },
    show: () => {
      $('#domitaiPosModal').modal({ show: true })
    }
  };
};