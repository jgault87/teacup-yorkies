const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);


const catFact = () => {
  fetch('https://meowfacts.herokuapp.com')
    .then(data => {
      return data.json();
    })
    .then(post => {
      //write to populate data into div
      
      document.getElementById("catFact").innerHTML = post.data.toString();
    })
};

catFact(); 



const dogFact = () => {
  fetch('https://random.dog/woof.json')
    .then(data => data.json())
    .then(post => {
      //write to populate data into div
      
      document.getElementById("dogFact").innerHTML = `<img src="${post.url}" alt="random dog image" width="300" height="300" >`;
    })
  };

dogFact(); 

