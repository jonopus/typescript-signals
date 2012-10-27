var SignalsTest = new YUITest.TestCase({
    name: "Basic Test",
    _should: {
        ignore: {
        },
        error: {
            testAddNull: 'listener is a required param of add() and should be a Function.',
            testAddOnceNull: 'listener is a required param of addOnce() and should be a Function.',
            testAddSameListenerMixed1: 'You cannot add() then addOnce() the same listener without removing the relationship first.',
            testAddSameListenerMixed2: 'You cannot addOnce() then add() the same listener without removing the relationship first.',
            testRemoveNull: 'listener is a required param of remove() and should be a Function.',
            testDispose1: true,
            testDispose2: true,
            testDispose3: true,
            testDispose4: true
        }
    },
    setUp: function () {
    },
    tearDown: function () {
    },
    testSignalType: function () {
        var s = new signals.Signal();
        YUITest.Assert.isObject(s);
        YUITest.Assert.isInstanceOf(signals.Signal, s);
    },
    testNumListeners0: function () {
        var s = new signals.Signal();
        YUITest.Assert.areSame(0, s.getNumListeners());
    },
    testAddSingle: function () {
        var s = new signals.Signal();
        s.add(function () {
        });
        YUITest.Assert.areSame(1, s.getNumListeners());
    },
    testAddDouble: function () {
        var s = new signals.Signal();
        s.add(function () {
        });
        s.add(function () {
        });
        YUITest.Assert.areSame(2, s.getNumListeners());
    },
    testAddDoubleSameListener: function () {
        var s = new signals.Signal();
        var l = function () {
        };
        s.add(l);
        s.add(l);
        YUITest.Assert.areSame(1, s.getNumListeners());
    },
    testAddDoubleSameListenerDiffContext: function () {
        var s = new signals.Signal();
        var l = function () {
        };
        s.add(l);
        s.add(l, {
        });
        YUITest.Assert.areSame(2, s.getNumListeners());
    },
    testAddNull: function () {
        var s = new signals.Signal();
        s.add();
        YUITest.Assert.areSame(0, s.getNumListeners());
    },
    testHasListener: function () {
        var s = new signals.Signal();
        var l = function () {
        };
        s.add(l);
        YUITest.Assert.areSame(true, s.has(l));
    },
    testAddOnce: function () {
        var s = new signals.Signal();
        s.addOnce(function () {
        });
        YUITest.Assert.areSame(1, s.getNumListeners());
    },
    testAddOnceDouble: function () {
        var s = new signals.Signal();
        s.addOnce(function () {
        });
        s.addOnce(function () {
        });
        YUITest.Assert.areSame(2, s.getNumListeners());
    },
    testAddOnceSameDouble: function () {
        var s = new signals.Signal();
        var l = function () {
        };
        s.addOnce(l);
        s.addOnce(l);
        YUITest.Assert.areSame(1, s.getNumListeners());
    },
    testAddOnceNull: function () {
        var s = new signals.Signal();
        s.addOnce();
        YUITest.Assert.areSame(0, s.getNumListeners());
    },
    testAddSameListenerMixed1: function () {
        var s = new signals.Signal();
        var l = function () {
        };
        s.add(l);
        s.addOnce(l);
    },
    testAddSameListenerMixed2: function () {
        var s = new signals.Signal();
        var l = function () {
        };
        s.addOnce(l);
        s.add(l);
    },
    testDispatchSingleListener: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        s.add(l1);
        s.dispatch();
        YUITest.Assert.areSame(1, n);
    },
    testDispatchDoubleListeners: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        var l2 = function () {
            n++;
        };
        s.add(l1);
        s.add(l2);
        s.dispatch();
        YUITest.Assert.areSame(2, n);
    },
    testDispatchDoubleListeners2: function () {
        var s = new signals.Signal();
        var str = '';
        var l1 = function () {
            str += 'a';
        };
        var l2 = function () {
            str += 'b';
        };
        s.add(l1);
        s.add(l2);
        s.dispatch();
        YUITest.Assert.areSame('ab', str);
    },
    testDispatchMultipleListenersPriority: function () {
        var s = new signals.Signal();
        var str = '';
        var l1 = function () {
            str += 'a';
        };
        var l2 = function () {
            str += 'b';
        };
        var l3 = function () {
            str += 'c';
        };
        s.add(l1);
        s.add(l2, null, 1);
        s.add(l3);
        s.dispatch();
        YUITest.Assert.areSame('bac', str);
    },
    testDispatchMultipleListenersPriority2: function () {
        var s = new signals.Signal();
        var str = '';
        var l1 = function () {
            str += 'a';
        };
        var l2 = function () {
            str += 'b';
        };
        var l3 = function () {
            str += 'c';
        };
        s.add(l1, null, 1);
        s.add(l2, null, 12);
        s.add(l3, null, 2);
        s.dispatch();
        YUITest.Assert.areSame('bca', str);
    },
    testDispatchSingleListenerTwice: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        s.add(l1);
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(2, n);
    },
    testDispatchDoubleListenersTwice: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        var l2 = function () {
            n++;
        };
        s.add(l1);
        s.add(l2);
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(4, n);
    },
    testDispatchScope: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        s.add(l1, scope);
        s.dispatch();
        YUITest.Assert.areSame(1, scope.n);
    },
    testDispatchScopeDouble: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        var l2 = function () {
            this.sum();
        };
        s.add(l1, scope);
        s.add(l2, scope);
        s.dispatch();
        YUITest.Assert.areSame(2, scope.n);
    },
    testDispatchScopeDouble2: function () {
        var s = new signals.Signal();
        var scope1 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var scope2 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        var l2 = function () {
            this.sum();
        };
        s.add(l1, scope1);
        s.add(l2, scope2);
        s.dispatch();
        YUITest.Assert.areSame(1, scope1.n);
        YUITest.Assert.areSame(1, scope2.n);
    },
    testDispatchScopeTwice: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        s.add(l1, scope);
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(2, scope.n);
    },
    testDispatchScopeDoubleTwice: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        var l2 = function () {
            this.sum();
        };
        s.add(l1, scope);
        s.add(l2, scope);
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(4, scope.n);
    },
    testDispatchScopeDouble2Twice: function () {
        var s = new signals.Signal();
        var scope1 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var scope2 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        var l2 = function () {
            this.sum();
        };
        s.add(l1, scope1);
        s.add(l2, scope2);
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(2, scope1.n);
        YUITest.Assert.areSame(2, scope2.n);
    },
    testDispatchAddOnceSingleListener: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        s.addOnce(l1);
        s.dispatch();
        YUITest.Assert.areSame(1, n);
    },
    testDispatchAddOnceSingleListenerTwice: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        s.addOnce(l1);
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(1, n);
    },
    testDispatchAddOnceDoubleListener: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        var l2 = function () {
            n++;
        };
        s.addOnce(l1);
        s.addOnce(l2);
        s.dispatch();
        YUITest.Assert.areSame(2, n);
    },
    testDispatchAddOnceDoubleListenerTwice: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        var l2 = function () {
            n++;
        };
        s.addOnce(l1);
        s.addOnce(l2);
        YUITest.Assert.areSame(2, s.getNumListeners());
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(2, n);
    },
    testDispatchAddOnceScope: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        s.addOnce(l1, scope);
        s.dispatch();
        YUITest.Assert.areSame(1, scope.n);
    },
    testDispatchAddOnceScopeDouble: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        var l2 = function () {
            this.sum();
        };
        s.addOnce(l1, scope);
        s.addOnce(l2, scope);
        s.dispatch();
        YUITest.Assert.areSame(2, scope.n);
    },
    testDispatchAddOnceScopeDouble2: function () {
        var s = new signals.Signal();
        var scope1 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var scope2 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        var l2 = function () {
            this.sum();
        };
        s.addOnce(l1, scope1);
        s.addOnce(l2, scope2);
        s.dispatch();
        YUITest.Assert.areSame(1, scope1.n);
        YUITest.Assert.areSame(1, scope2.n);
    },
    testDispatchAddOnceScopeTwice: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        s.addOnce(l1, scope);
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(1, scope.n);
    },
    testDispatchAddOnceScopeDoubleTwice: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        var l2 = function () {
            this.sum();
        };
        s.addOnce(l1, scope);
        s.addOnce(l2, scope);
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(2, scope.n);
    },
    testDispatchAddOnceScopeDouble2Twice: function () {
        var s = new signals.Signal();
        var scope1 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var scope2 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        var l2 = function () {
            this.sum();
        };
        s.addOnce(l1, scope1);
        s.addOnce(l2, scope2);
        s.dispatch();
        s.dispatch();
        YUITest.Assert.areSame(1, scope1.n);
        YUITest.Assert.areSame(1, scope2.n);
    },
    testDispatchInvalidListener: function () {
        var s = new signals.Signal();
        var n = 0;
        var l2 = function () {
            n += 1;
        };
        var l1 = function () {
            n += 1;
            s.remove(l2);
        };
        s.add(l1);
        s.add(l2);
        s.dispatch();
        YUITest.Assert.areSame(1, n);
    },
    testDispatchSingleListenerParams: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function (param) {
            n += param;
        };
        s.add(l1);
        s.dispatch(1);
        YUITest.Assert.areSame(1, n);
    },
    testDispatchDoubleListenersParams: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function (param) {
            n += param;
        };
        var l2 = function (param) {
            n += param;
        };
        s.add(l1);
        s.add(l2);
        s.dispatch(1);
        YUITest.Assert.areSame(2, n);
    },
    testDispatchSingleListenerTwiceParams: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function (param1, param2) {
            n += param1 + param2;
        };
        s.add(l1);
        s.dispatch(1, 2);
        s.dispatch(3, 4);
        YUITest.Assert.areSame(10, n);
    },
    testDispatchDoubleListenersTwiceParams: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function (param1, param2) {
            n += param1 + param2;
        };
        var l2 = function (param1, param2) {
            n += param1 + param2;
        };
        s.add(l1);
        s.add(l2);
        s.dispatch(2, 2);
        s.dispatch(3, 3);
        YUITest.Assert.areSame(20, n);
    },
    testDispatchScopeParams: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            sum: function (param1, param2, param3) {
                this.n = param1 + param2 + param3;
            }
        };
        var l1 = function (param1, param2, param3) {
            this.sum(param1, param2, param3);
        };
        s.add(l1, scope);
        s.dispatch(10, 20, 5);
        YUITest.Assert.areSame(35, scope.n);
    },
    testDispatchAddOnceSingleListenerParams: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function (param) {
            n += param;
        };
        s.addOnce(l1);
        s.dispatch(1);
        YUITest.Assert.areSame(1, n);
    },
    testDispatchAddOnceDoubleListenersParams: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function (param) {
            n += param;
        };
        var l2 = function (param) {
            n += param;
        };
        s.addOnce(l1);
        s.addOnce(l2);
        s.dispatch(1);
        YUITest.Assert.areSame(2, n);
    },
    testDispatchAddOnceSingleListenerTwiceParams: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function (param1, param2) {
            n += param1 + param2;
        };
        s.addOnce(l1);
        s.dispatch(1, 2);
        s.dispatch(3, 4);
        YUITest.Assert.areSame(3, n);
    },
    testDispatchAddOnceDoubleListenersTwiceParams: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function (param1, param2) {
            n += param1 + param2;
        };
        var l2 = function (param1, param2) {
            n += param1 + param2;
        };
        s.addOnce(l1);
        s.addOnce(l2);
        s.dispatch(2, 2);
        s.dispatch(3, 3);
        YUITest.Assert.areSame(8, n);
    },
    testDispatchAddOnceScopeParams: function () {
        var s = new signals.Signal();
        var scope = {
            n: 0,
            add: function (param1, param2, param3) {
                this.n = param1 + param2 + param3;
            }
        };
        var l1 = function (param1, param2, param3) {
            this.add(param1, param2, param3);
        };
        s.addOnce(l1, scope);
        s.dispatch(10, 20, 5);
        YUITest.Assert.areSame(35, scope.n);
    },
    testStopPropagation: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        var l2 = function () {
            return false;
        };
        var l3 = function () {
            n++;
        };
        s.add(l1);
        s.add(l2);
        s.add(l3);
        s.dispatch();
        YUITest.Assert.areSame(1, n);
    },
    testStopPropagation2: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        var l2 = function () {
            s.halt();
        };
        var l3 = function () {
            n++;
        };
        s.add(l1);
        s.add(l2);
        s.add(l3);
        s.dispatch();
        YUITest.Assert.areSame(1, n);
    },
    testStopPropagation3: function () {
        var s = new signals.Signal();
        s.halt();
        var n = 0;
        var l1 = function () {
            n++;
        };
        var l2 = function () {
            n++;
        };
        var l3 = function () {
            n++;
        };
        s.add(l1);
        s.add(l2);
        s.add(l3);
        s.dispatch();
        YUITest.Assert.areSame(3, n);
    },
    testEnableDisableSignal: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        var l2 = function () {
            n++;
        };
        var l3 = function () {
            n++;
        };
        s.add(l1);
        s.add(l2);
        s.add(l3);
        YUITest.Assert.areSame(true, s.active);
        s.dispatch();
        s.active = false;
        YUITest.Assert.areSame(false, s.active);
        s.dispatch();
        s.active = true;
        YUITest.Assert.areSame(true, s.active);
        s.dispatch();
        YUITest.Assert.areSame(6, n);
    },
    testEnableDisableBinding: function () {
        var s = new signals.Signal();
        var n = 0;
        var l1 = function () {
            n++;
        };
        var l2 = function () {
            n++;
        };
        var l3 = function () {
            n++;
        };
        var b1 = s.add(l1);
        var b2 = s.add(l2);
        var b3 = s.add(l3);
        YUITest.Assert.areSame(true, s.active);
        YUITest.Assert.areSame(true, b2.active);
        s.dispatch();
        b2.active = false;
        YUITest.Assert.areSame(true, s.active);
        YUITest.Assert.areSame(false, b2.active);
        s.dispatch();
        b2.active = true;
        YUITest.Assert.areSame(true, s.active);
        YUITest.Assert.areSame(true, b2.active);
        s.dispatch();
        YUITest.Assert.areSame(8, n);
    },
    testBindingsIsOnce: function () {
        var s = new signals.Signal();
        var b1 = s.addOnce(function () {
        });
        YUITest.Assert.areSame(1, s.getNumListeners());
        YUITest.Assert.areSame(true, b1.isOnce());
    },
    testBindingsIsOnce2: function () {
        var s = new signals.Signal();
        var b1 = s.addOnce(function () {
        });
        var b2 = s.addOnce(function () {
        });
        YUITest.Assert.areSame(2, s.getNumListeners());
        YUITest.Assert.areSame(true, b1.isOnce());
        YUITest.Assert.areSame(true, b2.isOnce());
        YUITest.Assert.areNotSame(b1, b2);
    },
    testBindingsIsOnce3: function () {
        var s = new signals.Signal();
        var l = function () {
        };
        var b1 = s.addOnce(l);
        var b2 = s.addOnce(l);
        YUITest.Assert.areSame(1, s.getNumListeners());
        YUITest.Assert.areSame(true, b1.isOnce());
        YUITest.Assert.areSame(true, b2.isOnce());
        YUITest.Assert.areSame(b1, b2);
    },
    testBindingsIsNotOnce: function () {
        var s = new signals.Signal();
        var b1 = s.add(function () {
        });
        YUITest.Assert.areSame(1, s.getNumListeners());
        YUITest.Assert.areSame(false, b1.isOnce());
    },
    testBindingsIsNotOnce2: function () {
        var s = new signals.Signal();
        var b1 = s.add(function () {
        });
        var b2 = s.add(function () {
        });
        YUITest.Assert.areSame(2, s.getNumListeners());
        YUITest.Assert.areSame(false, b1.isOnce());
        YUITest.Assert.areSame(false, b2.isOnce());
        YUITest.Assert.areNotSame(b1, b2);
    },
    testBindingsIsNotOnce3: function () {
        var s = new signals.Signal();
        var l = function () {
        };
        var b1 = s.add(l);
        var b2 = s.add(l);
        YUITest.Assert.areSame(1, s.getNumListeners());
        YUITest.Assert.areSame(false, b1.isOnce());
        YUITest.Assert.areSame(false, b2.isOnce());
        YUITest.Assert.areSame(b1, b2);
    },
    testBindingDetach: function () {
        var s = new signals.Signal();
        var b1 = s.add(function () {
            YUITest.Assert.fail();
        });
        YUITest.Assert.areSame(1, s.getNumListeners());
        b1.detach();
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testBindingDetachTwice: function () {
        var s = new signals.Signal();
        var b1 = s.add(function () {
            YUITest.Assert.fail();
        });
        YUITest.Assert.areSame(1, s.getNumListeners());
        b1.detach();
        b1.detach();
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testBindingIsBound: function () {
        var s = new signals.Signal();
        var b1 = s.add(function () {
            YUITest.Assert.fail();
        });
        YUITest.Assert.areSame(1, s.getNumListeners());
        YUITest.Assert.areSame(true, b1.isBound());
        b1.detach();
        YUITest.Assert.areSame(false, b1.isBound());
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testBindingGetListener: function () {
        var s = new signals.Signal();
        var l1 = function () {
        };
        var b1 = s.add(l1);
        YUITest.Assert.isUndefined(b1.listener);
        YUITest.Assert.areSame(1, s.getNumListeners());
        YUITest.Assert.areSame(l1, b1.getListener());
    },
    testBindingContext: function () {
        var s = new signals.Signal();
        var scope1 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var scope2 = {
            n: 0,
            sum: function () {
                this.n++;
            }
        };
        var l1 = function () {
            this.sum();
        };
        var l2 = function () {
            this.sum();
        };
        var b1 = s.add(l1, scope1);
        var b2 = s.add(l2, scope2);
        s.dispatch();
        YUITest.Assert.areSame(1, scope1.n);
        YUITest.Assert.areSame(1, scope2.n);
        b1.context = scope2;
        s.dispatch();
        YUITest.Assert.areSame(1, scope1.n);
        YUITest.Assert.areSame(3, scope2.n);
    },
    testBindingDispose: function () {
        var s = new signals.Signal();
        var b1 = s.add(function () {
        }, {
        });
        YUITest.Assert.areSame(1, s.getNumListeners());
        b1.detach();
        YUITest.Assert.areSame(0, s.getNumListeners());
        YUITest.Assert.isUndefined(b1.listener);
        YUITest.Assert.isUndefined(b1.getListener());
        YUITest.Assert.isUndefined(b1.context);
    },
    testBindingCurry: function () {
        var s = new signals.Signal();
        var _a;
        var _b;
        var _c;

        var b1 = s.add(function (a, b, c) {
            _a = a;
            _b = b;
            _c = c;
        });
        b1.params = [
            'foo', 
            'bar'
        ];
        s.dispatch(123);
        YUITest.Assert.areSame('foo', _a, 'curried param 1');
        YUITest.Assert.areSame('bar', _b, 'curried param 2');
        YUITest.Assert.areSame(123, _c, 'dispatched param');
    },
    testBindingCurry2: function () {
        var s = new signals.Signal();
        var _a;
        var _b;
        var _c;

        var b1 = s.add(function (a, b, c) {
            _a = a;
            _b = b;
            _c = c;
        });
        b1.params = [
            'foo', 
            'bar'
        ];
        s.dispatch();
        YUITest.Assert.areSame('foo', _a, 'curried param 1');
        YUITest.Assert.areSame('bar', _b, 'curried param 2');
        YUITest.Assert.isUndefined(_c, 'dispatched param');
    },
    testRemoveSingle: function () {
        var s = new signals.Signal();
        var l1 = function () {
            YUITest.Assert.fail();
        };
        var b1 = s.add(l1);
        s.remove(l1);
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testRemoveSingle2: function () {
        var s = new signals.Signal();
        var l1 = function () {
            YUITest.Assert.fail();
        };
        var b1 = s.add(l1);
        s.remove(l1);
        YUITest.Assert.areSame(0, s.getNumListeners());
        YUITest.Assert.isUndefined(b1.listener);
        YUITest.Assert.isUndefined(b1.getListener());
        YUITest.Assert.isUndefined(b1.context);
        s.dispatch();
    },
    testRemoveSingleTwice: function () {
        var s = new signals.Signal();
        var l = function () {
            YUITest.Assert.fail();
        };
        s.add(l);
        s.remove(l);
        s.remove(l);
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testRemoveSingleTwice2: function () {
        var s = new signals.Signal();
        var l = function () {
            YUITest.Assert.fail();
        };
        s.add(l);
        s.remove(l);
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
        s.remove(l);
        s.dispatch();
    },
    testRemoveDouble: function () {
        var s = new signals.Signal();
        var l1 = function () {
            YUITest.Assert.fail();
        };
        var l2 = function () {
            YUITest.Assert.fail();
        };
        s.add(l1);
        s.addOnce(l2);
        s.remove(l1);
        YUITest.Assert.areSame(1, s.getNumListeners());
        s.remove(l2);
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testRemoveDoubleTwice: function () {
        var s = new signals.Signal();
        var l1 = function () {
            YUITest.Assert.fail();
        };
        var l2 = function () {
            YUITest.Assert.fail();
        };
        s.add(l1);
        s.add(l2);
        s.remove(l1);
        s.remove(l1);
        YUITest.Assert.areSame(1, s.getNumListeners());
        s.remove(l2);
        s.remove(l2);
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testRemoveDoubleTwice2: function () {
        var s = new signals.Signal();
        var l1 = function () {
            YUITest.Assert.fail();
        };
        var l2 = function () {
            YUITest.Assert.fail();
        };
        s.add(l1);
        s.addOnce(l2);
        s.remove(l1);
        YUITest.Assert.areSame(1, s.getNumListeners());
        s.remove(l2);
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
        s.remove(l1);
        s.remove(l2);
        s.dispatch();
    },
    testRemoveAll: function () {
        var s = new signals.Signal();
        s.add(function () {
            YUITest.Assert.fail();
        });
        s.add(function () {
            YUITest.Assert.fail();
        });
        s.addOnce(function () {
            YUITest.Assert.fail();
        });
        s.add(function () {
            YUITest.Assert.fail();
        });
        s.addOnce(function () {
            YUITest.Assert.fail();
        });
        YUITest.Assert.areSame(5, s.getNumListeners());
        s.removeAll();
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testRemoveAll2: function () {
        var s = new signals.Signal();
        var b1 = s.add(function () {
            YUITest.Assert.fail();
        });
        var b2 = s.add(function () {
            YUITest.Assert.fail();
        });
        var b3 = s.addOnce(function () {
            YUITest.Assert.fail();
        });
        var b4 = s.add(function () {
            YUITest.Assert.fail();
        });
        var b5 = s.addOnce(function () {
            YUITest.Assert.fail();
        });
        YUITest.Assert.areSame(5, s.getNumListeners());
        s.removeAll();
        YUITest.Assert.areSame(0, s.getNumListeners());
        YUITest.Assert.isUndefined(b1.listener);
        YUITest.Assert.isUndefined(b1.getListener());
        YUITest.Assert.isUndefined(b1.context);
        YUITest.Assert.isUndefined(b2.listener);
        YUITest.Assert.isUndefined(b2.getListener());
        YUITest.Assert.isUndefined(b2.context);
        YUITest.Assert.isUndefined(b3.listener);
        YUITest.Assert.isUndefined(b3.getListener());
        YUITest.Assert.isUndefined(b3.context);
        YUITest.Assert.isUndefined(b4.listener);
        YUITest.Assert.isUndefined(b4.getListener());
        YUITest.Assert.isUndefined(b4.context);
        YUITest.Assert.isUndefined(b5.listener);
        YUITest.Assert.isUndefined(b5.getListener());
        YUITest.Assert.isUndefined(b5.context);
        s.dispatch();
    },
    testRemoveAllTwice: function () {
        var s = new signals.Signal();
        s.addOnce(function () {
            YUITest.Assert.fail();
        });
        s.addOnce(function () {
            YUITest.Assert.fail();
        });
        s.add(function () {
            YUITest.Assert.fail();
        });
        s.add(function () {
            YUITest.Assert.fail();
        });
        s.add(function () {
            YUITest.Assert.fail();
        });
        YUITest.Assert.areSame(5, s.getNumListeners());
        s.removeAll();
        s.removeAll();
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testRemoveNull: function () {
        var s = new signals.Signal();
        var l1 = function () {
            YUITest.Assert.fail();
        };
        var b1 = s.add(l1);
        s.remove();
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testRemoveDiffContext: function () {
        var s = new signals.Signal();
        var l1 = function () {
            YUITest.Assert.fail();
        };
        var obj = {
        };
        var b1 = s.add(l1);
        var b2 = s.add(l1, obj);
        YUITest.Assert.areSame(2, s.getNumListeners());
        YUITest.Assert.isUndefined(b1.context);
        YUITest.Assert.areSame(l1, b1.getListener());
        YUITest.Assert.areSame(obj, b2.context);
        YUITest.Assert.areSame(l1, b2.getListener());
        s.remove(l1, obj);
        YUITest.Assert.isUndefined(b2.context);
        YUITest.Assert.isUndefined(b2.getListener());
        YUITest.Assert.isUndefined(b1.context);
        YUITest.Assert.areSame(l1, b1.getListener());
        YUITest.Assert.areSame(1, s.getNumListeners());
        s.remove(l1);
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testRemoveDiffContext2: function () {
        var s = new signals.Signal();
        var l1 = function () {
            YUITest.Assert.fail();
        };
        var obj = {
        };
        var b1 = s.add(l1);
        var b2 = s.add(l1, obj);
        YUITest.Assert.areSame(2, s.getNumListeners());
        YUITest.Assert.isUndefined(b1.context);
        YUITest.Assert.areSame(l1, b1.getListener());
        YUITest.Assert.areSame(obj, b2.context);
        YUITest.Assert.areSame(l1, b2.getListener());
        s.remove(l1);
        YUITest.Assert.isUndefined(b1.context);
        YUITest.Assert.isUndefined(b1.getListener());
        YUITest.Assert.areSame(obj, b2.context);
        YUITest.Assert.areSame(l1, b2.getListener());
        YUITest.Assert.areSame(1, s.getNumListeners());
        s.remove(l1, obj);
        YUITest.Assert.areSame(0, s.getNumListeners());
        s.dispatch();
    },
    testMemorize: function () {
        var s = new signals.Signal();
        s.memorize = true;
        var count = 0;
        var ts1 = +(new Date());
        s.addOnce(function (a, b) {
            count++;
            YUITest.Assert.areSame('foo', a);
            YUITest.Assert.areSame(ts1, b);
        });
        s.dispatch('foo', ts1);
        s.addOnce(function (a, b) {
            count++;
            YUITest.Assert.areSame('foo', a);
            YUITest.Assert.areSame(ts1, b);
        });
        var ts2 = +(new Date());
        s.dispatch('bar', ts2);
        s.addOnce(function (a, b) {
            count++;
            YUITest.Assert.areSame('bar', a);
            YUITest.Assert.areSame(ts2, b);
        });
        YUITest.Assert.areSame(3, count);
    },
    testMemorizeForget: function () {
        var s = new signals.Signal();
        s.memorize = true;
        var count = 0;
        var ts1 = +(new Date());
        s.addOnce(function (a, b) {
            count++;
            YUITest.Assert.areSame('foo', a);
            YUITest.Assert.areSame(ts1, b);
        });
        s.dispatch('foo', ts1);
        s.addOnce(function (a, b) {
            count++;
            YUITest.Assert.areSame('foo', a);
            YUITest.Assert.areSame(ts1, b);
        });
        var ts2 = +(new Date());
        s.dispatch('bar', ts2);
        s.forget();
        s.addOnce(function (a, b) {
            count++;
            YUITest.Assert.fail('a: ' + a + ' - b: ' + b);
        });
        YUITest.Assert.areSame(2, count);
    },
    testMemorizeDispose: function () {
        var s = new signals.Signal();
        s.memorize = true;
        s.dispatch('foo', 123);
        YUITest.Assert.areSame('foo', s._prevParams[0]);
        YUITest.Assert.areSame(123, s._prevParams[1]);
        YUITest.Assert.areSame(0, s._bindings.length);
        s.dispose();
        YUITest.Assert.areSame(undefined, s._prevParams);
        YUITest.Assert.areSame(undefined, s._bindings);
    },
    testDispose1: function () {
        var s = new signals.Signal();
        s.addOnce(function () {
        });
        s.add(function () {
        });
        YUITest.Assert.areSame(2, s.getNumListeners());
        s.dispose();
        s.dispatch();
    },
    testDispose2: function () {
        var s = new signals.Signal();
        s.addOnce(function () {
        });
        s.add(function () {
        });
        YUITest.Assert.areSame(2, s.getNumListeners());
        s.dispose();
        s.add(function () {
        });
    },
    testDispose3: function () {
        var s = new signals.Signal();
        s.addOnce(function () {
        });
        s.add(function () {
        });
        YUITest.Assert.areSame(2, s.getNumListeners());
        s.dispose();
        s.remove(function () {
        });
    },
    testDispose4: function () {
        var s = new signals.Signal();
        s.addOnce(function () {
        });
        s.add(function () {
        });
        YUITest.Assert.areSame(2, s.getNumListeners());
        s.dispose();
        s.getNumListeners();
    }
});
