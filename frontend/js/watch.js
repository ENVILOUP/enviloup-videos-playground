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

  console.debug(video)

  const videoContainer = document.getElementById('video');
  const detailContainer = videoContainer.getElementsByClassName('detail')[0]
  const detailTitleContainer = detailContainer.getElementsByClassName('title')[0]
  const detailDescriptionContainer = detailContainer.getElementsByClassName('description')[0]

  detailTitleContainer.textContent = video['title']
  detailDescriptionContainer.innerHTML = `<p>${video['descrition']}</p>`
}

window.addEventListener('load', loadVideoData)
