// >> Globals Functions

function createElement(tagName, options = {}) {
    const element = document.createElement(tagName);

    options.classes ? element.classList.add(...options.classes) : null;
    options.text ? element.innerText = options.text : null;

    return element;
}

function createIcon(classes) {
    return createElement('i', { classes });
}

function createTextElement(tagName, text, classes) {
    return createElement(tagName, { text, classes });
}

export const onButton = (elementDoom, event, callback) => {
    elementDoom.addEventListener(event, (e) => {
        e.key === 'Enter' || e.type === 'click' ? callback() : null
    })
}

// >> Internal Functions

export const updateUserList = (users, list) => {
    list.innerHTML = '';
    users.forEach(user => {
        const li = createElement('li', { classes: ['text-primary', 'bg-body-tertiary', 'py-3', 'px-2'] });
        const icon = createIcon(['bi', 'bi-person-circle', 'pe-2']);
        const span = createTextElement('span', user);

        li.append(icon, span);
        list.append(li);
    });
}

export const updateCurrentUser = (currentUser, elementDoom) => {
    elementDoom.innerText = currentUser;
}

export const appendMessage = (socket, same, boxMessage) => {
    const messageList = createElement('li', { classes: ['list-group-item', 'py-2'] });
    const icon = createIcon(['bi', 'bi-person-circle', 'pe-2']);
    const userSpan = createTextElement('span', socket.id, ['fw-bold']);
    const messageDiv = createElement('div', { classes: ['d-inline-block', 'rounded-1', 'bg-body-secondary', 'px-3', 'py-1'] });
    const p = createTextElement('p', socket.message, ['text-secondary', 'm-0']);

    if (same) {
        messageList.classList.add('text-end');
    }

    messageDiv.append(p);
    messageList.append(icon, userSpan, document.createElement('br'), messageDiv);
    boxMessage.appendChild(messageList);
}
