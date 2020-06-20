(function() {
    'use strict';

    const stage = document.getElementById('stage');
    let ctx;
    let count = 0;
    let dim;
    let size;
    let answer = [];
    let isPlaying = true;

    function init() {
      dim = Math.floor(count / 3) + 2;
      size =  Math.floor(stage.width /  dim);
      answer = [
        Math.floor(Math.random() * dim),
        Math.floor(Math.random() * dim)
      ];
    }

    function draw() {
       let x;
       let y;
       let offset = 2;
       let baseColor;
       let answerColor;
       let hue;
       let lightness;

       hue = Math.random() * 360;
       baseColor = 'hsl(' + hue + ', 80%, 50%)';
       lightness = Math.max(75 - count, 53);
       answerColor = 'hsl(' + hue + ', 80%, ' + lightness + '%)';

       ctx.clearRect(0, 0, stage.width, stage.height);
       for (x = 0; x < dim; x++) {
         for (y = 0; y < dim; y++) {
           if (answer[0] === x && answer[1] === y) {
                  ctx.fillStyle = answerColor;
           } else {
            ctx.fillStyle = baseColor;
           }
             ctx.fillRect(
               size * x + offset,
               size * y + offset,
               size - offset * 2,
               size - offset * 2
              );
          }
        }
     }
 
     if (typeof stage.getContext === 'undefined') {
       return;
     }
     ctx = stage.getContext('2d');

      stage.addEventListener('click', function(e) {
          var rect;
          var x;
          var y;
          var replay = document.getElementById('replay');
          if (isPlaying === false) {
            return;
          }
        rect = e.target.getBoundingClientRect();
        x = e.pageX - rect.left -   window.scrollX;
        y = e.pageY - rect.top -   window.scrollY;
        if (
            answer[0] === Math.floor(x / size) &&
            answer[1] === Math.floor(y / size) 
         ) {
          count++;
          init();
          draw();
        } else {
             alert('Your score: ' + count);
             isPlaying = false;
             replay.className = '';
            }
      });

      init();
      draw();
  })();
       






















