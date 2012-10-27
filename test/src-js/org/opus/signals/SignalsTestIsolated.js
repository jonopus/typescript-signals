var SignalsTestIsolated = new YUITest.TestCase({
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
            testBindingDispose: 'b1.dispose is not a function',
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
    testHasListener: function () {
        var s = new signals.Signal();
        var l = function () {
            console.log("ASD");
        };
        s.add(l);
        YUITest.Assert.areSame(true, s.has(l));
    }
});
