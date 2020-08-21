function notifyMe(message, orderid) {
  console.log('Hi');
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
    var notification = new Notification(message);
  }
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  }
  notification.onclick = function(event) {
    event.preventDefault();
    window.open(`/order/${orderid}`)
  }
}

$(document).ready(function() {
  const socket = io();
  socket.on('neworder', order => {
    notifyMe("New Order. Tap to open.", order);
  });
});
