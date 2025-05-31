// Mouse tracking for button reflection effect
document.querySelectorAll('.crystal-btn').forEach(button => {
    button.addEventListener('mousemove', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', x);
        button.style.setProperty('--y', y);
    });
});

// Parallax effect for background crystals
document.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const shapes = document.querySelectorAll('.crystal-shape');
    if (shapes.length >= 4) {
        shapes[0].style.transform = `translate(${x * 10 - 5}px, ${y * 10 - 5}px) rotate(${x * 360}deg)`;
        shapes[1].style.transform = `translate(${x * -15 + 7.5}px, ${y * -15 + 7.5}px) rotate(${x * -360}deg)`;
        shapes[2].style.transform = `translate(${x * 8 - 4}px, ${y * 8 - 4}px) rotate(${x * 180}deg)`;
        shapes[3].style.transform = `translate(${x * -10 + 5}px, ${y * -10 + 5}px) rotate(${x * -180}deg)`;
    }
});