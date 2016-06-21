'use strict';
import React from 'react';
import _ from 'lodash';

var ElasticSliderArrows = React.createClass({
    getInitialState: function() {
        return {
            name: 'jamy',
            surname: 'golden'
        };
    },

    render: function() {
        return (
            <div>
                <div class="ElasticSlider-arrowList"
                 ng-if="enableArrows === true">
                    <div ng-click="toSlide('prev');"
                     class="ElasticSlider-arrowItem ElasticSlider-arrowItem--prev">
                        &lt;
                    </div>

                    <div ng-click="toSlide('next');"
                     class="ElasticSlider-arrowItem ElasticSlider-arrowItem--next">
                        &gt;
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ElasticSliderArrows;
