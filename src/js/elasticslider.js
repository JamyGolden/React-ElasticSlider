'use strict';
import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import ElasticSliderCore from '../bower_components/elasticslider-core/src/elasticslider';
// import ElasticSliderArrows from './elasticslider-arrows';

var ElasticSlider = React.createClass({
    _disablePagi: false,
    componentDidMount: function() {
        this.el = this.refs.container.parentNode;
        this.elasticSlider = new ElasticSliderCore(
            this.el,
            this.props.options
        );

        this._activeSlide = this.props.options.activeSlide || 1;
        this._totalSlides = this.refs.container.children.length;
        console.log(this._totalSlides)

    },
    getInitialState: function() {
        return {
            text: 'jamy'
        };
    },

    toSlide: function(direction) {

        console.log('trigger', direction, this._activeSlide)
        var index = null;

        direction = direction.toLowerCase();
        direction = direction === 'prev' ? direction : 'next';

        if (direction === 'prev'){
            index = this.elasticSlider.getProp('activeSlideIndex') -1;

            this.elasticSlider.setProp('animationDirection', 'prev');
        } else {
            index = this.elasticSlider.getProp('activeSlideIndex') +1;

            this.elasticSlider.setProp('animationDirection', 'next');
        }
console.log(this.refs, index, this._totalSlides)
        this.setActive(index);
    },

    setActive: function(index) {
        // Throttle multiple triggers
        if (this._disablePagi === false) {
            var self = this;
console.log(index)
            if (index > this._totalSlides - 1) {
                index = 0;
            } else if (index < 0) {
                index = this._totalSlides - 1;
            }
            console.log(index)

            // for (var i = 0; i < scope.pagiArr.length; i++) {
            //     // Set active item, remove active
            //     scope.pagiArr[i].isActive = false;
            //
            //     if (scope.pagiArr[i].index === index) {
            //         scope.pagiArr[i].isActive = true;
            //     }
            // }
console.log(this.elasticSlider.toSlide)
            this.elasticSlider.toSlide({
                index: index,
                animation: this.props.options.animation,
                startAnimationCallback: function(){
                    console.log('end')
                    self._activeSlide = index + 1;
                    self._disablePagi = true;
                },
                endAnimationCallback: function(){
                    self._disablePagi = false;
                }
            });

        }
    },

    render: function() {
        var arrowEl =
            <div className="ElasticSlider-arrowList">
                <div onClick={this.toSlide.bind(this, 'prev')}
                    className="ElasticSlider-arrowItem ElasticSlider-arrowItem--prev">
                    &lt;
                </div>

                <div onClick={this.toSlide.bind(this, 'next')}
                    className="ElasticSlider-arrowItem ElasticSlider-arrowItem--next">
                    &gt;
                </div>
            </div>;

        var pagiEl =
            <div className="ElasticSlider-pagiList">
                <div ng-repeat="item in pagiArr"
                 className="ElasticSlider-pagiItem"
                 ng-className="{'ElasticSlider-pagiItem--isActive': item.isActive}"
                 ng-click="setActive(item.index);">
                </div>
            </div>;

        return (
            <div elasticSlider="elasticSlider">
                <div className="ElasticSlider-container"
                 ref="container">
                    {this.props.children}
                </div>

                {(() =>
                    this.props.options.enableArrows === true
                        ? arrowEl
                        : null
                )()}

                {(() =>
                    this.props.options.enablePagination === true
                        ? pagiEl
                        : null
                )()}
            </div>
        );
    }
});

module.exports = ElasticSlider;
