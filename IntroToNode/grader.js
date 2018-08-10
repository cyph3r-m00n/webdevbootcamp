var scores = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

function average(score) {
    var total = 0;
    for(var i = 0; i < score.length; i++) {
        total += score[i];
    }
    return Math.round(total / score.length);
}

console.log(average(scores));
console.log(average(scores2));