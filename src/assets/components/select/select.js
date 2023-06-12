const initSelect = () => {
    const select = document.querySelector(".select");
    const selectTitle= select.querySelector(".select__title");
    const selectLabels = select.querySelectorAll(".select__label");

    selectTitle.addEventListener("click", () => {
        if (select.getAttribute("data-state") ===  "active" ) {
            select.setAttribute("data-state", "");
        } else {
            select.setAttribute("data-state", "active");
        }
    });

    selectLabels.forEach((label) => {
        label.addEventListener('click', (event) => {
            selectTitle.textContent = event.target.textContent;
            select.setAttribute("data-state", "");
        })
    })
}

window.addEventListener('DOMContentLoaded', initSelect)