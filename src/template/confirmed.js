module.exports = require('handlebars').compile(`
<div class="card">
  <div class="card-header">
      <h6 class="card-subtitle mt-1 text-muted">
          <div class="float-left">{{cartName}}<div class="small">Order {{oid}}</div></div>   
          <div class="float-right">
            <div class="row">
                <div class="col">
                    <div>{{amount}} {{currency}}</div>
                    <div class="small">{{payload.original_amount}} {{payload.original_currency}}</div>
                </div>
                <div><img src="https://domitai.com/assets/img/coins/{{currency}}.png" class="img-fluid img-coin mr-2"
                                    alt="Bitcoin" onerror="this.src='https://domitai.com/assets/img/coins/default.png'"></div>
            </div>
          </div>
      </h6>
  </div>
  <div class="card-body text-center">
    <h3>Paid and Confirmed</h3>
    <button class="btn btn-success" onclick="window.open('https://domitai.com/api/pos/receipt/{{oid}}','_blank')">View receipt</button>
  </div>
  <div class="card-footer small">
      <span class="text-muted">This payment has been processed on behalf of the merchant or charity that referred you to this invoice by Taidomi SAPI de CV (Domitai)</span>
  </div>
</div>
`);