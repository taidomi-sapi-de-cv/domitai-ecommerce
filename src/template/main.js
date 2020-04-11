module.exports = require('handlebars').compile(`
<div class="modal fade" id="domitaiPosModal" tabindex="-1" role="dialog" aria-labelledby="domitaiPosModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h5 class="business-name ">{{store.name}}<img alt="Merchant Verified"
                                                               src="https://domitai.com/assets/img/verified.png"
                                                               style="width: 18px; height: 18px; margin-left: 6px;">
                    </h5>
                </div>


                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">{{cartName}}
                            <div class="float-right">{{payload.original_amount}} {{payload.original_currency}}</div>
                        </h6>
                        <hr>

                        <h5 class="card-title mb-2 text-center">Select payment currency</h5>
                        <ul class="list-group list-group-flush">
                        {{#each payload.accepted}}
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div><img src="https://domitai.com/assets/img/coins/{{currency}}.png" class="img-fluid img-coin mr-2"
                                          alt="Bitcoin" onerror="this.src='https://domitai.com/assets/img/coins/default.png'"> {{label}}</div>
                                {{amount}} {{currency}}
                            </li>
                        {{/each}}
                        </ul>
                        <!--                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
                        <!--                        <a href="#" class="card-link">Card link</a>-->
                        <!--                        <a href="#" class="card-link">Another link</a>-->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Pay</button>
            </div>
        </div>
    </div>
</div>
`);