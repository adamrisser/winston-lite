/**
 * Summary pane that compliments the map.
 * 
 * The summary pane appears on the left for languages that read left to right
 * and on the right for languages that do the opposite.  The summary holds
 * all the information that compliments the map. The pane can also be collapse 
 * to give the map more space on the page.
 * @fileoverview
 */
define(['core', 'directions', 'css!panecss'], function (coreModel, Directions) {
    
    /**
     * Pane widget
     * @type {Backbone.View}
     */
    var Pane = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '#pane',
        
        /**
         * Initialize the Pane view
         * @constructor
         */
        initialize: function () {
            _.bindAll(this, 'handleStateChange');
            
            coreModel.bind('change:state', this.handleStateChange);
        },
        
        /**
         * Handle a core model state change
         * @param {Backbone.Model} core  core model reference
         * @param {String}         state state string
         * @method
         */
        handleStateChange: function (core, state) {
            var self = this;
            
            switch (state) {
                case 'index':
                    require(['directory'], function (Directory) {
                        self.push(new Directory());    
                    });
                break;
                case 'directions':
                    require(['directions'], function (Directions) {
                        self.push(new Directions());    
                    });
                break;
            }
        },
        
        /**
         * Open the pane if it is closed
         * @method
         */
        open: function () {
            this.$el.show();
        },
        
        /**
         * Add html into the pane from a backbone view. 
         * Note: The backbone view must support returning itself from 
         *       its own view method!
         * @param {Backbone.View} view  backbone view
         * @method
         */
        push: function(view) {
            this.$el.append(view.render().el);
        },
        
        /**
         * Close the pane if it is open
         * @method
         */
        close: function () {
            this.$el.hide();
        }
        
    });
    
    /*
     * Export
     */
    return Pane;
    
});