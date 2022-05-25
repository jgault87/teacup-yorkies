const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector('#new-comment').value.trim();
  console.log(comment_text);

  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);

console.log('connected to comment form');
