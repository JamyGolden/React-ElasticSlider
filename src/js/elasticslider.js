'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ElasticSliderCore from 'elasticslider-core';

const ReactElasticSlider = React.createClass({
    _disablePagi: false,
    componentDidMount: function() {
        this.elasticSlider = new ElasticSliderCore(
            this.refs.container.parentNode, // element
            this.props.options
        );

        this.totalSlides = this.refs.container.children.length;
    },
    getInitialState: function() {
        return {
            activeSlideIndex: this.props.options.activeSlide - 1
        };
    },

    toSlide: function(direction) {
        let index = null;

        direction = direction.toLowerCase();
        direction = direction === 'prev' ? direction : 'next';

        if (direction === 'prev'){
            index = this.elasticSlider.getProp('activeSlideIndex') -1;

            this.elasticSlider.setProp('animationDirection', 'prev');
        } else {
            index = this.elasticSlider.getProp('activeSlideIndex') +1;

            this.elasticSlider.setProp('animationDirection', 'next');
        }

        this.setActive(index);
    },
    setActive: function(index) {
        if (index > this.totalSlides - 1) {
            index = 0;
        } else if (index < 0) {
            index = this.totalSlides - 1;
        }

        this.elasticSlider.toSlide({
            index: index,
            animation: this.props.options.animation,
            startAnimationCallback: function() {

                this.setState({ activeSlideIndex: index });

            }.bind(this),
            endAnimationCallback: function() {

            }.bind(this)
        });
    },

    render: function() {
        const arrowEl =
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

        const pagiElItems = this.props.children.map(function(item, i) {
            return (
                <ElasticSliderPagiItem setActive={this.setActive}
                 key={i}
                 index={i}
                 activeSlideIndex={this.state.activeSlideIndex}>
                    {i}
                </ElasticSliderPagiItem>
            );
        }.bind(this));

        const pagiEl =
            <div className="ElasticSlider-pagiList">
                {pagiElItems}
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

const ElasticSliderPagiItem = React.createClass({
    getInitialState: function() {
        return {
            onClick: function() {

                this.props.setActive(this.props.index);

            }.bind(this)
        }
    },
    render: function() {
        return (
            <div
             className={
                this.props.activeSlideIndex === this.props.index ? "ElasticSlider-pagiItem ElasticSlider-pagiItem--isActive" : "ElasticSlider-pagiItem"
             }
             onClick={this.state.onClick}>
                {this.props.index}
            </div>
        )
    }
});

module.exports = ReactElasticSlider;
