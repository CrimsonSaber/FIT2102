// FIT2102 2018 Assignment 1
// https://docs.google.com/document/d/1woMAgJVf1oL3M49Q8N3E1ykTuTu5_r28_MQPVS5QIVo/edit?usp=sharing

function pong() {

  let canGoDown = true, canMoveRight = true, p1Won= false, p2Won= false, winNumber = 11;
  /*canGoDown means if the ball can go down. If it reaches the bottom, its set to false. Same logic applies to canMoveRight
  but with right instead of up. p1Won and p2Won indicate whether you or the computer have won respectively. Win number
  indicates the score the players have to reach*/
  const svg = document.getElementById("canvas")!;
  const pongh1 = document.getElementById("title")!;
  pongh1.innerHTML = "Click & Drag the left paddle to move it. Score 11 points to win!";
  const p1 = document.getElementById("p1")!;
  p1.innerHTML = "0"; //svg's player 1 points
  const p2 = document.getElementById("p2")!;
  p2.innerHTML = "0"; //player 2/computers points
  let pongBall = new Elem(svg, 'ellipse') //draw our pong ball. I've used Elem because it is easy to set up paddles,etc with it
    .attr('cx', 250).attr('cy', 250)  //set the x and y position of our ball and place it there
    .attr('rx', 10).attr('ry', 10)  //size of our ball
    .attr('fill', '#fffccc'); //colour of the ball


  let p1Paddle = new Elem(svg, 'rect')  //draw our paddles
  .attr('x', 30).attr('y', 250)
    .attr('width', 10).attr('height', 70)
    .attr('fill', '#FFFFFF');
  
  let p2Paddle = new Elem(svg, 'rect')
  .attr('x', 560).attr('y', 250)
    .attr('width', 10).attr('height', 70)
    .attr('fill', '#FFFFFF');
  
  let divider = new Elem(svg, 'rect') //the line in the middle of our screen
  .attr('x', 300).attr('y', 0)
  .attr('width', 2).attr('height', 600)
    .attr('fill', '#cccccc');



  Observable.interval(1)  //Observable to manipulate the x position of our ball. The interval is 1 because its decent speed and neither slow/too fast
    .takeUntil(Observable.interval(1000000))  //execute this code for a 1000 seconds
    .subscribe(( function(){
      if(p1Won){  //if player1 has won
        pongh1.innerHTML = "You win! Refresh page to play again."
      }
      if(p2Won){  //if the computer won
        pongh1.innerHTML = "The computer wins! Refresh the page to play again."
      }
      if(!p2Won && !p1Won){ //if no one has won yet then move the ball 

        if( Number(pongBall.attr('cx')) > 600  ){
          pongh1.innerHTML = "You scored a point!"  //if the ball is on the right edge p1 scores 
          canMoveRight = false  //prevent the ball from going right ; make it go left instead
          let p1Score = Number(p1.innerHTML);//get player 1 score
          p1Score++;
          if(p1Score>=winNumber){
            p1Won = true  //if score is 11 you win
          }
          p1.innerHTML = String(p1Score);
          return (pongBall.attr('cx', 250),pongBall.attr('cy', 250)); 

          /*place the ball 
          in the middle (or near enough) of the screen so that it appears that the ball has dissapeared when it touches an edge*/  
        }
        else if( Number(pongBall.attr('cx')) < 0){
          pongh1.innerHTML = "The computer scored a point!"
          canMoveRight = true
          let p2Score = Number(p2.innerHTML);
          p2Score++;  //increment player2 score
          if(p2Score>=winNumber){
            p2Won = true
    
          }
          p2.innerHTML = String(p2Score);
          return (pongBall.attr('cx', 250),pongBall.attr('cy', 250)); 

          /*place the ball 
          in the middle (or near enough) of the screen so that it appears that the ball has dissapeared when it touches an edge*/
          
        }
        if((  (Number(pongBall.attr('cy')) >=  Number(p1Paddle.attr('y'))    &&  Number(pongBall.attr('cy')) <= Number(p1Paddle.attr('y')) + 70   ) &&
        (Number(pongBall.attr('cx')) >=  Number(p1Paddle.attr('x'))    &&  Number(pongBall.attr('cx')) <= Number(p1Paddle.attr('x')) + 10   ) )){
          canMoveRight = true /*if the ball has hit players paddle make the ball go right*/
        }
        if((Number(pongBall.attr('cx')) <=  Number(p2Paddle.attr('x'))    &&  Number(pongBall.attr('cx')) >= Number(p2Paddle.attr('x')) - 10)
          &&      ((Number(pongBall.attr('cy')) >=  Number(p2Paddle.attr('y'))    &&  Number(pongBall.attr('cy')) <= Number(p2Paddle.attr('y')) + 70))      ){
          canMoveRight = false  //if the ball has hit the computers paddle AND the top of the top of the paddle make it go up-left

        }
        //make the ball go left or right directions by incrementing/decrementing x depending on canMoveRights value
        return canMoveRight ?(pongBall.attr('cx', Number(pongBall.attr('cx')) +1)) : (pongBall.attr('cx', Number(pongBall.attr('cx')) -1))
      }
    }
  ));
  
  Observable.interval(1)  //y position of ball. The interval is 1 because its decent speed and neither slow/too fast
    .takeUntil(Observable.interval(1000000))
    .subscribe(( function(){
      
      if(!p2Won && !p1Won){//if no one has won yet then move the ball, opponents paddle 
        if(Number(pongBall.attr('cy')) > 530){  /* if the ball is 525 pixels down, set the y postion of the computers paddle
          to 525 otherwise its lower half would go under/outside the svgs boundary*/
          p2Paddle.attr('y', 525);
          
        }
        else if(Number(pongBall.attr('cy')) < 1){
          p2Paddle.attr('y', 1);/* Same logic as above but its to prevent the computers paddle's upper hald from going 
          up/outside the svgs boundary*/
        } 
        else{
          Number(p2Paddle.attr('y'))< Number(pongBall.attr('cy')) ?p2Paddle.attr('y', Number(p2Paddle.attr('y'))+1): p2Paddle.attr('y', Number(p2Paddle.attr('y'))-1)

           //else increment/decrement player2s paddles y position to match balls y position
        }
        if( Number(pongBall.attr('cy')) > 600){
          canGoDown = false //if balls at the bottom, its not allowed to go further down
          }
        if( Number(pongBall.attr('cy')) < 0){
            canGoDown = true  //if the balls at the top, dont let it go further up
        }
        if((  (Number(pongBall.attr('cy')) >=  Number(p1Paddle.attr('y'))    &&  Number(pongBall.attr('cy')) <= Number(p1Paddle.attr('y')) + 70   ) )
        && (Number(pongBall.attr('cx')) >=  Number(p1Paddle.attr('x'))    &&  Number(pongBall.attr('cx')) <= Number(p1Paddle.attr('x')) + 10   )){
          canGoDown = true/*if the ball is touching the players make the ball go down-right*/
    
            if((  (Number(pongBall.attr('cy')) >=  Number(p1Paddle.attr('y'))    &&  Number(pongBall.attr('cy')) <= Number(p1Paddle.attr('y')) + 30 ))  ){
              canGoDown = false  //if the ball is touching the upper half of players paddle make the ball go up-right instead
            }
        }
        //make the ball go up or down directions by incrementing/decrementing y depending on canGoDowns value
        return canGoDown ?(pongBall.attr('cy', Number(pongBall.attr('cy')) +1)) : (pongBall.attr('cy', Number(pongBall.attr('cy')) -1))
      }

    }
  ));

  //code below to move player 1 paddle (left) by mouse click dragging it using observerable
  const 
  mousemove = Observable.fromEvent<MouseEvent>(svg, 'mousemove'),
  mouseup = Observable.fromEvent<MouseEvent>(svg, 'mouseup')
  p1Paddle.observe<MouseEvent>('mousedown')
    .map(({clientY}) => ({yOffset: Number(p1Paddle.attr('y')) - clientY }))
    .flatMap(({yOffset}) =>
      mousemove
        .takeUntil(mouseup)
        .map(({clientY}) => ({y: (clientY + yOffset > 525) ? 525 : (clientY + yOffset < 5)? 5: clientY + yOffset})))
    .subscribe(({y}) =>
    p1Paddle.attr('y', y));
  
  
          
  

  // Inside this function you will use the classes and functions 
  // defined in svgelement.ts and observable.ts
  // to add visuals to the svg element in pong.html, animate them, and make them interactive.
  // Study and complete the tasks in basicexamples.ts first to get ideas.

  // You will be marked on your functional programming style
  // as well as the functionality that you implement.
  // Document your code!  
  // Explain which ideas you have used ideas from the lectures to 
  // create reusable, generic functions.
}

// the following simply runs your pong function on window load.  Make sure to leave it in place.
let pressed = false;  //if the player has pressed space. false initially. true when pressed

if (typeof window != 'undefined')
  window.onload = ()=>{
    window.onkeydown = function(event){ //call pong only ONCE. (only 1 spacebar press otherwise there will be multiple paddles and balls)
      if(event.keyCode === 32) {
          if(!pressed){
            pressed = true
            event.preventDefault();
            pong();
          }
      }
  };
  }