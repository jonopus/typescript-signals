var SignalsTestIsolated = new YUITest.TestCase
(
	{  
        //name of the test case - if not provided, one is auto-generated
        name : "Basic Test",

        //---------------------------------------------------------------------
        // Special instructions
        //---------------------------------------------------------------------

        _should: {
            ignore: {},
            error : {
                testAddNull : 'listener is a required param of add() and should be a Function.',
                testAddOnceNull : 'listener is a required param of addOnce() and should be a Function.',
                testAddSameListenerMixed1 : 'You cannot add() then addOnce() the same listener without removing the relationship first.',
                testAddSameListenerMixed2 : 'You cannot addOnce() then add() the same listener without removing the relationship first.',
                testRemoveNull : 'listener is a required param of remove() and should be a Function.',
                testBindingDispose : 'b1.dispose is not a function',
                testDispose1 : true,
                testDispose2 : true,
                testDispose3 : true,
                testDispose4 : true
            }
        },

        //---------------------------------------------------------------------
        // setUp and tearDown
        //---------------------------------------------------------------------

        /*
         * Sets up data that is needed by each test.
         */
        setUp : function(){
        },

        /*
         * Cleans up everything that was created by setUp().
         */
        tearDown : function(){
        },

        //--------------------------- Add / Has ---------------------------------//

        testHasListener : function(){
            var s = new signals.Signal();

            var l = function(){
            	console.log("ASD")
            };

            s.add(l);

            YUITest.Assert.areSame(true, s.has(l));
        }
  	}
);