(function CARD_CONTROLLER(){
    console.log('CARD_CONTROLLER CONNECTED');
    const cards = document.querySelectorAll('.aside__card');
    Array.prototype.forEach.call(cards, card => {
        let down, up, link = card.querySelector('.aside__title a');
        card.onmousedown = () => down = +new Date();
        card.onmuseup = () => {
            up = +new Date();
            if((up-down) < 200) {
                link.click();
            }
        }
    });
})();



