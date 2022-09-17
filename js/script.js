
score = 0;
cross = true;//if this is the case then only the score is updated

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {//right key 
        kid = document.querySelector('.kid');
        kid.classList.add('animatekid');
        setTimeout(() => {
            kid.classList.remove('animatekid')
        }, 700);
    }
    if (e.keyCode == 39) {
        kid = document.querySelector('.kid');
        kidX = parseInt(window.getComputedStyle(kid, null).getPropertyValue('left'));//found the current left coordinate
        kid.style.left = kidX + 112 + "px"; //on pressing right arrow moves a little to the right
    }
    if (e.keyCode == 37) {
        kid = document.querySelector('.kid');
        kidX = parseInt(window.getComputedStyle(kid, null).getPropertyValue('left'));
        kid.style.left = (kidX - 112) + "px";
    }
}

setInterval(() => {
    kid = document.querySelector('.kid');
    gameOver = document.querySelector('.gameOver');
    zombie = document.querySelector('.zombie');

    dx = parseInt(window.getComputedStyle(kid, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(kid, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(zombie, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(zombie, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox); //difference in left position of both the characters
    offsetY = Math.abs(dy - oy);//difference in top position of both the characters
    // console.log(offsetX, offsetY)
    if (offsetX < 55 && offsetY < 42) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        if(score){
        updateScore(score-1);}
        zombie.classList.remove('zombieAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 100 && cross) {
        score += 1;
        updateScore(score);
        cross = false; //if once it becomes false it stays false till the mentioned time out only to it is ready for playing again after some time
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(zombie, null).getPropertyValue('animation-duration'));// float because i want the exact position
            newDur = aniDur - 0.1;//to decrease time that is increase the speed of the zombie
            zombie.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);// this increase in speed happens only after 500s of crossing

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}