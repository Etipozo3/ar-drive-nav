export async function startCamera() {
  const video = document.getElementById('video');

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: { ideal: "environment" } },
    audio: false
  });

  video.srcObject = stream;
}
