(function(){

  var ChessboardModel = Backbone.Model.extend({
    initialize: function(params){
      if (params.n) {
        this.clearPieces();
      } else {
        this.setSimpleBoard(params.board);
      }
    },

    clearPieces: function(){
      this.set('board', this.makeEmptyBoard());
    },

    setSimpleBoard: function(simpleBoard){
      this.set('board', this.makeBoardFromSimpleBoard(simpleBoard));
      this.set('n', this.get('board').length);
    },

    // Convert board from simple 2D array to Board object
    makeBoardFromSimpleBoard: function(simpleBoard){
      var that = this;
      return _.map(simpleBoard, function(cols, r){
        return _.map(cols, function(hasPiece, c){
          return {
            row: r,
            col: c,
            piece: hasPiece,
            sign: ((r+c)%2),
            inConflict: function(){
              // todo: how expensive is this inConflict() to compute?
              return (
                that.hasRowConflictAt(r) ||
                that.hasColConflictAt(c) ||
                that.hasUpLeftConflictAt(that._getUpLeftIndex(r, c)) ||
                that.hasUpRightConflictAt(that._getUpRightIndex(r, c))
              );
            }
          };
        }, this);
      }, this);
    },

    makeEmptyBoard: function(){
      var board = [];
      _.times(this.get('n'), function(){
        var row = [];
        _.times(this.get('n'), function(){
          row.push(false);
        }, this);
        board.push(row);
      }, this);
      return this.makeBoardFromSimpleBoard(board);
    },

    // we want to see the first row at the bottom, but html renders things from top down
    // So we provide a reversing function to visualize better
    reversedRows: function(){
      return _.extend([], this.get('board')).reverse();
    },

    togglePiece: function(r, c){
      this.get('board')[r][c].piece = !this.get('board')[r][c].piece;
      this.trigger('change');
    },

    _getUpLeftIndex: function(r, c){
      return r + c;
    },

    _getUpRightIndex: function(r, c){
      return this.get('n') - c + r - 1;
    },


    hasRooksConflict: function(){
      return this.hasAnyRowConflict() || this.hasAnyColConflict();
    },

    hasQueensConflict: function(){
      return this.hasRooksConflict() || this.hasAnyUpLeftConflict() || this.hasAnyUpRightConflict();
    },

    _isInBounds: function(r, c){
      return 0 <= r && r < this.get('n') && 0 <= c && c < this.get('n');
    },


    // todo: fill in all these functions - they'll help you!

    hasAnyRowConflict: function(){
      // Return true if any row on the board has a conflict
      // A row has a conflict if there is more than one piece in the row
      var numCols = this.attributes.n;
      var numRows = this.attributes.n;
      for(row = 0; row < numRows; row++){
        var trueCount = 0;
        for(col = 0; col < numCols; col++) {
          if(this.attributes.board[row][col].piece) {
            trueCount++
          };
          if(trueCount > 1) {
            return true;
          };
        };
      };
      return false;
    },

    hasRowConflictAt: function(r){
      // todo
    },

    hasAnyColConflict: function(){
      // Return true if any column on the board has a conflict
      // A column has a conflict if there is more than one piece in the column
      var numCols = this.attributes.n;
      var numRows = this.attributes.n;
      for(col = 0; col < numCols; col++) {
        var trueCount = 0;
        for(row = 0; row < numRows; row++) {
          if(this.attributes.board[row][col].piece){
            trueCount++;
          }
          if (trueCount > 1){
            return true;
          }
        }
      }
      return false;
    },

    hasColConflictAt: function(c){
      // todo
    },

    hasAnyUpLeftConflict: function(){
      // A column has a conflict if there is more than one piece in the diagonal
      // from top left to bottom right
      var numCols = this.attributes.n;
      var numRows = this.attributes.n;
      // If this element has valid indices:
        // look at this element. If it has a piece, increment trueCount.
        // if trueCount > 1, return true;
        // else go to the next diagonal. Repeat.
      for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
          var curRow = row;
          var curCol = col;
          var trueCount = 0;
          while((curRow < numRows) && (curCol < numCols)){
            if(this.attributes.board[curRow][curCol].piece){ trueCount++; };
            if(trueCount > 1) { return true; };
            curRow++;
            curCol++;
          }
        }
      }
      return false;
    },

    hasUpLeftConflictAt: function(upLeftIndex){
      // todo
    },

    hasAnyUpRightConflict: function(){
      // A column has a conflict if there is more than one piece in the diagonal
      // from top right to bottom left
      var numCols = this.attributes.n;
      var numRows = this.attributes.n;
      for (var row = 0; row < numRows; row++) {
        for (var col = numCols-1; col >= 0; col--) {
          var curRow = row;
          var curCol = col;
          var trueCount = 0;
          while((curRow < numRows) && (curCol >= 0)){
            if(this.attributes.board[curRow][curCol].piece){ trueCount++; };
            if(trueCount > 1) { return true; };
            curRow++;
            curCol--;
          }
        }
      }
      return false;
    },

    hasUpRightConflictAt: function(upRightIndex){
      // todo
    }
  });

  this.ChessboardModel = ChessboardModel;

}());
