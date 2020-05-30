var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pessoa = require("./Pessoa");
var Cliente = (function (_super) {
    __extends(Cliente, _super);
    function Cliente() {
        _super.apply(this, arguments);
    }
    return Cliente;
})(Pessoa);
Object.seal(Cliente);
module.exports = Cliente;
