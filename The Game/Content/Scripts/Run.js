/// <reference path="_ref.js" />

(function ($, Backbone, exports) {
    $(function () {

        var context = window.App.Context;


        var crazyMan = new window.App.Drawings.CrazyMan({ name: "Oliver" });

        function clear() {
            context.clearRect(0, 0, window.App.Specs.width, window.App.Specs.height);
        }


        window.run = function (time) {
            if (window.App.State === "PLAYING") {
                $(window.App.Canvas).removeClass("clickable")

                clear();

                context.drawImage(window.App.Images.background, 0, 0);

                window.App.TimeWatch.decrementTime((time - window.animationStartTime));
                window.App.TimeWatch.render(window.App.Context);

                window.App.Collections.Buildings.renderAll(context);
                window.App.Collections.Victims.renderAll(context);
                window.App.Collections.Walls.renderAll(context);

                window.App.Scoreboard.render(context);

                crazyMan.update(!window.App.Collections.Buildings.hit(crazyMan.get("nextX"), crazyMan.get("nextY"), crazyMan.get("width"), crazyMan.get("height")));

                if (!crazyMan.hitWall()) {
                    if
                (
                    (!window.App.Collections.Buildings.hit(crazyMan.get("nextX"), crazyMan.get("nextY"), crazyMan.get("width"), crazyMan.get("height")))
                    &&
                    (!window.App.Collections.Walls.hit(crazyMan.get("nextX"), crazyMan.get("nextY"), crazyMan.get("width"), crazyMan.get("height")))
                ) {
                        crazyMan.move();
                    }
                }

                crazyMan.render(context);

                window.App.Collections.Victims.changeDirections();

                if (crazyMan.get("attacking")) {
                    var victim = window.App.Collections.Victims.chainSawHitting(crazyMan.get("chainsaw"), context);
                    if (victim) {
                        victim.hitting();
                        window.App.Scoreboard.incrementScore(10);

                        if (victim.get("dead")) {
                            window.App.Scoreboard.incrementDeads(1);
                            window.App.TimeWatch.incrementTime(1);
                        }
                    }
                }
                window.animationStartTime = Date.now();
                webkitRequestAnimationFrame(run);
            }
            else if (window.App.State === "GAME_OVER") {
                window.App.ClickToPlay = true;
                window.App.Audio.stopAll();

                clear();

                context.font = "bold 50px sans-serif";
                context.fillStyle = "black";
                context.textBaseline = "bottom";
                context.fillText("Du løb tør for tid", 100, 100);

                context.font = "bold 16px sans-serif";
                context.fillStyle = "black";
                context.textBaseline = "top";
                context.fillText("Du nåede at få en score på " + window.App.Scoreboard.get("score") + " ud af " + window.App.Scoreboard.get("killed") + " uskyldige ofre...", 100, 120);

                context.font = "bold 25px sans-serif";
                context.fillStyle = "green";
                context.textBaseline = "top";
                context.fillText("Klik for at prøve igen", 100, 180);
                $(window.App.Canvas).addClass("clickable")

            }
            else if (window.App.State === "BEFORE_START") {
                $(window.App.Canvas).addClass("clickable")
                window.App.ClickToPlay = true;
                window.App.Audio.stopAll();

                clear();

                context.font = "bold 50px sans-serif";
                context.fillStyle = "black";
                context.textBaseline = "bottom";
                context.fillText("The Texas Chain Saw Massacre", 50, 100);

                context.font = "bold 25px sans-serif";
                context.fillStyle = "black";
                context.textBaseline = "bottom";
                context.fillText("---- THE GAME", 50, 125);

                var txt = "Dit mål er at dræbe de grønne prikker, som du skal forstille er dine ofre.\nDu er selv den røde, og du har fået udleveret en motorsav,\nsom du kan save de grønne prikker over ved at trykke på space.\nDu rykker rund med WASD eller piletasterne.\n\nSpillet bygget på The Texas Chain Saw Massacre hvor\nmorderen er blevet sluppet løs i Musicon på festivalen";
                var x2 = 50;
                var y2 = 130;
                var lineheight = 20;
                var lines = txt.split("\n");
                context.textBaseline = "top";
                context.font = "normal 16px sans-serif";

                for (var a = 0; a < lines.length; a++) {
                    context.fillText(lines[a], x2, y2+(lineheight*a));
                }


                context.font = "bold 25px sans-serif";
                context.fillStyle = "green";
                context.textBaseline = "top";
                context.fillText("Klik for at prøve spillet", 50, 280);
                $(window.App.Canvas).addClass("clickable")
            }

        }
    });
})(jQuery, Backbone, window);
