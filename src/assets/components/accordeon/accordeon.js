const accordeonInit = () => {
    const accordeon = document.querySelector(".accordeon__title");

        accordeon.addEventListener("click", function () {
            this.classList.toggle("accordeon__title_active"); // Управление иконкой аккордеона

            // Показываем / скрываем блок с текстом
            const accordeonItem = this.nextElementSibling;
            if (
                (accordeonItem.style.height === "0px",
                accordeonItem.style.opacity === "0",
                accordeonItem.style.padding === "0px")
            ) {
                accordeonItem.style.height = "100%";
                accordeonItem.style.opacity = "1";
                accordeonItem.style.padding = "25px 0 30px 0";
            } else {
                accordeonItem.style.height = "0px";
                accordeonItem.style.opacity = "0";
                accordeonItem.style.padding = "0px";
            }
        });
}

window.addEventListener('DOMContentLoaded', accordeonInit)