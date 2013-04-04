$(function(){
  window.chessboardView = new ChessboardView();
  $("body").append(chessboardView.render());

  // note: you can switch this out for solveNQueens when you're ready!

  // get value for n from the value already initialized in the view.
  var num = window.chessboardView.model.attributes.n;
  solveNRooks(num);
});
