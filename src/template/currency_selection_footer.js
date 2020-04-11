module.exports = require('handlebars').compile(`
<button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
<button type="button" class="btn btn-primary domitai-pay-button" onclick="domitai_ecommerce.pay()" disabled>Pay</button>
`);