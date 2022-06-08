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

//meowfacts API call and display data to innerHTML for a random cat fact
const catFact = () => {
  fetch('https://meowfacts.herokuapp.com')
    .then((data) => {
      return data.json();
    })
    .then((post) => {
      //write to populate data into div
      let catFactEl = document.getElementById('catFact');
      if (catFactEl) {
        catFactEl.innerHTML = `Random cat fact: <br> ${post.data.toString()}`;
      }
    });
};

catFact();

//randomDog API call and display picture to innerHTML for random dog image
const dogPic = () => {
  fetch('https://random.dog/woof.json')
    .then((data) => data.json())
    .then((post) => {
      //write to populate data into div

      let dogFactEl = document.getElementById('dogFact');
      if (dogFactEl) {
        dogFactEl.innerHTML = `Random dog pic: <a href="${post.url}"> <img src="${post.url}" class="border border-info rounded-circle" alt="Click to watch video" width="100%" height="200"></a>`;
      }
    });
};

dogPic();
