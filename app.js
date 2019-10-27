var budgetController =(function() {
  
})();



var UIController = (function(){

})();



var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = function() {
        //1. Get the fiels input date

        //2. Add the item to the budget controller

        //3. Add the item to UI

        //4. Calcudate the budget

        //5. Diplay the budget on the UI

        console.log('aaa');
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || e.which === 13){
            ctrlAddItem();
        }
    });

})(budgetController, UIController);