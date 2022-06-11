import _ from "lodash";

function component() {
    const element = document.createElement(`div`);
    element.innerHTML = _.join(['webpack', ' running.'], ' ');
    return element;
}

document.body.appendChild(component());