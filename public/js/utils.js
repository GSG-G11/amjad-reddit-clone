const postsContainer = document.querySelector('.posts');
const errorMsg = document.querySelector('.errorMsg');

const request = (url, method, data) =>
  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

const createEl = (tag, className, text) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
};

const getDate = (date) =>
  date.toLocaleString('en-US', {
    weekday: 'short', // long, short, narrow
    day: 'numeric', // numeric, 2-digit
    // year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    hour: 'numeric', // numeric, 2-digit
    // minute: 'numeric', // numeric, 2-digit
    // second: 'numeric', // numeric, 2-digit
  });

const validateInput = (el, inputIsValid, msg) => {
  errorMsg.textContent = inputIsValid ? '' : msg;
  el.className = inputIsValid ? 'goodInput' : 'badInput';
};

const renderPost = (posts) => {
  posts.map(({ username, date, post_content: postContent }) => {
    const postCard = createEl('div', 'post');
    const header = createEl('div', 'header');
    const votes = createEl('div', 'votes');
    const voteUp = createEl('i', 'fa-solid fa-circle-up');
    const votesNum = createEl('span', 'votes-num', '8.4k');
    const voteDown = createEl('i', 'fa-solid fa-circle-down');
    const profilePic = createEl('img', 'profile-pic');
    const postAuthor = createEl('span', 'author', username);
    const timeStamp = createEl('span', 'date', getDate(new Date(date)));

    const content = createEl('div', 'content', postContent);

    const picture = createEl('picture');
    const postImage = createEl('img');

    const actions = createEl('div', 'actions');

    const commentAction = createEl('div', 'action comment');
    const commentIcon = createEl('i', 'fa-solid fa-message');
    const commentInfo = createEl('span', 'info', ' 5 Comments');

    const shareAction = createEl('div', 'action share');
    const shareIcon = createEl('i', 'fa-solid fa-share');
    const shareInfo = createEl('span', 'info', ' share');

    const saveAction = createEl('div', 'action save');
    const saveIcon = createEl('i', 'fa-solid fa-bookmark');
    const saveInfo = createEl('span', 'info', ' Save');

    postImage.src = '../assets/post.jpeg';
    profilePic.src = '../assets/proflepic.jpeg';
    commentAction.append(commentIcon, commentInfo);
    shareAction.append(shareIcon, shareInfo);
    saveAction.append(saveIcon, saveInfo);

    actions.append(commentAction, shareAction, saveAction);
    picture.append(postImage);
    votes.append(voteUp, votesNum, voteDown);
    header.append(votes, profilePic, postAuthor, timeStamp);

    postCard.append(header, content, picture, actions);
    postsContainer.append(postCard);
  });
};
