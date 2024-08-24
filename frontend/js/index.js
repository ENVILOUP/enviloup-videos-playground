const loadVideosList = async (event) => {
  if (window.location.pathname !== '/' || window.location.pathname !== '/index') {
    return;
  }

  const videosList = document.getElementById('videos-list');
  const api = new Api();

  const videos_list = await api.get('/video/list/');
  console.log(videos_list);

  videosList.innerHTML = '';
  let i = 0;
  for (let video of videos_list) {
    videosList.innerHTML += `
      <div class="video">
        <a href="/watch?v=${video['id']}">
          <div class="thumbnail">
            <img src="img/thumbnail_test.jpg" alt="">
          </div>
          <div class="detail">
            <h3 class="title">${video['title']}</h3>
            <p class="description">${video['descrition']}</p>
            <div class="stats">
              <span class="views">0 views</span>
              &#10070;
              <span class="publish-date">Aug 17 11:15 2024</span>
            </div>
          </div>
        </a>
      </div>`;
  }
}

window.addEventListener('load', loadVideosList)