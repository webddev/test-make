const menuInit = () => {
    const body = document.querySelector('body');
    const menu = document.querySelector(".info-menu");
    const burger = document.querySelector(".header__menu");
    const closeMenuIcon = document.querySelector(".info-menu__icon-close");

    burger.addEventListener("click", () => {
        menu.classList.add('info-menu_active');
        doPageDisabled();
    });

    closeMenuIcon.addEventListener("click", () => {
        menu.classList.remove('info-menu_active');
        doPageEnabled();
    });

    const doPageDisabled = () => {
        body.classList.add('disabled');
    }
    const doPageEnabled = () => {
        body.classList.remove('disabled');
    }
}

window.addEventListener('DOMContentLoaded', menuInit)