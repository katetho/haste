const Base64 = require('js-base64').Base64;

module.exports = {
    distribute: function(items) {
        if (items.length >= 2) {
            items[0].openDiv = true;
            let mid;
            if (items.length % 2 !== 0) {
                mid = Math.floor(items.length / 2);
            } else {
                mid = Math.round(items.length / 2);
            }
            items[mid - 1].closeDiv = true;
            items[mid].openDiv = true;
            items[items.length - 1].closeDiv = true;
        } else {
            items[0].openDiv = true;
            items[0].closeDiv = true;
        }
    },
    ticketTime: function(items) {
        items.forEach((item, i, arr) => {
            arr[i].deadlineUI = item.deadline.toLocaleString();
        })
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let timeDif = item.deadline - Date.now();
            timeDif = Math.floor(timeDif / (1000 * 60 * 60 * 24));
            if (timeDif > 0) {
                item.timeLeft = "Time left: " + timeDif + " days";
                if (timeDif == 1) {
                    item.timeLeft = "Time left: 1 day";
                }
            } else {
                item.timeLeft = "Ticket has expired"
            }
        }
    },
    encodeIDs: function(items) {
        items.forEach((item) => {
            item.encodedID = Base64.encode(item.id);
        })
    },
    statusCheck: function(items,req) {
        items.forEach((item) => {
            if(item.assigneeID === req.session.user._id){
              item.assignedToCurrent = true;
            }
            else {
              item.assignedToCurrent = false;
            }
            if(item.status === 'closed'){
              item.closed=true;
            }
            else {
              item.closed=false;
            }
        })
    },
    ticketHandler: function(items,req) {
      if(items.length>0) {
      this.distribute(items);
      this.ticketTime(items);
      this.encodeIDs(items);
      this.statusCheck(items,req);
      }
    },
    redirectSignin: function(req, res, next) { //redirect unauthenticated users
        if (req.session && !req.session.user) {
            res.redirect('/users/signin')
        } else {
            next();
        }
    },
    redirectHome: function(req, res, next) { //redirect authenticated users
        if (req.session && req.session.user) {
            res.redirect('/')
        } else {
            next();
        }
    }
}
