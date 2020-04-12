module.exports = require('handlebars').compile(`
<div class="card">
    <div class="card-header">
        <h6 class="card-subtitle mt-1 text-muted">
            <div class="float-left">{{cartName}}<div class="small">Order {{oid}}</div></div>
            <div class="float-right">{{payload.original_amount}} {{payload.original_currency}}</div>
        </h6>
    </div>
    <div class="card-body">
        <h5 class="card-subtitle mb-2 text-center">Select payment currency</h5>
        {{#each acceptedGroup}}
        <button class="btn btn-block btn-outline-secondary domitai-payment-methods {{standard.0.currency}}" onclick="domitai_ecommerce.selectCurrency('{{standard.0.currency}}')">
        <div class="row">
          <div class="col text-left text-justify text-nowrap"><img src="https://domitai.com/assets/img/coins/{{standard.0.currency}}.png" class="img-fluid img-coin mr-2"
                    alt="Bitcoin" onerror="this.src='https://domitai.com/assets/img/coins/default.png'"> {{standard.0.name}}</div>
          <div class="col mt-1 text-right">{{standard.0.amount}} {{standard.0.currency}}</div>
        </div>
        {{#if nonStandard}}
            <hr class="m-1 p-0">
            {{#each nonStandard}}
            <div class="row">
            <div class="col text-left">
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input domitai-nonstandard {{currency}}" id="{{currency}}-{{label}}">
                <label class="custom-control-label" for="{{currency}}-{{label}}"><small>{{label}}</small></label>
            </div>
            </div>
            </div>                            
            {{/each}}
        {{/if}}
        </button>
        {{/each}}
    </div>
</div>
<!--
<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-block" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          More currencies
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>-->
`);