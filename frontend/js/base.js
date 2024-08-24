const body = document.body;

class Api {
  constructor() {
    this.baseUrl = `${window.location.origin}/api`;
  }

  async get(endpoint) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async post(endpoint, data) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

const loadVideosList = async (event) => {
  if (window.location.pathname !== '/') {
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

const loadVideoData = async (event) => {
  if (window.location.pathname !== '/watch') {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has('v')) {
    console.error('No video specified in params!');
    return;
  }

  const api = new Api();
  const video_id = urlParams.get('v')
  const video = await api.get(`/video/${video_id}/`);

  console.log(video)

  const videoContainer = document.getElementById('video');
  const detailContainer = videoContainer.getElementsByClassName('detail')[0]
  const detailTitleContainer = detailContainer.getElementsByClassName('title')[0]
  const detailDescriptionContainer = detailContainer.getElementsByClassName('description')[0]

  detailTitleContainer.textContent = video['title']
  detailDescriptionContainer.innerHTML = `<p>${video['descrition']}</p>`
}

window.addEventListener('load', loadVideoData)

const infoAboutPage = async (event) => {
  console.debug(window.location.pathname);
}

window.addEventListener('load', infoAboutPage)


