'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ElasticSliderCore from 'elasticslider-core';
import ElasticSlider from '../../dist/react-elasticslider.min.js';

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
