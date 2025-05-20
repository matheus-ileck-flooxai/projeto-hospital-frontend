
const showForm = () => {
    const tabela = document.querySelector('.users-table');
    tabela.style.display = 'none';
    const form = document.querySelector('.form');
    form.style.display = 'flex';

    const button = document.querySelector('.new-user-button');
    button.style.display = 'none';

    const content = document.querySelector('.content')
    content.classList.add('forms')



}

module.exports = showForm
