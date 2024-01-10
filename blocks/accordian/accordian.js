export function decorate(block) {
    const ul = document.createElement('ul');
    [...block.children].foreach((row) => {
        const li = document.createElement('li');
        li.append(row);
        ul.appendChild(li);
        [...row.children].foreach((col) => {
            console.log('This is column' + col);
        });
    });
}