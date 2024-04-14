"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let ContactSchema;
const Model = mongoose_1.default.model("Collection", ContactSchema);
exports.default = Model;
//# sourceMappingURL=user.js.map