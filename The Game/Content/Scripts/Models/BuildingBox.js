(function ($, Backbone, exports) {
    $(function () {
        var BuildingBox = exports.App.Drawings.BuildingBox = Backbone.Model.extend({
            defaults: {
                "x": undefined,
                "y": undefined,
                "width": undefined,
                "height": undefined,
                "color": "black"
            },
            initialize: function (attrs) {
                this.set("x", attrs.x);
                this.set("y", attrs.y);
                this.set("width", attrs.width);
                this.set("height", attrs.height);

                if (attrs.color)
                    this.set("color", attrs.color);
            },
            hit: function (x, y, width, height) {
                var thisX = this.get("x"),
                    thisY = this.get("y"),
                    thisWidth = this.get("width"),
                    thisHeight = this.get("height"),
                    thatXwidth = x + width,
                    thatYheight = y + height;


                //one.left <= two.right && one.right >= two.left &&
                //one.top <= two.bottom && one.bottom >= two.top;
                if (((x <= (thisX + thisWidth)) && (thatXwidth >= thisX)) && ((y <= (thisY + thisHeight)) && (thatYheight >= thisY))) {
                    return true;
                }
                return false;
            },
            render: function (context) {
                var thisX = this.get("x"),
                    thisY = this.get("y"),
                    thisWidth = this.get("width"),
                    thisHeight = this.get("height");

                context.fillStyle = this.get("color");
                context.fillRect(thisX, thisY, thisWidth, thisHeight);
            }
        });
    });
})(jQuery, Backbone, window);