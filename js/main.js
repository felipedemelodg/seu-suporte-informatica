import initMenu from "./modules/menu.js";
// Executa as funções quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    // initSlider();
});


const links = document.getElementsByClassName("header__link")
const main = document.querySelector('main');
const home_button = links[0];
const quemsomos_button = links[1];
const servicos_button = links[2];
const contatos_button = links[3];
const classAdd = "c-btn--primary-auto-active"

main.classList.contains('main') && home_button.classList.add(classAdd)
main.classList.contains('main-quem-somos') && quemsomos_button.classList.add(classAdd)
main.classList.contains('main-servicos') && servicos_button.classList.add(classAdd)
main.classList.contains('main-contatos') && contatos_button.classList.add(classAdd)



