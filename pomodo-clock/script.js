$(document).ready(function () {
  var beep = $("#beep")[0];
  var count = parseInt($("#time-left").html()) * 60;
  console.log(count);
  var breakTime = parseInt($("#break-length").html()) * 60;
  var leftTime = 0;
  var counter;
  var startBreak;

  function timer() {
    $("#start_stop").html("Pause");
    leftTime = 1;
    count = count - 1;
    if (count === 0) {
      setTimeout(() => {beep.play();}, 1000);
      breakTime = parseInt($("#break-length").html()) * 60;
      breakTime = breakTime + 1;
      clearInterval(counter);
      startBreak = setInterval(breakTimer, 1000);
    }
    let minutes = Math.floor(count / 60);
    let seconds = count - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    $("#time-left").html(minutes + ":" + seconds);

  }

  function breakTimer() {
    $("#timer-label").html("Break");
    leftTime = 2;
    breakTime = breakTime - 1;
    if (breakTime === 0) {
      setTimeout(() => {beep.play();}, 1000);
      count = parseInt($("#session-length").html()) * 60;

      count = count + 1;
      clearInterval(startBreak);
      counter = setInterval(timer, 1000);
      $("#timer-label").html("Session");
      leftTime = 1;
    }
    let minutes = Math.floor(breakTime / 60);
    let seconds = breakTime - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    $("#time-left").html(minutes + ":" + seconds);

  }

  //Start-Time

  $("#start_stop").click(function () {
    if (leftTime === 0) {
      counter = setInterval(timer, 1000);
      leftTime = 1;
      /*  count = count * 60;*/
    } else if (leftTime === 1) {
      clearInterval(counter);
      $("#start_stop").html("Start");
      leftTime = 0;
    } else if (leftTime === 2) {
      clearInterval(startBreak);
      $("#start_stop").html("Start");
      leftTime = 3;
    } else if (leftTime === 3) {
      $("#start_stop").html("Pause");
      startBreak = setInterval(breakTimer, 1000);
      leftTime = 2;
    }

  });

  //

  ////Buttons///////
  $("#reset").click(function () {
    $("#time-left").html("25:00");
    $("#session-length").html("25");
    $("#break-length").html("5");
    $("#start_stop").html("Start");
    $("#timer-label").html("Session");
    clearInterval(counter);
    clearInterval(startBreak);
    count = parseInt($("#time-left").html()) * 60;
    breakTime = parseInt($("#break-length").html()) * 60;
    leftTime = 0;
    beep.pause();
    beep.load();
  });


  $("#session-decrement").click(function () {
    if (count > 60) {
      count = count - 60;
      $("#session-length").html(count / 60);
      let minutes = Math.floor(count / 60);
      let seconds = count - minutes * 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      $("#time-left").html(minutes + ":" + seconds);
      console.log(count);
    }
  });

  $("#session-increment").click(function () {
    if (count < 60 * 60) {
      count = count + 60;
      $("#session-length").html(count / 60);
      let minutes = Math.floor(count / 60);
      let seconds = count - minutes * 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      $("#time-left").html(minutes + ":" + seconds);
      console.log(count);
    }});

  $("#break-decrement").click(function () {
    if (breakTime > 60) {
      breakTime = breakTime - 60;
      $("#break-length").html(breakTime / 60);
      console.log(breakTime);
    }
  });

  $("#break-increment").click(function () {
    if (breakTime < 3600) {
      breakTime = breakTime + 60;
      $("#break-length").html(breakTime / 60);
      console.log(breakTime);
    }});
});