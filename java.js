document.addEventListener("DOMContentLoaded", function() {
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const voteMessage = document.getElementById('vote-message');
    const nextRoundBtn = document.getElementById('next-round');
    const leaderboard = document.getElementById('leaderboard');
    const votesElements = [
        document.getElementById('votes1'), // Egor
        document.getElementById('votes2'), // Ivan
        document.getElementById('votes3'), // Alex
        document.getElementById('votes4'), // Dima
        document.getElementById('votes5'), // Sasha
        document.getElementById('votes6'), // Misha
    ];

    let selectedImage = null;
    let roundCount = 0;

  const imagePairs = [
        ['./img/Али1.jpg', './img/Тема1.jpg'],
        ['./img/Дамиль3.jpg', './img/я2.jpg'],
        ['./img/негр1.jpg', './img/Тема2.jpg'],
    ];

    const votes = [0, 0, 0, 0, 0, 0]; // Счетчики голосов для каждого человека

    function voteForImage(imageId) {
        if (selectedImage) {
            selectedImage.classList.remove('voted');
        }

        const votedImage = document.getElementById(imageId);
        votedImage.classList.add('voted');
        selectedImage = votedImage;

        const personIndex = parseInt(imageId.charAt(imageId.length - 1)) - 1; // Извлечение индекса (0-5)

        votes[personIndex]++; // Увеличиваем счетчик голосов

        voteMessage.textContent = `You voted for ${votedImage.getAttribute('data-name')}!`;

        nextRoundBtn.style.display = 'block';
        nextRoundBtn.classList.add('button-highlighted');  
    }

    image1.addEventListener('click', () => {
        voteForImage('image1');
    });

    image2.addEventListener('click', () => {
        voteForImage('image2');
    });

    nextRoundBtn.addEventListener('click', () => {
        roundCount++;

        if (roundCount >= imagePairs.length) {
            showLeaderboard();
        } else {
            resetImages();
        }
    });

    function resetImages() {
        selectedImage.classList.remove('voted');
        selectedImage = null;
        voteMessage.textContent = 'Click on an image to vote!';
        nextRoundBtn.style.display = 'none';
        nextRoundBtn.classList.remove('button-highlighted');

        // Обновляем изображения для следующего раунда
        document.querySelector('#image1 img').src = imagePairs[roundCount][0];
        document.querySelector('#image2 img').src = imagePairs[roundCount][1];
    }

    function showLeaderboard() {
        nextRoundBtn.style.display = 'none';
        voteMessage.textContent = 'Voting is over! Here are the results:';
        
        // Обновляем таблицу лидеров
        for (let i = 0; i < votes.length; i++) {
            votesElements[i].textContent = votes[i];
        }

        leaderboard.style.display = 'block';
    }
});
