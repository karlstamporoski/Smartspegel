fetch("/static/calender-data.json")
  .then(response => response.json())
  .then((json) => {
      var output = '';
      json.entries.forEach(elem => {
          output += `${elem.when} ${elem.title} ${elem.time} <br>`;
      })
      var cal = document.querySelector('.CalenderWidget');
          cal.innerHTML = output
  });