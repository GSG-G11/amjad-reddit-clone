const postsContainer = document.querySelector('.posts');
const errorMsg = document.querySelector('.errorMsg');

const request = (url, method, data) =>
  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

const createEl = (tag, className, text, id) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  if (id) el.id = id;
  return el;
};

const createImg = (src, className, alt) => {
  const img = document.createElement('img');
  if (src) img.src = src;
  if (className) img.className = className;
  if (alt) img.alt = alt;
  return img;
};

const getDate = (date) =>
  date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

const validateInput = (el, inputIsValid, msg) => {
  errorMsg.textContent = inputIsValid ? '' : msg;
  el.className = inputIsValid ? 'goodInput' : 'badInput';
};

const getUserId = () => request('/id').then((data) => data.json());

const renderPost = (posts) => {
  posts.map(
    ({
      username,
      date,
      user_id: userId,
      post_content: postContent,
      id,
      image_url: imgUrl,
      avatar = '../assets/proflepic.jpeg',
    }) => {
      const postCard = createEl('div', 'post', null, id);
      const header = createEl('div', 'header');
      const votes = createEl('div', 'votes');
      const voteUp = createEl('i', 'fa-solid fa-circle-up');
      const votesNum = createEl('span', 'votes-num', '8.4k');
      const voteDown = createEl('i', 'fa-solid fa-circle-down');
      const profilePic = createImg(avatar, 'profile-pic', 'profile-picture');
      const postAuthor = createEl('span', 'author', username);
      const timeStamp = createEl('span', 'date', getDate(new Date(+date)));
      const content = createEl('div', 'content', postContent);

      const actions = createEl('div', 'actions');
      const picture = createEl('picture');

      const commentAction = createEl('div', 'action comment');
      const commentIcon = createEl('i', 'fa-solid fa-message');
      const commentInfo = createEl('span', 'info', ' 5 Comments');

      const shareAction = createEl('div', 'action share');
      const shareIcon = createEl('i', 'fa-solid fa-share');
      const shareInfo = createEl('span', 'info', ' share');

      const saveAction = createEl('div', 'action save');
      const saveIcon = createEl('i', 'fa-solid fa-bookmark');
      const saveInfo = createEl('span', 'info', ' Save');

      const postImage = createImg(imgUrl, null, 'post-image');

      if (imgUrl) {
        picture.append(postImage);
      }

      const container = createEl('div', 'info-container');
      const cardName = createEl('div');

      cardName.append(profilePic, postAuthor);
      container.append(cardName, timeStamp);

      commentAction.append(commentIcon, commentInfo);
      shareAction.append(shareIcon, shareInfo);
      saveAction.append(saveIcon, saveInfo);
      actions.append(commentAction, shareAction, saveAction);
      votes.append(voteUp, votesNum, voteDown);
      header.append(votes, container);

      postCard.append(header, content, picture, actions);

      postsContainer.prepend(postCard);

      getUserId().then((myId) => {
        if (userId !== myId) return;
      });
      // delete post
      const removeBtn = createEl('i', 'delete-icon fa-solid fa-ban');
      const editBtn = createEl('i', 'edit-icon fa-solid fa-pen');
      header.append(removeBtn, editBtn);

      removeBtn.addEventListener('click', () => {
        request(`/api/v1/post/${userId}`, 'DELETE', { postId: postCard.id }).then(({ status }) => {
          errorMsg.style.color = 'green';
          errorMsg.innerText = 'deleted successfully';

          if (status === 204) postCard.remove();
          else postCard.prepend(errorMsg);
        });
      });

      // edit post
      const editForm = createEl('form', 'editForm');
      const editInput = createEl('textarea', 'editInput');
      const editUrlInput = createEl('input', 'editUrl');
      const confirmBtn = createEl('button', 'confirmBtn', 'confirm');
      const cancelBtn = createEl('button', 'cancelBtn', 'cancel');

      editInput.placeholder = 'edit your post content here';
      editUrlInput.placeholder = 'edit your image url here';
      cancelBtn.type = 'button';
      editUrlInput.type = 'url';

      editForm.append(editInput, editUrlInput, confirmBtn, cancelBtn);
      editInput.value = content.innerText;

      editBtn.addEventListener('click', () => postCard.prepend(editForm));

      cancelBtn.addEventListener('click', () => {
        editForm.remove(editInput, editUrlInput, confirmBtn, cancelBtn);
      });

      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editContent = editInput.value;
        const editUrl = editUrlInput.value;

        request(`/api/v1/post/${userId}`, 'PATCH', {
          postId: postCard.id,
          content: editContent,
          img: editUrl,
        }).then(({ status }) => {
          if (status !== 204) return;

          errorMsg.innerText = 'edited successfully';
          errorMsg.style.color = 'green';

          content.innerText = editContent;
          if (editUrl) {
            postImage.src = editUrl;
            picture.append(postImage);
          }

          editForm.remove(editInput, editUrlInput, confirmBtn, cancelBtn);
        });
      });
    },
  );
};
