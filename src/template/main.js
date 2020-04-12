module.exports = require('handlebars').compile(`
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
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
            <div class="modal-body domitai-modal-body">
            </div>
            <div class="modal-footer domitai-modal-footer">
                
            </div>
        </div>
    </div>
</div>
<style>
.borderless {
    border: none;
}
.img-coin {
    max-width: 2.5rem;
}
div.domitai-payment-qr canvas {
    width: 100%;
}
</style>
`);