# SMSBip
Infobip SMS API wrapper for NodeJS. Created by Surya Handika Putratama (<ubunteroz@gmail.com>). Licensed under GNU Lesser General Public License v3.0 (see LICENSE).

## Installation
```
$ npm install smsbip
```

## Usage
```javascript
const SMSBip = require('smsbip');
const sms = new SMSBip('username', 'password');
```

### Get account balance
See <https://dev.infobip.com/docs/account-balance>
```javascript
sms.getBalance()
    .then(function(response) {
        console.log(response.body);
    });
```

### Get message preview
See <https://dev.infobip.com/docs/sms-preview>
```javascript
sms.getPreview('Hello, guys!')
    .then(function(response) {
        console.log(response.body);
    });
```

### Send single textual message
See <https://dev.infobip.com/docs/send-single-sms>
```javascript
// Send to one destination
sms.sendOne('GLOBALSMS', '628521234567', 'Hello!')
    .then(function(response) {
        console.log(response.body);
    })

// Send to multiple destinations
let destinations = ['628521234567', '628527654321'];
sms.sendOne('GLOBALSMS', destinations, 'Hello!')
    .then(function(response) {
        console.log(response.body);
    })
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
})
```
### Get delivery reports
See <https://dev.infobip.com/docs/delivery-reports>
```javascript
sms.getReports('bulkId', 'messageId', 100)
    .then(function(response) {
        console.log(response.body);
    });
```
