"use strict";
function pong() {
    let canGoDown = true, canMoveRight = true, p1Won = false, p2Won = false, winNumber = 11;
    const svg = document.getElementById("canvas");
    const pongh1 = document.getElementById("title");
    pongh1.innerHTML = "Click & Drag the left paddle to move it. Score 11 points to win!";
    const p1 = document.getElementById("p1");
    p1.innerHTML = "0";
    const p2 = document.getElementById("p2");
    p2.innerHTML = "0";
    let pongBall = new Elem(svg, 'ellipse')
        .attr('cx', 250).attr('cy', 250)
        .attr('rx', 10).attr('ry', 10)
        .attr('fill', '#fffccc');
    let p1Paddle = new Elem(svg, 'rect')
        .attr('x', 30).attr('y', 250)
        .attr('width', 10).attr('height', 70)
        .attr('fill', '#FFFFFF');
    let p2Paddle = new Elem(svg, 'rect')
        .attr('x', 560).attr('y', 250)
        .attr('width', 10).attr('height', 70)
        .attr('fill', '#FFFFFF');
    let divider = new Elem(svg, 'rect')
        .attr('x', 300).attr('y', 0)
        .attr('width', 2).attr('height', 600)
        .attr('fill', '#cccccc');
    Observable.interval(1)
        .takeUntil(Observable.interval(1000000))
        .subscribe((function () {
        if (p1Won) {
            pongh1.innerHTML = "You win! Refresh page to play again.";
        }
        if (p2Won) {
            pongh1.innerHTML = "The computer wins! Refresh the page to play again.";
        }
        if (!p2Won && !p1Won) {
            if (Number(pongBall.attr('cx')) > 600) {
                pongh1.innerHTML = "You scored a point!";
                canMoveRight = false;
                let p1Score = Number(p1.innerHTML);
                p1Score++;
                if (p1Score >= winNumber) {
                    p1Won = true;
                }
                p1.innerHTML = String(p1Score);
                return (pongBall.attr('cx', 250), pongBall.attr('cy', 250));
            }
            else if (Number(pongBall.attr('cx')) < 0) {
                pongh1.innerHTML = "The computer scored a point!";
                canMoveRight = true;
                let p2Score = Number(p2.innerHTML);
                p2Score++;
                if (p2Score >= winNumber) {
                    p2Won = true;
                }
                p2.innerHTML = String(p2Score);
                return (pongBall.attr('cx', 250), pongBall.attr('cy', 250));
            }
            if (((Number(pongBall.attr('cy')) >= Number(p1Paddle.attr('y')) && Number(pongBall.attr('cy')) <= Number(p1Paddle.attr('y')) + 70) &&
                (Number(pongBall.attr('cx')) >= Number(p1Paddle.attr('x')) && Number(pongBall.attr('cx')) <= Number(p1Paddle.attr('x')) + 10))) {
                canMoveRight = true;
            }
            if ((Number(pongBall.attr('cx')) <= Number(p2Paddle.attr('x')) && Number(pongBall.attr('cx')) >= Number(p2Paddle.attr('x')) - 10)
                && ((Number(pongBall.attr('cy')) >= Number(p2Paddle.attr('y')) && Number(pongBall.attr('cy')) <= Number(p2Paddle.attr('y')) + 70))) {
                canMoveRight = false;
            }
            return canMoveRight ? (pongBall.attr('cx', Number(pongBall.attr('cx')) + 1)) : (pongBall.attr('cx', Number(pongBall.attr('cx')) - 1));
        }
    }));
    Observable.interval(1)
        .takeUntil(Observable.interval(1000000))
        .subscribe((function () {
        if (!p2Won && !p1Won) {
            if (Number(pongBall.attr('cy')) > 530) {
                p2Paddle.attr('y', 525);
            }
            else if (Number(pongBall.attr('cy')) < 1) {
                p2Paddle.attr('y', 1);
            }
            else {
                Number(p2Paddle.attr('y')) < Number(pongBall.attr('cy')) ? p2Paddle.attr('y', Number(p2Paddle.attr('y')) + 1) : p2Paddle.attr('y', Number(p2Paddle.attr('y')) - 1);
            }
            if (Number(pongBall.attr('cy')) > 600) {
                canGoDown = false;
            }
            if (Number(pongBall.attr('cy')) < 0) {
                canGoDown = true;
            }
            if (((Number(pongBall.attr('cy')) >= Number(p1Paddle.attr('y')) && Number(pongBall.attr('cy')) <= Number(p1Paddle.attr('y')) + 70))
                && (Number(pongBall.attr('cx')) >= Number(p1Paddle.attr('x')) && Number(pongBall.attr('cx')) <= Number(p1Paddle.attr('x')) + 10)) {
                canGoDown = true;
                if (((Number(pongBall.attr('cy')) >= Number(p1Paddle.attr('y')) && Number(pongBall.attr('cy')) <= Number(p1Paddle.attr('y')) + 30))) {
                    canGoDown = false;
                }
            }
            return canGoDown ? (pongBall.attr('cy', Number(pongBall.attr('cy')) + 1)) : (pongBall.attr('cy', Number(pongBall.attr('cy')) - 1));
        }
    }));
    const mousemove = Observable.fromEvent(svg, 'mousemove'), mouseup = Observable.fromEvent(svg, 'mouseup');
    p1Paddle.observe('mousedown')
        .map(({ clientY }) => ({ yOffset: Number(p1Paddle.attr('y')) - clientY }))
        .flatMap(({ yOffset }) => mousemove
        .takeUntil(mouseup)
        .map(({ clientY }) => ({ y: (clientY + yOffset > 525) ? 525 : (clientY + yOffset < 5) ? 5 : clientY + yOffset })))
        .subscribe(({ y }) => p1Paddle.attr('y', y));
}
let pressed = false;
if (typeof window != 'undefined')
    window.onload = () => {
        window.onkeydown = function (event) {
            if (event.keyCode === 32) {
                if (!pressed) {
                    pressed = true;
                    event.preventDefault();
                    pong();
                }
            }
        };
    };
//# sourceMappingURL=pong.js.map