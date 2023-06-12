const initMenu = () => {
    const links = document.querySelectorAll("[data-nav]");
    const sections = document.querySelectorAll("section");

    sections?.forEach((section) => {
        if (window.pageYOffset + 70 >= section.offsetTop) {
            links.forEach((link) => {
                link.classList.remove("menu__link_active");
                if (link.dataset.nav === section.id) {
                    link.classList.add("menu__link_active");
                }
            });
        }
    });
    links?.forEach((link) => {
        link.addEventListener('click', (event) => {
            if (event.currentTarget.dataset.nav) {
                scrollToBlock(event.currentTarget.dataset.nav);
            }
        })
    })
    const scrollToBlock = (block) => {
        const modelBlock = document.querySelector(`#${block}`)
        modelBlock.scrollIntoView({block: 'start'});
    }
}

window.addEventListener("scroll", initMenu)
window.addEventListener("resize", initMenu)