(async (selector) => {
    const config = await fetch('./config.json');
    const response = await config.json();

    const container = document.querySelector(selector);
    if (!container) return;

    const ul = container.querySelector('ul');
    if (!ul) return;

    ul.innerHTML = '';

    const itemCount = response.sectors.length;
    container.style.setProperty('--_items', itemCount);

    response.sectors.forEach((sector, i) => {
        const sectorElement = document.createElement('li');
        sectorElement.textContent = sector.text;
        sectorElement.style.backgroundColor = sector.color;
        sectorElement.style.setProperty('--_idx', i + 1);
        ul.appendChild(sectorElement);
    });


    const spinButton = document.getElementById('spin-cta');
    const wheel = document.getElementById('wheel-container');
    let animation;
    let previousEndDegree = 0;

    spinButton.addEventListener('click', () => {
        if (animation) {
            animation.cancel();
        }

        const randomAdditionalDegrees = Math.random() * 360 + 1800;
        const newEndDegree = previousEndDegree + randomAdditionalDegrees;

        animation = wheel.animate([
            { transform: `rotate(${previousEndDegree}deg)` },
            { transform: `rotate(${newEndDegree}deg)` }
        ], {
            duration: 4000,
            direction: 'normal',
            easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
            fill: 'forwards',
            iterations: 1
        });

        previousEndDegree = newEndDegree;
    });
})('.ui-wheel-of-fortune');
