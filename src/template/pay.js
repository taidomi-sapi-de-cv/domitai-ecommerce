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
    <div class="progress mb-4">
      <div class="progress-bar bg-primary" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
      <div class="progress-bar-text text-center text-black-50 small" style="width: 100%; position: absolute;"></div>
    </div>
    
    <ul class="nav nav-tabs" id="myTab" role="tablist">
    {{#each accepted}}
      <li class="nav-item">
        <a class="nav-link {{id}}" id="{{id}}-tab" data-toggle="tab" href="#{{id}}" role="tab" aria-controls="{{id}}" aria-selected="true">{{label}}</a>
      </li>
    {{/each}}
    </ul>
    <div class="tab-content" id="myTabContent">
    {{#each accepted}}
      <div class="tab-pane fade {{id}}" id="{{id}}" role="tabpanel" aria-labelledby="{{id}}-tab">
          <small>Send the indicated amount to the address below or scan the QR with your wallet</small>
            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">{{currency}}</span>
              </div>
              <input type="text" class="form-control" aria-label="Amount of {{currency}}" value="{{amount}}" id="{{id}}-amount-input" readonly>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary copiable-button-addon" type="button" id="{{id}}-amount-button-addon" value="{{amount}}">Copy</button>
              </div>
            </div>
            
            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">{{label}}</span>
              </div>
              <input type="text" class="form-control" aria-label="Deposit address" value="{{address}}" id="{{id}}-address-input" readonly>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary copiable-button-addon" type="button" id="{{id}}-address-button-addon" value="{{address}}">Copy</button>
              </div>
            </div>
            
          <div class="domitai-payment-qr" onclick="window.location='{{uri}}'"></div>
      </div>
    {{/each}}
    </div>
  </div>
  <div class="card-footer small">
      <span data-toggle="tooltip" data-placement="left" title="Many times exchanges deducts fee from the amount or takes some time to send">
      Do not send funds from an exchange</span><br>
      <span class="text-muted">This payment is processed on behalf of the merchant or charity that referred you to this invoice by Taidomi SAPI de CV (Domitai)</span>
  </div>
</div>
`);