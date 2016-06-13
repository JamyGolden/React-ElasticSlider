'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import ElasticSlider from '../../dist/react-elasticslider.min.js';
import ElasticSlider from '../js/elasticslider.js';
const html = require('html!./index.html');
console.log(ElasticSlider);
var options = {
    activeSlide: 1,
    enableArrows: true,
    enablePagination: true,
    autoPlayDuration: 0,
    animation: 'slide',
};

ReactDOM.render(
    <ElasticSlider options={options}>
        <div>
            lucky number 1
        </div>
        <div>
            slide 2
        </div>
        <div>
            number 3
        </div>
    </ElasticSlider>,
    document.getElementById('app')
);
