var likeBtns = document.querySelectorAll('.like');

likeBtns.forEach(async function (likeBtn) {
  likeBtn.addEventListener('click', async function (event) {
    var likeBtnId = event.target.id;
    let tweetId = parseInt(likeBtnId.split('-')[0]);
    let currentLikes = parseInt(likeBtnId.split('-')[1]) || 0;

    console.log('currentLikes', currentLikes);
    const response = await fetch(`/api/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({ likes: currentLikes + 1 }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      window.alert('Like added successfully!');
      document.location.reload(true);
    } else {
      alert('Failed to update post');
    }
  });
});
