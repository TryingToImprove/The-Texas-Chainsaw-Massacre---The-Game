/// <reference path="_ref.js" />

(function ($, Backbone, exports) {

    $(function () {
        var Buildings = App.Collections.Buildings = function () {

            var buildings = {};
            buildings.current = [];

            buildings.add = function (building) {
                this.current.push(building);
            };

            buildings.hit = function (x, y, width, height) {
                for (var i = 0; i < this.current.length; i++) {

                    var building = this.current[i];

                    if (building.hit(x, y, width, height)) {
                        return true;
                    }

                }
                return false;
            };

            buildings.renderAll = function (context) {
                for (var i = 0; i < this.current.length; i++) {
                    this.current[i].render(context);
                }
            }

            return buildings;

        } ();
    });

})(jQuery, Backbone, window);
