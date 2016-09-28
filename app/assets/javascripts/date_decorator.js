var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

Date.prototype.getMonthName = function() {
  return(monthNames[this.getMonth()])
};
