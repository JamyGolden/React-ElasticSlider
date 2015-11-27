'use strict';
import React from 'react';
import _ from 'lodash';
import ElasticSliderCore from '../bower_components/elasticslider-core/dist/elasticslider-core.min';
import ElasticSliderArrows from './elasticslider-arrows';

var ElasticSlider = React.createClass({
    getInitialState: function() {
        console.log(this.props.options)
        return {
            text: 'jamy'
        };
    },

    render: function() {
        return (
            <div>
            {this.props.name}
                <div class="ElasticSlider-container">
                    {this.props.children}
                </div>

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

                <div ng-if="enablePagination === true">
                    <div class="ElasticSlider-pagiList">
                        <div ng-repeat="item in pagiArr"
                         class="ElasticSlider-pagiItem"
                         ng-class="{'ElasticSlider-pagiItem--isActive': item.isActive}"
                         ng-click="setActive(item.index);">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ElasticSlider;
