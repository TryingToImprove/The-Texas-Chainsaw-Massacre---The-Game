/// <reference path="_ref.js" />

(function ($, Backbone, exports) {
    $(function () {
        var app = {
            Drawings: {},
            Canvas: undefined,
            Context: undefined,
            Objects: {},
            Collections: {},
            Specs: {
                width: 0,

                height: 0
            }
        };

        app.Canvas = document.getElementById("canvas");
        app.Context = app.Canvas.getContext("2d");

        app.Specs.width = app.Canvas.width;
        app.Specs.height = app.Canvas.height;

        app.AudioContext = new webkitAudioContext();
        app.Audio = {
            sounds: [],
            addSound: function (name, buffer, loop) {
                var source = window.App.AudioContext.createBufferSource(); // creates a sound source
                source.buffer = buffer;                    // tell the source which sound to play
                source.loop = loop;

                app.Audio.sounds.push({
                    name: name,
                    source: source,
                    playing: false,
                    loop: loop,
                    buffer: buffer
                });
            }
        };
        app.ClickToPlay = false;

        app.newGame = function () {
            window.App.Scoreboard = new window.App.Drawings.Scoreboard({});
            window.App.TimeWatch = new window.App.Drawings.TimeWatch({});
        }

        $("body").click(function () {
            if (app.ClickToPlay) {
                app.newGame();
                app.State = "PLAYING";
                window.App.ClickToPlay = false;
                window.run();
            }
        });

        app.Images = {};

        app.State = "LOADING";

        app.Audio.play = function (name) {
            if (window.App.State == "PLAYING") {
                var buffer;
                for (var i = 0; i < this.sounds.length; i++) {
                    var sound = this.sounds[i];
                    if (sound.name === name) {
                        if (!sound.playing) {
                            var source = window.App.AudioContext.createBufferSource();
                            source.buffer = sound.buffer;
                            source.loop = sound.loop;
                            source.noteOn(0);

                            source.connect(window.App.AudioContext.destination);

                            sound.source = source;
                            sound.playing = true;
                        }
                    }
                }
            }
        };
        app.Audio.stop = function (name) {
            var buffer;
            for (var i = 0; i < this.sounds.length; i++) {
                var sound = this.sounds[i];
                if (sound.name === name) {
                    if (sound.playing) {
                        var source = sound.source;
                        source.noteOff(0);
                        sound.playing = false;
                    }
                }
            }
        };
        app.Audio.stopAll = function () {
            var buffer;
            for (var i = 0; i < this.sounds.length; i++) {
                var sound = this.sounds[i];
                if (sound.playing) {
                    var source = sound.source;
                    source.noteOff(0);
                    sound.playing = false;
                }
            }
        };

        (function () {

            $(app.Canvas).removeClass("clickable")

            var context = app.Context;

            context.font = "bold 50px sans-serif";
            context.fillStyle = "black";
            context.fillText("Indlæser....", 100, 100);

            context.font = "bold 16px sans-serif";
            context.fillStyle = "black";
            context.fillText("Indlæser grafik og lyd", 100, 120);

        })();

        exports.App = app;


    });
})(jQuery, Backbone, window);
