var solveNRooks = function(n){
  var solution = [
    [false, true,  false, false],
    [false, false, false, true ],
    [true,  false, false, false],
    [false, false, true,  false]
  ];
  // the above is a pre-baked solution for when n = 4.
  // Write code here that will find solutions for any n
  // hint: you'll want to start by building your own matrix to put in the solution variable

  // Creates a base array based on n for calculating the set of all possible board configurations
  var initBaseArray = function(){
    var baseArray = [];
    for (var tCount = 0; tCount < n; tCount++) {
      baseArray.push(true);
    };
    for(var fCount = 0; fCount < ((n*n)-n); fCount++){
      baseArray.push(false);
    };
    return baseArray;
  };

  // Formula for converting from coordinates to index: (n*r)+c = idx
  var convertFlatToMatrix = function(flatArray){
    var matrixArray = [];
    for(var row = 0; row < n; row++) {
      matrixArray[row] = [];
      for(var col = 0; col < n; col++) {
        matrixArray[row].push(flatArray[(n*row)+col]);
      }
    }
    return matrixArray;
  };

  var permArr = [],
    usedChars = [];

  // Calculate all possible board permutations based on a flat array
  function permute(input) {
      var i, ch;
      for (i = 0; i < input.length; i++) {
          ch = input.splice(i, 1)[0];
          usedChars.push(ch);
          if (input.length == 0) {
              permArr.push(usedChars.slice());
          }
          permute(input);
          input.splice(i, 0, ch);
          usedChars.pop();
      }
      return permArr
  };

  var baseArray = initBaseArray();
  var startTime = new Date();
  var possibleBoardsArray = permute(baseArray);
  for (var i = 0; i < possibleBoardsArray.length; i++) {
    var currentBoard = convertFlatToMatrix(possibleBoardsArray[i]);
    window.chessboardView.model.setSimpleBoard(currentBoard);
    if(!window.chessboardView.model.hasRooksConflict()){
      break;
    };
    window.chessboardView.model.trigger('change');
  };
  var endTime = new Date();
  console.log("Solution took "+(endTime - startTime)/1000+" seconds");

  // this line hooks into the visualizer
  // window.chessboardView.model.setSimpleBoard(solution);
  return solution;
}
