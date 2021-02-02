// from Bulma website for running the navbar

$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").on("click", function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});

$("#outcomes-toggle").click(function() {
    $("#full-outcomes").toggleClass("is-hidden");
});

const MIN_PROB = 0.001;

// returns [atkSurvival, defSurvival]
function survivalProbs(sortedArr) {
    let atkSurvival = 0;
    let defSurvival = 0;
    sortedArr.forEach(outcome => {
        if (outcome['atk_hp'] != 0) {
            atkSurvival += outcome['prob'];
        }
        if (outcome['def_hp'] != 0) {
            defSurvival += outcome['prob'];
        }
    });
    return [atkSurvival, defSurvival];
}

// returns Bootstrap HTML listing all of the outcomes
function fullOutput(sortedArr) {
    let html = '<table class="table is-striped has-text-right">';
    html += `<thead><tr>
<th>Probability</th>
<th>Attacker HP</th>
<th>Defender HP</th></tr></thead>`;
    sortedArr.forEach(outcome => {
        if (outcome["prob"] >= MIN_PROB) {
            probStr = (100 * outcome["prob"]).toFixed(2) +"%";
            html += `
<tr><th>${probStr}</th>
<td>${outcome["atk_hp"]}</td>
<td>${outcome["def_hp"]}</td></tr>`;
        }
    });
    return html + "</ul>";
}


const GAMES = {
    FE1: "Shadow Dragon & the Blade of Light",
    FE2: "Gaiden",
    FE3: "Mystery of the Emblem",
    FE4: "Genealogy of the Holy War",
    FE5: "Thracia 776",
    FE6: "Binding Blade",
    FE7: "Blazing Blade",
    FE8: "The Sacred Stones",
    FE9: "Path of Radiance",
    FE10: "Radiant Dawn",
    FE11: "Shadow Dragon",
    FE12: "New Mystery of the Emblem",
    FE13: "Awakening",
    FE14: "Fates",
    SoV: "Shadows of Valentia",
    FE15: "Three Houses",
}

for (const game in GAMES) {
    let name = GAMES[game];
    console.log(game);
    console.log(name);
    $("#game-select").append(`<option value="${game}">${name}</option>`);
}


$("#calc-btn").click(function() {
    var data = JSON.stringify({
        "atk_hp": parseInt($("#atk-hp").val()),
        "atk": {
            "dmg": parseInt($("#atk-dmg").val()),
            "hit": parseInt($("#atk-hit").val()),
            "crit": parseInt($("#atk-crit").val()),
            "is_brave": $("#atk-brave").is(":checked")
        },
        "def_hp": parseInt($("#def-hp").val()),
        "def": {
            "dmg": parseInt($("#def-dmg").val()),
            "hit": parseInt($("#def-hit").val()),
            "crit": parseInt($("#def-crit").val()),
            "is_brave": $("#def-brave").is(":checked")
        },
        "speed": $("input[name='speed-radio']:checked").val(),
        "game": $("#game-select").val(),
    });
    console.log(data);
    var xhr = new XMLHttpRequest();
    var url = "https://161.35.123.18:3030/calc/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            json.sort((out1, out2) => out1["prob"] - out2["prob"]);
            json.reverse();
            let probs = survivalProbs(json);
            $("#atk-prob").html((100 * probs[0]).toFixed(1) +"%");
            $("#def-prob").html((100 * probs[1]).toFixed(1) +"%");
            $("#full-outcomes").html(fullOutput(json));
        }
    };
    xhr.send(data);
});
