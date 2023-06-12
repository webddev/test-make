const togglersInit = () => {
    const togglers = document.querySelectorAll('.toggler-block__toggler[data-toggle]');
    const blocks = document.querySelectorAll('.toggler-block__body[data-toggle]')

    togglers.forEach((toggle) => {
        toggle.addEventListener('click', (event) => {
            if (event.target.dataset.toggle) {
                showBlock(event.target.dataset.toggle)
            }
            doToggleActive(event.target);
        })
    })

    const showBlock = (block) => {
        blocks?.forEach((item) => {
            item.classList.remove('toggler-block__body_active');
        });
        if (document.querySelector(`.toggler-block__body[data-toggle=${block}]`)) {
            document.querySelector(`.toggler-block__body[data-toggle=${block}]`).classList.add('toggler-block__body_active');
        }
    }

    const doToggleActive = (toggle) => {
        togglers.forEach((item) => {
            item.classList.remove('toggler-block__toggler_active');
        })
        toggle.classList.add('toggler-block__toggler_active');
    }
}

window.addEventListener('DOMContentLoaded', togglersInit)