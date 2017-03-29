$( document ).ready(function() {
    var quips_operational = [
        "Nope, it's just you.",
        "Looks good to me!",
        "Full steam ahead, Captain!",
        "All good here!"
    ];
    var quips_not_operational = [
        "Looks like something's wrong.",
        "What'd you do this time?",
        "Great, you broke the internet!",
        "Welp, there goes our uptime record."
    ];
    var quips_content = [
        "Have you tried the troubleshooting steps on the <a href='http://lawn.gatech.edu'>LAWN website</a>?",
        "Live on campus? Stop by the <a href='http://wrecktechs.gatech.edu'>Wreck Techs offices</a> for help!",
        "Want help? Stop by the <a href='http://tsc.oit.gatech.edu'>OIT TSC</a> in Clough next to Starbucks.",
    ];
    var sp = new StatusPage.page({page: '8g7xbc4zyc5l'});
    sp.components({
        success: function (data) {
            var lawn_id = 0;
            var campusnet_id = 0;
            for (var i = 0, len = data.components.length; i < len; i++) {
                if (data.components[i].name == "LAWN") { lawn_id = i; }
                if (data.components[i].name == "Campus Network") { campusnet_id = i; }
            }
            if(data.components[lawn_id].status == "operational") {
                var rand_title = Math.floor(Math.random()*quips_operational.length);
                var rand_content = Math.floor(Math.random()*quips_content.length);
                $('#title').text(quips_operational[rand_title]);
                $('#status').html("No issues currently reported for LAWN.");
                $('#content').html(quips_content[rand_content]);
            } else if (data.components[lawn_id].status == "degraded_performance") {
                var rand = Math.floor(Math.random()*quips_operational.length);
                $('#title').text(quips_not_operational[rand]);
                $('#status').html("LAWN is currently in a degraded state.");
                $('body').css("background-color","yellow");
            } else if (data.components[lawn_id].status == "partial_outage") {
                var rand = Math.floor(Math.random()*quips_operational.length);
                $('#title').text(quips_not_operational[rand]);
                $('#status').html("There is a partial LAWN outage.");
                $('body').css("background-color","orange");
            } else if (data.components[lawn_id].status == "major_outage") {
                var rand = Math.floor(Math.random()*quips_operational.length);
                $('#title').text(quips_not_operational[rand]);
                $('#status').html("There is a major LAWN outage.");
                $('body').css("background-color","red");
            } else {
                $('#title').text("I'm not quite sure.");
            }
        },
        error: function (data) {
            $('#title').text("I'm not quite sure.");
        }
    })
});