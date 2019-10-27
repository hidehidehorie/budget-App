var budgetController =(function() {
    var x = 23;

    var add = function(a) {
        return x + a;
    }

    return {
        pulicTest: function(b){
            return add(b);
        }
    }
})();


var UIController = (function(){

})();


var controller = (function(budgetCtrl, UICtrl){

    var z = budgetCtrl.pulicTest(6);
    return {
        anotherPulick: function() {
            console.log(z);
        }
    }
    
})(budgetController, UIController);