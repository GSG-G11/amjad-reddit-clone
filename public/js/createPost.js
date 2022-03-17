const postForm = document.querySelector('.postForm');
const contentInput = document.querySelector('.content');
const imgUrl = document.querySelector('.url');
const createPostBtn = document.querySelector('.create-post-btn');
const cancelPostBtn = document.querySelector('.cancel-post-btn');
const badInputMsg = document.querySelector('.errorMsg');

if (!document.cookie) {
  postForm.style.display = 'none';
}

const cancelForm = () => {
  contentInput.style.height = '4rem';
  imgUrl.value = '';
  contentInput.value = '';
  imgUrl.classList.remove('showInput');
  createPostBtn.classList.remove('showInput');
  cancelPostBtn.classList.remove('showInput');
};

contentInput.addEventListener('click', () => {
  contentInput.style.height = 'initial';
  imgUrl.classList.add('showInput');
  createPostBtn.classList.add('showInput');
  cancelPostBtn.classList.add('showInput');
});

cancelPostBtn.addEventListener('click', cancelForm);

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!document.cookie) {
    badInputMsg.innerText = "hhhh, you can't do that hacker";
    return;
  }

  if (contentInput.value.trim() === '' || contentInput.value.trim().length < 1) {
    badInputMsg.innerText = 'come on, at least enter 1 character!';
    return;
  }

  const postContent = {
    content: contentInput.value,
    date: Date.now(),
    img: imgUrl.value || null,
  };

  (async () => {
    const userId = await getUserId();

    console.log(userId);
    await request(`/api/v1/post/${userId}`, 'POST', postContent);

    const response = await request(`/api/v1/post/${userId}`);

    if (!response.ok) {
      badInputMsg.innerText = 'something went wrong!';
      return;
    }

    const userPosts = await response.json();
    const lastPost = userPosts.filter(
      (post, i, arr) => arr.indexOf(post) === arr.indexOf(arr.at(-1)),
    );

    renderPost(lastPost);
  })();

  contentInput.value = '';
  badInputMsg.innerText = '';
});
