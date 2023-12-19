document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const playOnceBtn = document.getElementById('playOnceBtn');
    const progress = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');

    let isPlaying = false;
    let countdownInterval;

    playPauseBtn.addEventListener('click', function () {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    repeatBtn.addEventListener('click', function () {
        audioPlayer.loop = !audioPlayer.loop;
        repeatBtn.style.color = audioPlayer.loop ? '#ff6600' : '#333';
    });

    playOnceBtn.addEventListener('click', function () {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    });

    audioPlayer.addEventListener('timeupdate', function () {
        const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = progressPercentage + '%';

        const currentTimeMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentTimeSeconds = Math.floor(audioPlayer.currentTime % 60);
        currentTimeDisplay.textContent = `${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;

        const totalTimeMinutes = Math.floor(audioPlayer.duration / 60);
        const totalTimeSeconds = Math.floor(audioPlayer.duration % 60);
        totalTimeDisplay.textContent = `${totalTimeMinutes}:${totalTimeSeconds}`;
    });

    audioPlayer.addEventListener('play', function () {
        countdownInterval = setInterval(function () {
            const remainingTime = audioPlayer.duration - audioPlayer.currentTime;
            const remainingMinutes = Math.floor(remainingTime / 60);
            const remainingSeconds = Math.floor(remainingTime % 60);

            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                totalTimeDisplay.textContent = '0:00';
            } else {
                totalTimeDisplay.textContent = `-${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
            }
        }, 1000);
    });

    audioPlayer.addEventListener('pause', function () {
        clearInterval(countdownInterval);
    });

    const progressBar = document.querySelector('.progress-bar');

    progressBar.addEventListener('click', function (e) {
        const clickX = e.clientX - this.getBoundingClientRect().left;
        const percentage = (clickX / this.offsetWidth) * 100;
        const durationToSet = (percentage / 100) * audioPlayer.duration;

        audioPlayer.currentTime = durationToSet;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const texts = document.querySelectorAll('.text');
    let currentIndex = 0;

    function showNextText() {
        texts[currentIndex].style.display = 'none';

        currentIndex++;
        if (currentIndex >= texts.length) {
            currentIndex = 0;
        }

        texts[currentIndex].style.display = 'block';
    }

    // Hiển thị đoạn văn bản đầu tiên
    texts[currentIndex].style.display = 'block';

    // Thực hiện hiển thị và ẩn tự động mỗi 30 giây
    setInterval(showNextText, 3000);
});
