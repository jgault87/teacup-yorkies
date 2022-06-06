const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);

const catFact = () => {
  fetch('https://meowfacts.herokuapp.com')
    .then((data) => {
      return data.json();
    })
    .then((post) => {
      //write to populate data into div

      document.getElementById(
        'catFact'
      ).innerHTML = `Random cat fact: <br> ${post.data.toString()}`;
    });
};

catFact();

const dogPic = () => {
  fetch('https://random.dog/woof.json')
    .then((data) => data.json())
    .then((post) => {
      //write to populate data into div

      document.getElementById(
        'dogFact'
      ).innerHTML = `Random dog pic: <img src="${post.url}" class="border border-info rounded-circle" alt="random dog image" width="100%" height="200" >`;
    });
};

dogPic();
