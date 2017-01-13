// smsbip - Infobip SMS API wrapper for NodeJS
// Created by Surya Handika Putratama <ubunteroz@gmail.com>
// Licensed under GNU Lesser General Public License v3.0
// (see LICENSE or https://www.gnu.org/licenses/lgpl-3.0.en.html)

const _ = require('underscore');
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

class SMSBip {
    constructor(username, password) {
        this.urls = {
            base: 'http://api.infobip.com',
            balance: '/account/1/balance',
            numberContext: '/number/1/query',
            preview: '/sms/1/preview',
            reports: '/sms/1/reports',
            sendOne: '/sms/1/text/single',
            sendMulti: '/sms/1/text/multi',
            sendAdvanced: '/sms/1/text/advanced'
        }

        this.props = {
            headers: {
                'Authorization': 'Basic ' + (new Buffer(username + ':' + password)).toString('base64'),
                'Accept': 'application/json'
            }
        }
    }

    _get(props) {
        return request.getAsync(_.extend(this.props, props));
    }

    _post(props) {
        return request.postAsync(_.extend(this.props, props));
    }

    getBalance() {
        return this._get({
            url: this.urls.base + this.urls.balance
        });
    }

    getPreview(_text) {
        return this._post({
            url: this.urls.base + this.urls.preview,
            json: {
                text: _text
            }
        });
    }

    sendOne(_from, _to, _text) {
        return this._post({
            url: this.urls.base + this.urls.sendOne,
            json: {
                from: _from,
                to: _to,
                text: _text
            }
        });
    }

    sendMulti(_messages) {
        return this._post({
            url: this.urls.base + this.urls.sendMulti,
            json: _messages
        });
    }

    sendAdvanced(_messages) {
        return this._post({
            url: this.urls.base + this.urls.sendAdvanced,
            json: _messages
        });
    }

    getReports(_bulkId, _msgId, _limit) {
        if (!_limit) _limit = 50;

        return this._get({
            url: this.urls.base + this.urls.reports,
            json: {
                bulkId: _bulkId,
                messageId: _msgId,
                limit: _limit
            }
        })
    }

    getNumberContext(_numbers) {
        return this._post({
            url: this.urls.base + this.urls.numberContext,
            json: {
                to: _numbers
            }
        })
    }
}

module.exports = SMSBip;
