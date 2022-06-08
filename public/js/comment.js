const newCommentHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const tweet_id = event.target.getAttribute('data-id');
    const comment_text = document
      .querySelector('#comment-content')
      .value.trim();
    console.log('COMMENT', comment_text, tweet_id);

    if (tweet_id && comment_text) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ tweet_id, comment_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace(`/tweet/${tweet_id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  }
};

document
  .querySelector('.submit-button')
  .addEventListener('click', newCommentHandler);
