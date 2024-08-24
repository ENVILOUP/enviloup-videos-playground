const videoUploadForm = document.getElementById('videoupload');
const videoFormField = document.getElementById('video-video');
const videoProgress = document.getElementById('video-video-progress')
const videoThumbnailFormField = document.getElementById('video-thumbnail');


const loadAdmin = async (event) => {
  if (window.location.pathname !== '/admin') {
    return;
  }

  const api = new Api();
}


const uploadVideo = async (event) => {
  console.info('Upload video data');

  const api = new Api();

  event.preventDefault();

  const formData = new FormData(videoUploadForm);

  console.debug(formData);
}


function videoFieldHandle(input) {
  if (input.files.length > 0) {
    const file = input.files[0];
  }
}


function thumbnailHandle(input) {
  if (input.files.length > 0) {
    const file = input.files[0];
  }
}


window.addEventListener('load', loadAdmin)

videoUploadForm.addEventListener('submit', uploadVideo);

videoFormField.addEventListener('change', function () {
  videoFieldHandle(this);
});

videoThumbnailFormField.addEventListener('change', function () {
  thumbnailHandle(this);
});

