'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ElasticSlider from './js/elasticslider';

var options = {
    activeSlide: 1,
    enableArrows: true,
    enablePagination: true,
    autoPlayDuration: 0,
    animation: 'slide',
};
var meh = document.getElementById('app').innerHTML;
ReactDOM.render(
    <ElasticSlider options={options}>
        {meh}
    </ElasticSlider>,
    document.getElementById('app')
);
