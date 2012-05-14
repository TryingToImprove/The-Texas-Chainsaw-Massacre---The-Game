$(function () {
    function generateBuildings() {
        var hall12 = new window.App.Drawings.Building({ name: "Hal 12" });
        hall12.addBox(364, 109, 124, 40);
        hall12.addBox(364, 149, 81, 68);

        window.App.Collections.Buildings.add(hall12);

        var cantine = new window.App.Drawings.Building({ name: "Kantine" });
        cantine.addBox(239, 253, 22, 57);
        window.App.Collections.Buildings.add(cantine);

        var hall11 = new window.App.Drawings.Building({ name: "Hal 11" });
        hall11.addBox(576, 163, 210, 51);
        window.App.Collections.Buildings.add(hall11);

        var wc = new window.App.Drawings.Building({ name: "WC" });
        wc.addBox(364, 465, 29, 35);
        window.App.Collections.Buildings.add(wc);

        var hall1 = new window.App.Drawings.Building({ name: "Hal 1" });
        hall1.addBox(116, 296, 61, 133);
        hall1.addBox(177, 332, 44, 97);
        hall1.addBox(57, 429, 164, 43);
        window.App.Collections.Buildings.add(hall1);

        var hall9 = new window.App.Drawings.Building({ name: "Hal 9" });
        hall9.addBox(763, 290, 78, 63);
        window.App.Collections.Buildings.add(hall9);

        var workshop = new window.App.Drawings.Building({ name: "Værksted" });
        workshop.addBox(696, 357, 146, 37);
        workshop.addBox(680, 394, 162, 46);
        window.App.Collections.Buildings.add(workshop);

        var roskildeSchool = new window.App.Drawings.Building({ name: "Roskilde Tekniske Skole", color: "orange" });
        roskildeSchool.addBox(330, 0, 570, 30);
        window.App.Collections.Buildings.add(roskildeSchool);
    }

    function generateWalls() {
        var wall1 = new window.App.Drawings.Wall({});
        wall1.addBox(543, 80, 1, 75);
        wall1.addBox(543, 186, 1, 57);
        wall1.addBox(543, 243, 357, 3);

        window.App.Collections.Walls.add(wall1);

        var parkingLot = new window.App.Drawings.Wall({});
        parkingLot.addBox(370, 325, 260, 2);
        parkingLot.addBox(370, 325, 1, 35);
        parkingLot.addBox(390, 325, 1, 35);
        parkingLot.addBox(410, 325, 1, 35);
        parkingLot.addBox(430, 325, 1, 35);
        parkingLot.addBox(450, 325, 1, 35);
        parkingLot.addBox(470, 325, 1, 35);
        parkingLot.addBox(490, 325, 1, 35);
        parkingLot.addBox(510, 325, 1, 35);
        parkingLot.addBox(530, 325, 1, 35);
        parkingLot.addBox(550, 325, 1, 35);
        parkingLot.addBox(570, 325, 1, 35);
        parkingLot.addBox(590, 325, 1, 35);
        parkingLot.addBox(610, 325, 1, 35);
        parkingLot.addBox(630, 325, 1, 35);

        window.App.Collections.Walls.add(parkingLot);
    }

    function generateVictims(numberOfVictims) {
        for (var i = 0; i < numberOfVictims; i++) {
            window.App.Collections.Victims.add(window.App.Collections.Victims.generateNew());
        }
    }

    var soundsToDownload = 2, current = 0;
    function loadSound(soundName, url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function () {
            window.App.AudioContext.decodeAudioData(request.response, function (buffer) {
                window.App.Audio.addSound(soundName, buffer, true);
                finishDownloaded();
            }, function (e) { console.log("Der skete en fejl"); });
        }
        request.send();
    }

    function generateScoreboard() {
        window.App.Scoreboard = new window.App.Drawings.Scoreboard({});
    }

    function generateTimeWatch() {
        window.App.TimeWatch = new window.App.Drawings.TimeWatch({});
    }

    generateWalls();
    generateVictims(3);
    generateBuildings();
    generateScoreboard();
    generateTimeWatch();

    function finishDownloaded() {
        current += 1;
        if (soundsToDownload == current) {
            window.App.State = "BEFORE_START";
            window.animationStartTime = Date.now();
            webkitRequestAnimationFrame(window.run);
        }
    }

    function loadSounds() {

        loadSound("scream", "content/sounds/Scream.mp3");
        loadSound("chainsaw", "content/sounds/chainsaw.mp3");

    }

    window.App.Images.background = new Image();
    window.App.Images.background.src = "content/graphics/background.png";
    window.App.Images.background.onload = function () {
        loadSounds();
    }

});
