"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../model/message");
const messageobject = new message_1.Message();
class MessageController {
    constructor() {
        this.index = async (_req, res) => {
            try {
                const messages = await messageobject.index();
                if (messages) {
                    res.json({ data: messages, status: 'success' });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.delete = async (req, res) => {
            try {
                const deleted = await messageobject.delete(req.params.id);
                if (deleted) {
                    res.json({ status: 'success' });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.create = async (req, res) => {
            try {
                const message = {
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    message: req.body.message,
                    user_id: req.body.user_id
                };
                const newmessage = await messageobject.create(message);
                if (newmessage) {
                    res.json({ status: 'success', data: newmessage });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
    }
}
exports.default = MessageController;
