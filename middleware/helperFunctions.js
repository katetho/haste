module.exports = {
  distribute: function (items) {
    if(items.length>=2){
      items[0].openDiv=true;
      let mid = Math.round(items.length/2);
      items[mid-1].closeDiv=true;
      items[mid].openDiv=true;
      items[items.length-1].closeDiv=true;
      items.forEach((item, i, arr)=>{
        arr[i].deadlineUI = item.deadline.toLocaleString();
      })
    }
    else {
        items[0].openDiv=true;
        items[0].closeDiv=true;
    }
  }
}
