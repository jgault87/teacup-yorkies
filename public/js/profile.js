const newFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#project-desc').value.trim();

  if (content) {
    const response = await fetch(`/api/tweets`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};



const delButtonHandler = async (event) => {
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/tweets/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};


document
  .getElementById('howlBtn')
  .addEventListener('click', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);


  

  const avatars = ["cat1.jpg", "cat2.jpg", "cat3.jpg", "cat4.jpg", "cat5.jpg", "dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg", "dog5.jpg"];

 avatars.forEach(src => {
   const img = document.createElement('img');
   img.src = `images/${src}`;
   img.title = src;
   img.width = 150;
   img.height = 150;
   window["card-deck"].appendChild(img);

   console.log(img.title);



 });