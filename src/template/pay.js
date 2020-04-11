module.exports = require('handlebars').compile(`
<div class="card">
  <div class="card-header">
      <h6 class="card-subtitle mt-1 text-muted">{{cartName}}
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
        <a class="nav-link {{label}}" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{{label}}</a>
      </li>
    {{/each}}
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
    {{#each accepted}}
      <div class="tab-pane fade {{label}}" id="home" role="tabpanel" aria-labelledby="home-tab">
          Contenido de {{label}}
      </div>
    {{/each}}
<!--      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">home data</div>-->
      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">profile data</div>
      <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">te contact</div>
    </div>
    
    

    
    
    
    
    
    
<!--    <div id="domitai-payment-qr"></div>-->
    Send the indicated amount to the address below or scan the QR with your wallet<br>
    monto {{amount}}<br>
    direccion {{address}}<br>
    <div class="card-footer">
        Do not send funds from an exchange<br>
        This payment is processed on behalf of the merchant or charity that referred you to this invoice by Taidomi SAPI de CV (Domitai)
    </div>
  </div>
</div>
`);