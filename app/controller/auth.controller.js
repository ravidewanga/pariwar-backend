"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var User = require("../model/user.model");
var jwt = require("jsonwebtoken");
var login = function (req, res) {
    var user = User.findOne({ password: req.body.password,
        isactive: true,
        $or: [
            { email: req.body.identity },
            { contact: req.body.identity },
        ]
    }, function (err, docs) {
        return __awaiter(this, void 0, void 0, function () {
            var token_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!err) return [3 /*break*/, 1];
                        console.log(err);
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(docs != null)) return [3 /*break*/, 3];
                        token_1 = jwt.sign({ _id: docs._id }, String(process.env.TOKEN_SECRET));
                        return [4 /*yield*/, User.findOneAndUpdate({ _id: docs._id }, { lastlogin: Date.now() }, { "new": true }, function (err, newDoc) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.status(200).json({
                                        code: 200,
                                        role: docs.urole,
                                        uname: docs.uname,
                                        email: docs.email,
                                        isactive: docs.isactive,
                                        lastlogin: docs.lastlogin,
                                        token: token_1
                                    });
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(401).json({
                            code: 401,
                            msg: 'wrong credentials'
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
};
var otpVerify = function (req, res) {
    User.findOne({ contact: req.body.contact,
        verificationcode: parseInt(req.body.otp)
    }, function (err, docs) {
        return __awaiter(this, void 0, void 0, function () {
            var token_2, newDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!err) return [3 /*break*/, 1];
                        console.log(err);
                        return [3 /*break*/, 3];
                    case 1:
                        token_2 = jwt.sign({ _id: docs._id }, String(process.env.TOKEN_SECRET));
                        return [4 /*yield*/, User.findOneAndUpdate({ _id: docs._id }, {
                                'isactive': true,
                                'lastlogin': Date.now()
                            }, {
                                "new": true
                            }, function (err, newDoc) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.status(200).json({
                                        code: 200,
                                        role: newDoc.urole,
                                        uname: newDoc.uname,
                                        email: newDoc.email,
                                        isactive: newDoc.isactive,
                                        lastlogin: docs.lastlogin,
                                        token: token_2
                                    });
                                }
                            })];
                    case 2:
                        newDoc = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
};
module.exports = {
    login: login,
    otpVerify: otpVerify
};
