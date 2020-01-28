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
                item.timeLeft = "Time has expired"
            }
        }
    }
}