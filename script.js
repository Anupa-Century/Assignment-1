

const track = document.getElementById('promoTrack');
const nextBtn = document.getElementById('promoNext');
const prevBtn = document.getElementById('promoPrev');

let cards = Array.from(track.children);

// clone of the 1st and last cards for infinite loop
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

cards = Array.from(track.children);
let index = 1; // Starting from the 1st real card 

let isAnimating = false; // click lock - রাপিড ক্লিকে যাতে index এলোমেলো না হয়

function getStep(){
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return cardWidth + gap;
}

function moveTo(i, animate = true){
    track.style.transition = animate ? 'transform .5s ease' : 'none';
    track.style.transform = `translateX(${-i * getStep()}px)`;
}

moveTo(index, false);

function goNext(){
    if(isAnimating) return; // transition চলাকালীন নতুন click ignore হবে
    isAnimating = true;
    index++;
    moveTo(index);
}

function goPrev(){
    if(isAnimating) return;
    isAnimating = true;
    index--;
    moveTo(index);
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

// প্রতিটা transition শেষ হলে lock খুলে দেওয়া হয় + প্রয়োজনে সাইলেন্টলি loop করানো হয়
track.addEventListener('transitionend', () => {

    if(index === cards.length - 1){
        index = 1;
        moveTo(index, false);
    }

    if(index === 0){
        index = cards.length - 2;
        moveTo(index, false);
    }

    isAnimating = false; // এখন আবার click করা যাবে
});

window.addEventListener('resize', () => moveTo(index, false));