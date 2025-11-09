document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        // アイコンとメニューにCSSクラスをトグルで付け外し
        hamburger.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
        
        // WAI-ARIA属性の更新
        const isExpanded = hamburger.classList.contains('is-active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });
});