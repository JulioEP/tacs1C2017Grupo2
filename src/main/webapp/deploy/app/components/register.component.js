"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var usuario_service_1 = require("./../usuario.service");
var alert_service_1 = require("../alert.service");
var user_data_1 = require("./../model/user-data");
var RegisterComponent = (function () {
    function RegisterComponent(router, route, usuarioService, alertService, userData) {
        this.router = router;
        this.route = route;
        this.usuarioService = usuarioService;
        this.alertService = alertService;
        this.userData = userData;
        this.model = {};
        this.loading = false;
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.route.params
            .switchMap(function (params) { return _this.usuarioService.register(_this.usernamed, _this.passwordd); })
            .subscribe(function (result) {
            if (result) {
                _this.alertService.success("Registrado satisfactoriamente");
                _this.router.navigate(["login"]);
            }
            else {
                _this.error = "No se ha podido registrar. Intente mas tarde";
            }
        }, function (error) { return _this.error = "No se ha podido registrar. Intente mas tarde"; });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './register.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        usuario_service_1.UsuarioService,
        alert_service_1.AlertService,
        user_data_1.UserData])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map