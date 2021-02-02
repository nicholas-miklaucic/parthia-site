// Parses Outcomes into a clean HTML form.

// {
//     "prob": 0.00006389700000000014,
//     "atk_hp": 40,
//     "def_hp": 50
// },

let testArr = [
    {
        "prob": 0.00006389700000000014,
        "atk_hp": 40,
        "def_hp": 50
    },
    {
        "prob": 0.005938385400000006,
        "atk_hp": 40,
        "def_hp": 30
    },
    {
        "prob": 0.11376032103000003,
        "atk_hp": 40,
        "def_hp": 0
    },
    {
        "prob": 0.00014855150000000025,
        "atk_hp": 30,
        "def_hp": 50
    },
    {
        "prob": 0.01380590730000001,
        "atk_hp": 30,
        "def_hp": 30
    },
    {
        "prob": 0.036408034485000004,
        "atk_hp": 30,
        "def_hp": 0
    },
    {
        "prob": 0.00014855150000000025,
        "atk_hp": 10,
        "def_hp": 50
    },
    {
        "prob": 0.01380590730000001,
        "atk_hp": 10,
        "def_hp": 30
    },
    {
        "prob": 0.036408034485000004,
        "atk_hp": 10,
        "def_hp": 0
    },
    {
        "prob": 0.13797369657000003,
        "atk_hp": 40,
        "def_hp": 10
    },
    {
        "prob": 0.320769356715,
        "atk_hp": 30,
        "def_hp": 10
    },
    {
        "prob": 0.320769356715,
        "atk_hp": 10,
        "def_hp": 10
    }
]

[
    {
        "prob": 0.00006389700000000014,
        "atk_hp": 40,
        "def_hp": 50
    },
    {
        "prob": 0.005938385400000006,
        "atk_hp": 40,
        "def_hp": 30
    },
    {
        "prob": 0.11376032103000003,
        "atk_hp": 40,
        "def_hp": 0
    },
    {
        "prob": 0.00014855150000000025,
        "atk_hp": 30,
        "def_hp": 50
    },
    {
        "prob": 0.01380590730000001,
        "atk_hp": 30,
        "def_hp": 30
    },
    {
        "prob": 0.036408034485000004,
        "atk_hp": 30,
        "def_hp": 0
    },
    {
        "prob": 0.00014855150000000025,
        "atk_hp": 10,
        "def_hp": 50
    },
    {
        "prob": 0.01380590730000001,
        "atk_hp": 10,
        "def_hp": 30
    },
    {
        "prob": 0.036408034485000004,
        "atk_hp": 10,
        "def_hp": 0
    },
    {
        "prob": 0.13797369657000003,
        "atk_hp": 40,
        "def_hp": 10
    },
    {
        "prob": 0.320769356715,
        "atk_hp": 30,
        "def_hp": 10
    },
    {
        "prob": 0.320769356715,
        "atk_hp": 10,
        "def_hp": 10
    }
]

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
    return (atkSurvival, defSurvival);
}

// returns Bootstrap HTML listing all of the outcomes
function fullOutput(sortedArr) {
    let html = `<div class="collapse" id="full-outcomes">
<ul class="list-group">
`;
    sortedArr.forEach(outcome => {
        if (outcome["prob"] >= MIN_PROB) {
            html += '<li class="list-group-item outcome font-monospace">';
            probStr = outcome["prob"].toFixed(2)+"%";
            html += '"<span class="outcome-prob">' + probStr + "</span>: ";
            html += "Attacker:\t" + outcome["atk_hp"];
            html += "Defender:\t" + outcome["def_hp"];
            html += '</li>';
        }
    });
    return html + "</ul></div>";
}
