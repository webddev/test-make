const inputHandler = () => {
    const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const input = document.querySelector("input[type=email]");
    const errorTitle = document.querySelector(".input-field__error-title");
    const errorText = document.querySelector(".input-field__error-text");

    const isEmailValid = (value) => {
        return EMAIL_REGEXP.test(value);
    }

    const validationOnInput = () => {
        if (isEmailValid(input.value)) {
            input.style.borderColor = "green";
            errorText.classList.remove("input-field__error-text_active");
            errorTitle.classList.remove("input-field__error-title_active");
        } else {
            input.style.borderColor = "red";
            errorText.classList.add("input-field__error-text_active");
            errorTitle.classList.add("input-field__error-title_active");
        }
    }

    input.addEventListener("input", validationOnInput);
}

window.addEventListener('DOMContentLoaded', inputHandler)