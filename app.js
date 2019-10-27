var budgetController =(function() {
  
})();



var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                descrition: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
        return DOMstrings;            
        }
    };
})();



var controller = (function(budgetCtrl, UICtrl){

    var DOM = UIController.getDOMstrings();

    var ctrlAddItem = function() {
        //1. Get the fiels input date
        var input = UIController.getinput();
        console.log(input);
        //2. Add the item to the budget controller

        //3. Add the item to UI

        //4. Calcudate the budget

        //5. Diplay the budget on the UI

    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || e.which === 13){
            ctrlAddItem();
        }
    });

})(budgetController, UIController);