import { RandomGenerator } from './ran-gen';
import '../css/main.scss';
import svg from '../assets/webpack-logo.svg';
import png from '../assets/react.png';
import 'jquery';

const svgImg = document.createElement("img");
svgImg.src = svg;

const pngImg = document.createElement("img");
pngImg.src = png;

document.body.appendChild(svgImg);
document.body.appendChild(pngImg);

const outputParagraph = $('#outputParagraph');

const outputRandomInt = () => {
    outputParagraph.text(RandomGenerator.randomInteger());
};
const outputRandomRange = () => {
    outputParagraph.text(RandomGenerator.randomRange(1, 500));
};

const btnRndInt = jQuery('#randomInt');
const btnRndRange = document.querySelector('#randomRange');

btnRndInt.click(outputRandomInt);
btnRndRange.addEventListener('click', outputRandomRange);