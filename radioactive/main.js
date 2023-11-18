const ctx = $("#canvas")[0].getContext('2d');
const canvas = $("#canvas")[0]

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const audioSource = new Audio();
audioSource.src = "/music/mainLevels/696528.mp3";
offset = 0;