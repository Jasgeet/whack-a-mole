document.addEventListener('DOMContentLoaded', () => {
    
    // allocate an id to all the 9 small boxes (0 to 8), need - this id is randomly generated later
    // and small box with that generated id will contain the mole  
    let smallBoxes = document.querySelectorAll('.small-box');
    for(let i = 0; i < 9; i ++) {
        smallBoxes[i].setAttribute('data-id', i);
    }

    // Start game when Play button clicked, initialize timer, fetch id timer-count (span) element,  
    // initialize score, fetch id score-count (span) element
    let btn = document.querySelector('button');
    // initializing btnClickCount as 0, keeps track of number of times button is clicked, if clicked once
    // should act as play button, if clicked 2nd time, then should act as reset button
    let btnClickCount = 0;
    let timer = 60;
    let timeLeft = document.querySelector('#timer-count');
    let score = 0;
    let currentScore = document.querySelector('#score-count');

    // when button is clicked do following
    btn.addEventListener('click', () => {

        // incrementing btnClickCount when button is clicked 
        btnClickCount ++;
        if(btnClickCount == 1) {
            // convert Play button to Reset button if clicked for the first time
            btn.textContent = 'Reset';
            // display timer and score on screen
            currentScore.textContent = score;
            timeLeft.textContent = timer; 
            // call showMole function to display mole at different positions in small boxes
            showMole();
            // decrement timer value by 1 after every 1 sec till it reaches 0 then stop timer
            // store the function decrementing the timer in a variable - decrementer, need- so that clearInterval 
            // can be used 
            let decrementer = setInterval(() => {
                timer -= 1;
                timeLeft.textContent = timer;
                if(timer == 0) {
                    // end timer decrementer when timer becomes 0
                    clearInterval(decrementer);
                    // alert the final score
                    alert(`Game Over \r\nYour final score is: ${score}`);
                }
            }, 1000);
        } 
        // if button is clicked for the 2nd time, reload the page
        else {
            location.reload();
        }  
    });

    // function showMole() to display mole at different small boxes as soon as Play button is clicked
    // initializing smallBoxId variable to store data-id of small box where mole will be displayed
    let smallBoxId = Math.floor(Math.random() * 9);
    // declare smallBox variable with data-id smallBoxId which will contain the mole
    let smallBox;
    function showMole() {
        // following are steps executed in showMole() 1. immediatelty after play button is clicked
        // assign smallBox variable the small-box (class) element with data-id smallBoxId generated above
        smallBox = document.querySelector(`[data-id="${smallBoxId}"]`);
        // add class mole (see .mole class selector in CSS) to element smallBox 
        smallBox.classList.add('mole');
        // when mole gets displayed in the smallBox add mousedown event to that smallBox which will execute updateScore 
        // function when mousedown event occurs
        smallBox.addEventListener('mousedown', updateScore);
        // following are steps executed in showMole() 2. after mole gets displayed for the 1st time for 800ms
        // change mole's position after fixed interval of 800ms, use variable moveMole to use in clearInterval 
        let moveMole = setInterval(() => {
        
            // remove the mole class added to smallBox earlier (before 800ms) - added either by part 1. or part 2.
            // of showMole function
            smallBox.classList.remove('mole');
            // remove the event listener from smallBox element so that score doesn't incease when the smallBox is
            // clicked
            smallBox.removeEventListener('mousedown', updateScore);
            // assign a new random data-id value to smallBoxId variable
            smallBoxId = Math.floor(Math.random() * 9);
            // select the small-box (class) element with data-id smallBoxId
            smallBox = document.querySelector(`[data-id="${smallBoxId}"]`);
            // display mole in that small-box element 
            smallBox.classList.add('mole');
            // when mole displayed add mousedown event to that smallBox and execute updateScore when mousedown event
            // occurs
            smallBox.addEventListener('mousedown', updateScore);
            // check if time is finished, then stop mole's movement and stop score from increasing when mole is 
            // clicked by removing the event listener added by above code
            if(timer == 0) {
                clearInterval(moveMole);
                smallBox.removeEventListener('mousedown', updateScore);
            }
        }, 800); 
    }

    // increment and show score when mole is clicked 
    function updateScore() {
        score += 1;
        currentScore.textContent = score;
    }
    
}); 