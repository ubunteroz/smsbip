# SMSBip

Infobip SMS API wrapper for NodeJS, created by Surya Handika Putratama (<mailto:ubunteroz@gmail.com>). Licensed under GNU Lesser General Public License v3.0 (see LICENSE).

**NOTE:** This library is neither associated with nor supported by Infobip. API changes may occur at anytime, so I give no guarantees if something breaks or doesn't work. I will do my best to update this library. Bugfixes, improvements, and pull requests are welcome!

## Installation

    $ npm install smsbip

## Usage

Multiple instance of SMSBip is supported, in case you want to send SMSes from multiple accounts.

```javascript
const SMSBip = require('smsbip');
const sms = new SMSBip('username', 'password');
```

A few notes:

-   This library is using Bluebird's implementation of Promise/A+ to handle asynchronous HTTP request. Native `Promise` should be compatible. No callbacks, sorry.
-   All responses are in RequestJS format. You can find the JSON data at `response.body`.
-   This library _does not_ validate or modify any request and response data, all data are left as is. Consult the [official API documentation](https://dev.infobip.com) for request and response data format reference.

### Get account balance

See <https://dev.infobip.com/docs/account-balance>

```javascript
sms.getBalance()
    .then(function(response) {
        console.log(response.body);
    }).catch(function(err) {
        console.error(err);
    });
```

### Get message preview

See <https://dev.infobip.com/docs/sms-preview>

```javascript
sms.getPreview('Hello, guys!')
    .then(function(response) {
        console.log(response.body);
    }).catch(function(err) {
        console.error(err);
    });
```

### Send single textual message

See <https://dev.infobip.com/docs/send-single-sms>

```javascript
// Send to one destination
sms.sendOne('GLOBALSMS', '628521234567', 'Hello!')
    .then(function(response) {
        console.log(response.body);
    }).catch(function(err) {
        console.error(err);
    });

// Send to multiple destinations
let destinations = ['628521234567', '628527654321'];
sms.sendOne('GLOBALSMS', destinations, 'Hello!')
    .then(function(response) {
        console.log(response.body);
    }).catch(function(err) {
        console.error(err);
    });
```

### Send multiple textual message

See <https://dev.infobip.com/docs/send-multiple-sms>

```javascript
sms.sendMulti({
    messages: [{
        from: 'GLOBALSMS',
        to: '628521234567',
        text: 'Hello, brother!'
    }, {
        from: 'INFOSMS',
        to: '628527654321',
        text: 'Hello, mom!'
    }]
}).then(function(response) {
    console.log(response.body);
}).catch(function(err) {
    console.error(err);
});
```

### Get delivery reports

See <https://dev.infobip.com/docs/delivery-reports>

```javascript
sms.getReports('bulkId', 'messageId', 100)
    .then(function(response) {
        console.log(response.body);
    }).catch(function(err) {
        console.error(err);
    });
```
