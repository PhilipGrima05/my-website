export default function decorate(block) {
    const ul = document.createElement('ul');
    var rowIterator = 1;
    //console.log([...block.children]);
    [...block.children].forEach((row) => {
        const i = rowIterator++;
        //Main list item, which represent the header.
        const li = document.createElement('li');
        //List item header.
        const headerButton = document.createElement('button');
        headerButton.id = 'accordion-control-' + i;
        headerButton.setAttribute('aria-controls', 'content-' + i);
        headerButton.setAttribute('aria-expanded', false);
        //Setting a styling border for each item.
        if(i > 1){
            headerButton.style.borderTop = '1px solid gray'
        }
        //Container for main content.
        const divContainer = document.createElement('div');
        divContainer.setAttribute('aria-hidden', true);
        divContainer.id = 'content-' + i;
        //divContainer.style.display = 'none';
        //Assigning the row data to each of the created elements.
        headerButton.append([...row.children][1]);
        //Creating the element.
        li.append(headerButton);
        divContainer.append([...row.children][2]);
        li.append(divContainer);
        ul.append(li);
    });
    //Re-setting the block.
    block.textContent = '';
    block.append(ul);
    toggleAccordion();
}

function toggleAccordion() {
    const accordionButtons = document.querySelectorAll('[id^="accordion-control-"]');
    accordionButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            var control = this;
            var accordionContent = control.getAttribute('aria-controls');

            var isAriaExp = control.getAttribute('aria-expanded');
            var newAriaExp = (isAriaExp === "false") ? "true" : "false";
            control.setAttribute('aria-expanded', newAriaExp);

            var isAriaHid = document.getElementById(accordionContent).getAttribute('aria-hidden');
            var contentElement = document.getElementById(accordionContent);
            contentElement.classList.toggle('active');
            if (isAriaHid === "true") {
                contentElement.setAttribute('aria-hidden', "false");
            } else {
                contentElement.setAttribute('aria-hidden', "true");
            }
        });
    });
}