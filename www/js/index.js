/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
        (function () {
            var counter;
            $('.program__inner').hover(function (e) {
                var $el = $(this);
                var $desc = $el.find('.program__desc');
                if (counter) clearTimeout(counter);
                if ($el.offset().top - $(window).scrollTop() - $desc.outerHeight() / 2 < 0) {
                    if ($(window).scrollTop() > 0) {
                        $desc.css({top: $(window).scrollTop() - $el.offset().top + 10});
                    } else {
                        $desc.css({top: 0});
                    }
                }
                else {
                    if ($el.offset().top - $(window).scrollTop() + ($desc.outerHeight() / 2) > $(window).outerHeight()) {
                        $desc.css({top: -($el.offset().top - $(window).scrollTop() - $(window).outerHeight() + $desc.outerHeight() + 10)});
                    } else {
                        $desc.css({top: -$desc.outerHeight() / 2});
                    }
                }

                if ($el.offset().left + $el.outerWidth() + parseInt($desc.css('width')) > $(document).outerWidth()) $desc.css({right: '100%'});
                else $desc.css({left: '100%'});

                counter = setTimeout(function () {
                    $desc.fadeIn();
                }, .3 * 1000);
            }, function () {
                clearTimeout(counter);
                var $el = $(this);
                var $desc = $el.find('.program__desc');
                $desc.fadeOut(300);
            });
        })();

        (function () {
            var today = new Date();
            var dayOfWeek = today.getDay() - 1;
            if (dayOfWeek < 0) dayOfWeek = 6;
            $('.channels__row').eq(dayOfWeek).addClass('channels__row--visible');
            $('.week__day').eq(dayOfWeek).addClass('week__day--selected')
            $('.week__day').click(function () {
                var $day = $(this);
                var index = $day.index();
                showDayProgram(index);
            });
            $('.week__next-day').click(function () {
                var index = $('.week__day--selected').index();
                if (index == 6) index = -1;
                showDayProgram(index + 1)
            });
            function showDayProgram(index) {
                $('.channels__row--visible').removeClass('channels__row--visible');
                $('.week__day--selected').removeClass('week__day--selected');
                $('.channels__row').eq(index).addClass('channels__row--visible');
                $('.week__day').eq(index).addClass('week__day--selected');
            }
        })();

        (function () {
            $('.select-type').change(function () {
                var $checkbox = $(this);
                var type = $checkbox.attr('value');
                if ($checkbox.is(':checked')) {
                    $('.channels').find('.program--' + type).addClass('program--selected');
                } else {
                    $('.channels').find('.program--' + type).removeClass('program--selected');
                }
            });
        })();

        (function () {
            var $popup = $('.popup');
            var $popupIframe = $popup.find('.popup__iframe');
            var $iframe;
            $('.popup').click(function (e) {
                $(document.body).append($iframe);
                $popup.removeClass('popup--visible');
            });
            $('.popup__iframe').click(function (e) {
                e.stopPropagation();
            });
            $('.channel__watch').find('a').click(function (e) {
                e.preventDefault();
                var $btn = $(this);
                $iframe = $($btn.attr('href'));
                $popupIframe.append($iframe);
                $popup.addClass('popup--visible');
            })
        })();
    }
};