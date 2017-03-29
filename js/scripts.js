$( document ).ready(function() {
    var quips_operational_title = [
        "Nope, it's just you.",
        "Looks good to me!",
        "Full steam ahead, Captain!",
        "All good here!"
    ];
    var quips_inop_title = [
        "Looks like something's wrong.",
        "What'd you do this time?",
        "Great, you broke the internet!",
        "Welp, there goes our uptime.",
        "#justgtwifithings"
    ];
    var quips_operational_content = [
        "Have you tried the troubleshooting steps on the <a href='http://lawn.gatech.edu'>LAWN website</a>?",
        "Live on campus? Stop by the <a href='http://wrecktechs.gatech.edu'>Wreck Techs offices</a> for help!",
        "Want help? Stop by the <a href='http://tsc.oit.gatech.edu'>OIT TSC</a> in Clough next to Starbucks.",
        "Be a good network citizen! Refrain from using mobile hotspots on campus unless absolutely necessary."
    ];
    var quips_inop_content = [
        "While you're waiting, why not check out <a href='http://robojackets.org'>RoboJackets</a>?",
        "Full details can be found on the <a href='http://status.gatech.edu'>GT OIT Status Page</a>.",
        "Go get a cup of coffee (or apple juice) and it might be back up by then.",
        "Don't you have homework to do? Oh wait...",
        '<iframe width="320" height="240" src="https://youtube.com/embed/UTBsm0LzSP0?start=142&autoplay=1" frameborder="0" allowfullscreen></iframe>',
        '<iframe width="320" height="240" src="https://www.youtube.com/embed/ILVfzx5Pe-A?autoplay=1" frameborder="0" allowfullscreen></iframe>'
    ];
    var sp = new StatusPage.page({page: '8g7xbc4zyc5l'});
    sp.components({
        success: function (data) {
            var lawn_id = 0;
            var campusnet_id = 0;
            var override = null;
            for (var i = 0, len = data.components.length; i < len; i++) {
                if (data.components[i].name == "LAWN") { lawn_id = i; }
                if (data.components[i].name == "Campus Network") { campusnet_id = i; }
            }
            if(data.components[lawn_id].status == "operational" && override == null) {
                var rand_title = Math.floor(Math.random()*quips_operational_title.length);
                var rand_content = Math.floor(Math.random()*quips_operational_content.length);
                $('#title').text(quips_operational_title[rand_title]);
                $('#status').text("No issues currently reported for LAWN.");
                $('#content').html(quips_operational_content[rand_content]);
                $('body').css("background-color","green");
            } else if (data.components[lawn_id].status == "degraded_performance" || override == "degraded") {
                var rand_title = Math.floor(Math.random()*quips_inop_title.length);
                var rand_content = Math.floor(Math.random()*quips_inop_content.length);
                $('#title').text(quips_inop_title[rand_title]);
                $('#status').text("LAWN is currently in a degraded state.");
                $('#content').html(quips_inop_content[rand_content]);
                $('body').css("background-color","goldenrod");
            } else if (data.components[lawn_id].status == "partial_outage" || override == "partial") {
                var rand_title = Math.floor(Math.random()*quips_inop_title.length);
                var rand_content = Math.floor(Math.random()*quips_inop_content.length);
                $('#title').text(quips_inop_title[rand_title]);
                $('#status').text("There is a partial LAWN outage.");
                $('#content').html(quips_inop_content[rand_content])
                $('body').css("background-color","orange");
            } else if (data.components[lawn_id].status == "major_outage" || override == "major") {
                var rand_title = Math.floor(Math.random()*quips_inop_title.length);
                var rand_content = Math.floor(Math.random()*quips_inop_content.length);
                $('#title').text(quips_inop_title[rand_title]);
                $('#status').text("There is a major LAWN outage.");
                $('#content').html(quips_inop_content[rand_content])
                $('body').css("background-color","red");
            } else {
                $('#title').text("I'm not quite sure.");
                $('#status').text("Something went wrong while checking the status.");
                $('body').css("background-color","#333");
            }
        },
        error: function (data) {
            $('#title').text("I'm not quite sure.");
            $('#status').html("Unable to reach <a href='http://status.gatech.edu'>status.gatech.edu</a>.");
            $('body').css("background-color","#333");
        }
    })
});