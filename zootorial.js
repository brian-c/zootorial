// Generated by CoffeeScript 1.6.0
(function() {
  var $, $document, Dialog, STEP_PARTS, Step, Tutorial, attach, wait, zootorial,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = window.jQuery;

  $document = $(document);

  wait = function(time, fn) {
    var _ref;
    if (typeof time === 'function') {
      _ref = [0, time], time = _ref[0], fn = _ref[1];
    }
    return setTimeout(fn, time);
  };

  attach = function(el, _arg, to, _arg1, _arg2) {
    var elOriginalDisplay, elSize, elX, elY, margin, newElOffset, positions, toOffset, toSize, toX, toY, _ref, _ref1;
    _ref = _arg != null ? _arg : [], elX = _ref[0], elY = _ref[1];
    _ref1 = _arg1 != null ? _arg1 : [], toX = _ref1[0], toY = _ref1[1];
    margin = (_arg2 != null ? _arg2 : {}).margin;
    el = $(el);
    if (el.length === 0) {
      throw new Error('Couldn\'t find an element to attach.');
    }
    if (to == null) {
      to = window;
    }
    to = $(to).filter(':visible').first();
    if (to.length === 0) {
      to = $(window);
    }
    if (margin == null) {
      margin = 0;
    }
    positions = {
      left: 0,
      center: 0.5,
      right: 1,
      top: 0,
      middle: 0.5,
      bottom: 1
    };
    if (elX == null) {
      elX = 'center';
    }
    if (elX in positions) {
      elX = positions[elX];
    }
    if (elY == null) {
      elY = 'middle';
    }
    if (elY in positions) {
      elY = positions[elY];
    }
    if (toX == null) {
      toX = 'center';
    }
    if (toX in positions) {
      toX = positions[toX];
    }
    if (toY == null) {
      toY = 'middle';
    }
    if (toY in positions) {
      toY = positions[toY];
    }
    toSize = {
      width: to.outerWidth() + (margin * 2),
      height: to.outerHeight() + (margin * 2)
    };
    toOffset = to.offset() || {
      left: 0,
      top: 0
    };
    toOffset.top -= margin;
    toOffset.left -= margin;
    elOriginalDisplay = el.get(0).style.display;
    el.css({
      display: 'block',
      position: 'absolute'
    });
    elSize = {
      width: el.outerWidth(),
      height: el.outerHeight()
    };
    el.css({
      display: elOriginalDisplay
    });
    newElOffset = {
      left: toOffset.left - (elSize.width * elX) + (toSize.width * toX),
      top: toOffset.top - (elSize.height * elY) + (toSize.height * toY)
    };
    el.offset(newElOffset);
    return null;
  };

  Dialog = (function() {

    Dialog.prototype.className = '';

    Dialog.prototype.content = '';

    Dialog.prototype.attachment = null;

    Dialog.prototype.parent = document.body;

    Dialog.prototype.el = null;

    Dialog.prototype.contentContainer = null;

    function Dialog(params) {
      var property, value,
        _this = this;
      if (params == null) {
        params = {};
      }
      for (property in params) {
        if (!__hasProp.call(params, property)) continue;
        value = params[property];
        if (property in this) {
          this[property] = value;
        }
      }
      this.el = $('<div class="zootorial-dialog">\n  <button name="close-dialog">&times;</button>\n  <div class="dialog-content"></div>\n  <div class="dialog-arrow"></div>\n</div>');
      this.el.addClass(this.className);
      this.contentContainer = this.el.find('.dialog-content');
      this.el.on('click', 'button[name="close-dialog"]', function() {
        _this.el.trigger('click-close-dialog', [_this]);
        return _this.close();
      });
      $(window).on('resize', function() {
        return _this.attach();
      });
      this.el.appendTo(this.parent);
    }

    Dialog.prototype.render = function(content) {
      this.content = content != null ? content : this.content;
      this.contentContainer.html(this.content);
      this.attach();
      this.el.trigger('render-dialog', [this, this.content]);
      return null;
    };

    Dialog.prototype.attach = function(attachment) {
      var elX, elY, selector, toX, toY, _i, _ref, _ref1;
      this.attachment = attachment != null ? attachment : this.attachment;
      if (!this.el.hasClass('open')) {
        return;
      }
      if ((_ref = this.attachment) == null) {
        this.attachment = 'center middle body center middle';
      }
      _ref1 = this.attachment.split(/\s+/), elX = _ref1[0], elY = _ref1[1], selector = 5 <= _ref1.length ? __slice.call(_ref1, 2, _i = _ref1.length - 2) : (_i = 2, []), toX = _ref1[_i++], toY = _ref1[_i++];
      selector = selector.join(' ');
      attach(this.el, [elX, elY], selector, [toX, toY]);
      this.el.trigger('attach-dialog', [this, this.attachment]);
      return null;
    };

    Dialog.prototype.open = function() {
      var _this = this;
      if (this.el.hasClass('open')) {
        return;
      }
      this.el.css({
        display: 'none'
      });
      this.el.addClass('open');
      this.render();
      wait(function() {
        return _this.el.css({
          display: ''
        });
      });
      this.el.trigger('open-dialog', [this]);
      return null;
    };

    Dialog.prototype.close = function() {
      if (!this.el.hasClass('open')) {
        return;
      }
      this.el.removeClass('open');
      this.el.css({
        left: '',
        position: '',
        top: ''
      });
      this.el.trigger('close-dialog', [this]);
      return null;
    };

    Dialog.prototype.destroy = function() {
      var _ref;
      if (this.el == null) {
        return;
      }
      this.close();
      this.el.remove();
      this.el.trigger('destroy-dialog', [this]);
      this.el.off();
      _ref = [], this.content = _ref[0], this.attachment = _ref[1], this.parent = _ref[2], this.el = _ref[3], this.contentContainer = _ref[4];
      return null;
    };

    return Dialog;

  })();

  Step = (function() {

    Step.prototype.className = '';

    Step.prototype.number = NaN;

    Step.prototype.header = '';

    Step.prototype.details = '';

    Step.prototype.instruction = '';

    Step.prototype.buttons = '';

    Step.prototype.next = null;

    Step.prototype.nextButton = 'Continue';

    Step.prototype.demo = null;

    Step.prototype.demoButton = 'Show me';

    Step.prototype.attachment = 'center middle window center middle';

    Step.prototype.block = '';

    Step.prototype.focus = '';

    Step.prototype.actionable = '';

    Step.prototype.onEnter = null;

    Step.prototype.onExit = null;

    Step.prototype.started = null;

    function Step(params) {
      var property, value;
      if (params == null) {
        params = {};
      }
      for (property in params) {
        if (!__hasProp.call(params, property)) continue;
        value = params[property];
        if (property in this) {
          this[property] = value;
        }
      }
    }

    Step.prototype.enter = function(tutorial) {
      var _this = this;
      this.started = new Date;
      if (typeof this.onEnter === "function") {
        this.onEnter(tutorial);
      }
      wait(function() {
        var extras;
        if (_this.blockers == null) {
          _this.createBlockers();
        }
        if (_this.focusers == null) {
          _this.createFocusers();
        }
        $(_this.actionable).addClass('actionable');
        extras = _this.blockers.add(_this.focusers);
        extras.appendTo(tutorial.el.parent());
        return wait(function() {
          return extras.removeClass('hidden');
        });
      });
      tutorial.el.trigger('enter-tutorial-step', [this, tutorial]);
      return null;
    };

    Step.prototype.createBlockers = function() {
      var blocked, blocker, _i, _len, _ref;
      this.blockers = $();
      _ref = $(this.block);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        blocked = _ref[_i];
        blocked = $(blocked);
        blocker = $('<div class="hidden zootorial-blocker"></div>');
        blocker.width(blocked.outerWidth());
        blocker.height(blocked.outerHeight());
        blocker.offset(blocked.offset());
        this.blockers = this.blockers.add(blocker);
      }
      this.blockers.css({
        position: 'absolute'
      });
      return null;
    };

    Step.prototype.createFocusers = function() {
      var above, bottom, focus, focuserMarkup, height, left, offset, right, totalHeight, totalWidth, width;
      focuserMarkup = '<div class="hidden zootorial-focuser"></div>';
      this.focusers = $(focuserMarkup + focuserMarkup + focuserMarkup + focuserMarkup);
      this.focusers.css({
        position: 'absolute'
      });
      focus = $(this.focus).filter(':visible').first();
      if (focus.length === 0) {
        return;
      }
      offset = focus.offset();
      width = focus.outerWidth();
      height = focus.outerHeight();
      totalHeight = $document.outerHeight();
      totalWidth = $document.outerWidth();
      above = this.focusers.eq(0);
      above.offset({
        left: 0,
        top: 0
      });
      above.width('100%');
      above.height(offset.top);
      right = this.focusers.eq(1);
      right.offset({
        left: offset.left + width,
        top: offset.top
      });
      right.width(totalWidth - offset.left - width);
      right.height(height);
      bottom = this.focusers.eq(2);
      bottom.offset({
        left: 0,
        top: offset.top + height
      });
      bottom.width('100%');
      bottom.height(totalHeight - offset.top - height);
      left = this.focusers.eq(3);
      left.offset({
        left: 0,
        top: offset.top
      });
      left.width(offset.left);
      left.height(height);
      return null;
    };

    Step.prototype.exit = function(tutorial) {
      var extras, finished,
        _this = this;
      if (typeof this.onExit === "function") {
        this.onExit(tutorial);
      }
      $(this.actionable).removeClass('actionable');
      extras = this.blockers.add(this.focusers);
      extras.addClass('hidden');
      wait(250, function() {
        return extras.remove();
      });
      finished = (new Date) - this.started;
      this.started = null;
      tutorial.el.trigger('exit-tutorial-step', [this, tutorial, finished]);
      return null;
    };

    return Step;

  })();

  STEP_PARTS = ['header', 'details', 'instruction', 'buttons'];

  Tutorial = (function(_super) {

    __extends(Tutorial, _super);

    Tutorial.prototype.id = '';

    Tutorial.prototype.steps = null;

    Tutorial.prototype.firstStep = null;

    Tutorial.prototype.header = null;

    Tutorial.prototype.details = null;

    Tutorial.prototype.instruction = null;

    Tutorial.prototype.buttons = null;

    Tutorial.prototype.progress = null;

    Tutorial.prototype.progressTrack = null;

    Tutorial.prototype.progressFill = null;

    Tutorial.prototype.progressSteps = null;

    Tutorial.prototype.started = null;

    Tutorial.prototype.currentStep = null;

    function Tutorial(params) {
      var step, stepPart, _i, _j, _len, _ref, _ref1, _ref2,
        _this = this;
      if (params == null) {
        params = {};
      }
      Tutorial.__super__.constructor.apply(this, arguments);
      this.id || (this.id = Math.random.toString(16).split('.')[1]);
      if ((_ref = this.steps) == null) {
        this.steps = [];
      }
      if (this.steps instanceof Array) {
        if ((_ref1 = this.firstStep) == null) {
          this.firstStep = this.steps[0];
        }
      }
      this.el.addClass('tutorial');
      this.content = $('<div>\n  <div class="header"></div>\n  <div class="details"></div>\n  <div class="instruction"></div>\n  <div class="buttons"></div>\n  <div class="progress">\n    <div class="track"><div class="fill"></div></div>\n    <div class="steps"></div>\n  </div>\n</div>');
      for (_i = 0, _len = STEP_PARTS.length; _i < _len; _i++) {
        stepPart = STEP_PARTS[_i];
        this[stepPart] = this.content.find("." + stepPart);
      }
      this.progress = this.content.find('.progress');
      this.progressTrack = this.progress.find('.track');
      this.progressFill = this.progress.find('.fill');
      this.progressSteps = this.progress.find('.steps');
      if (!isNaN(this.steps.length)) {
        this.progress.addClass('defined');
        this.progressFill.css({
          width: '0%'
        });
        for (step = _j = 0, _ref2 = this.steps.length; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; step = 0 <= _ref2 ? ++_j : --_j) {
          this.progressSteps.append('<span class="step"></span>');
        }
      }
      this.el.on('click', 'button[name="next-step"]', function() {
        return _this.load(_this.currentStep.next);
      });
      this.el.on('click', 'button[name="demo"]', function() {
        var demoButton;
        demoButton = _this.el.find('button[name="demo"]');
        demoButton.attr({
          disabled: true
        });
        return _this.currentStep.demo(function() {
          return demoButton.attr({
            disabled: false
          });
        });
      });
      this.el.on('click-close-dialog', function() {
        return _this.unload();
      });
    }

    Tutorial.prototype.load = function(step) {
      var child, eventString, i, index, isFunction, isPrimitive, isStep, isntDefined, next, s, stepNumber, stepPart, _fn, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4,
        _this = this;
      if ((step == null) || (step === true)) {
        if (this.steps instanceof Array) {
          _ref = this.steps;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            step = _ref[i];
            if (step === this.currentStep) {
              index = i;
            }
          }
          step = this.steps[index + 1];
        }
        if (!(step != null)) {
          this.complete();
          return;
        }
      }
      if (step === false) {
        this.instruction.addClass('attention');
        return;
      }
      if (typeof step === 'function') {
        step = step.call(this);
      }
      if (!(step instanceof Step)) {
        step = this.steps[step];
      }
      if (this.currentStep) {
        this.unload(this.currentStep);
      }
      this.el.addClass(step.className);
      wait(100, function() {
        return _this.attach(step.attachment);
      });
      for (_j = 0, _len1 = STEP_PARTS.length; _j < _len1; _j++) {
        stepPart = STEP_PARTS[_j];
        this[stepPart].html((typeof step[stepPart] === "function" ? step[stepPart](this) : void 0) || step[stepPart] || '');
        if (this[stepPart].html()) {
          this[stepPart].addClass('defined');
        }
      }
      isStep = step.next instanceof Step;
      isPrimitive = (_ref1 = typeof step.next) === 'string' || _ref1 === 'number' || _ref1 === 'boolean';
      isFunction = typeof step.next === 'function';
      isntDefined = step.next == null;
      if (isStep || isPrimitive || isFunction || isntDefined) {
        this.buttons.html("<button name='next-step'>" + step.nextButton + "</button>");
        this.buttons.addClass('defined');
      } else {
        _ref2 = step.next;
        _fn = function(eventString, next) {
          var eventName, selector, _ref3;
          _ref3 = eventString.split(/\s+/), eventName = _ref3[0], selector = 2 <= _ref3.length ? __slice.call(_ref3, 1) : [];
          selector = selector.join(' ');
          return $document.on("" + eventName + ".zootorial-" + _this.id, selector, function(e) {
            console.log('responding to event');
            if (typeof next === 'function') {
              return _this.load(next(e, _this));
            } else {
              return _this.load(next);
            }
          });
        };
        for (eventString in _ref2) {
          next = _ref2[eventString];
          _fn(eventString, next);
        }
      }
      if (step.demo != null) {
        this.instruction.append("<button name='demo'>" + step.demoButton + "</button>");
      }
      if (this.steps instanceof Array) {
        _ref3 = this.steps;
        for (i = _k = 0, _len2 = _ref3.length; _k < _len2; i = ++_k) {
          s = _ref3[i];
          if (s === step) {
            stepNumber = i + 1;
          }
        }
      } else if (!isNaN(this.steps.length)) {
        stepNumber = step.number;
      }
      if (!isNaN(stepNumber)) {
        wait(250, function() {
          return _this.progressFill.css({
            width: "" + (100 * (stepNumber / _this.steps.length)) + "%"
          });
        });
        _ref4 = this.progressSteps.children();
        for (i = _l = 0, _len3 = _ref4.length; _l < _len3; i = ++_l) {
          child = _ref4[i];
          $(child).toggleClass('passed', i + 1 < stepNumber);
          $(child).toggleClass('active', i + 1 === stepNumber);
        }
      }
      step.enter(this);
      this.currentStep = step;
      return null;
    };

    Tutorial.prototype.unload = function() {
      var stepPart, _i, _len;
      if (!this.currentStep) {
        return;
      }
      this.instruction.removeClass('attention');
      this.el.removeClass(this.currentStep.className);
      for (_i = 0, _len = STEP_PARTS.length; _i < _len; _i++) {
        stepPart = STEP_PARTS[_i];
        this[stepPart].html('');
        this[stepPart].removeClass('defined');
      }
      $document.off(".zootorial-" + this.id);
      this.currentStep.exit(this);
      this.currentStep = null;
      return null;
    };

    Tutorial.prototype.start = function() {
      this.close();
      this.started = new Date;
      this.unload();
      this.load(this.firstStep);
      this.open();
      this.el.trigger('start-tutorial', [this, this.started]);
      return null;
    };

    Tutorial.prototype.complete = function() {
      var finished;
      finished = new Date - this.started;
      this.el.trigger('complete-tutorial', [this, finished]);
      this.end();
      return null;
    };

    Tutorial.prototype.end = function() {
      var finished;
      this.unload();
      finished = new Date - this.started;
      this.started = null;
      this.close();
      this.el.trigger('end-tutorial', [this, finished]);
      return null;
    };

    return Tutorial;

  })(Dialog);

  zootorial = {
    Dialog: Dialog,
    Tutorial: Tutorial,
    Step: Step,
    attach: attach
  };

  if (typeof window !== "undefined" && window !== null) {
    window.zootorial = zootorial;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = zootorial;
  }

  if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
    define(zootorial);
  }

}).call(this);
