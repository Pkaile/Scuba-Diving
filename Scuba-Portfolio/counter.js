const animDur = 3500;
const frameDur = 1000 / 60;
const totalFrames = Math.round(animDur / frameDur);
const easeOutQuad = (x) => x * (2 - x);

const runAnimations = () => {
    const countupEls = document.querySelectorAll('.countup');
    countupEls.forEach(animateCountUp);
};
const target = document.querySelector(".observe");
const options = {
    threshold: 0.1,
    rootMargin: '0% 0% -4% 0%',
};
let callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runAnimations();
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
        }
    });
};
let observer = new IntersectionObserver(callback, options);
observer.observe(target);

const animateCountUp = (el) => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);
    const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const curCount = Math.round(countTo * progress);
        
        if (parseInt(el.innerHTML, 10) !== curCount) {
            el.innerHTML = curCount;
        }
        if (frame === totalFrames) {
            clearInterval(counter);
        }
    }, frameDur);
};