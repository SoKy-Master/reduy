      const prizes = {
    0: 'https://raw.githack.com/SoKy-Master/reduy/main/1.png',
    1: 'https://raw.githack.com/SoKy-Master/reduy/main/2.png',
    2: 'https://raw.githack.com/SoKy-Master/reduy/main/3.png',
    3: 'https://raw.githack.com/SoKy-Master/reduy/main/4.png',
    4: 'https://raw.githack.com/SoKy-Master/reduy/main/5.png',
    5: 'https://raw.githack.com/SoKy-Master/reduy/main/6.png',
};

const total_items = 6;
const minimum_jumps = 30; 
let arpantek = -1;
let jumps = 0;
let speed = 30;
let timer = 0;
let prize = -1;

function runCircle() {
    $(`[data-order="${arpantek}"]`).removeClass('is-active');

    arpantek += 1;

    if (arpantek > total_items - 1) {
        arpantek = 0;
    }

    $(`[data-order="${arpantek}"]`).addClass('is-active');
}

function generatePrizeNumber() {
    return Math.floor(Math.random() * total_items);
}

function controllSpeed() {
    jumps += 1;
    runCircle();
    if (jumps > minimum_jumps + 10 && prize === arpantek) {
        clearTimeout(timer);
        
        $('.open_rewards').fadeIn('slow');
        $('.popup-item').attr('src',prizes[arpantek]);

        prize = -1;
        jumps = 0;

    } else {
        if (jumps < minimum_jumps) {
            speed -= 5; 
        } else if (jumps === minimum_jumps) {
            const random_number = generatePrizeNumber();
            prize = random_number;
        } else {
           
            if ( (jumps > minimum_jumps + 10) && prize === (arpantek + 1) ) {
                speed += 600;
            } else {
                speed += 20; 
            }
        }
        if (speed < 40) {
            speed = 40;
        }

        timer = setTimeout(controllSpeed, speed);
    }
}

function init() {
    jumps = 0;
    speed = 100;
    prize = -1;
    controllSpeed();
}

$(document).ready(() => {
    $('#js-start').on('click', init);
});
