(function ($, Backbone, exports) {
    $(function () {
        var Building = exports.App.Drawings.Building = Backbone.Model.extend({
            defaults: {
                "name": undefined,
                "color": "black",
                "boxes": []
            },
            initialize: function (attrs) {
                this.set("boxes", []);
                this.set("name", attrs.name);

                if (attrs.color != undefined)
                    this.set("color", attrs.color);
            },
            addBox: function (x, y, width, height) {
                //Opret en bygning blok
                var buildingBox = new exports.App.Drawings.BuildingBox({
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    color:this.get("color")
                });

                //Tilføj den til denne bygning
                this.get("boxes").push(buildingBox);
            },
            hit: function (x, y, width, height) {
                var boxes = this.get("boxes"),
                    boxesLength = boxes.length;

                for (var i = 0; i < boxesLength; i++) {
                    var box = boxes[i];
                    if (box.hit(x, y, width, height)) {
                        return true;
                    }
                }
                return false;
            },
            render: function (context) {
                var boxes = this.get("boxes"),
                    boxesLength = boxes.length;

                for (var i = 0; i < boxesLength; i++) {
                    var box = boxes[i];
                    box.render(context);
                }

                return true;
            }
        });
    });
})(jQuery, Backbone, window);