class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        this.drawRectangle(({x: 100, y: 100}), ({x: 300, y: 200}), /*red*/[255, 0, 0, 255], ctx, false);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.drawCircle(({x: 200, y: 300}), 40, /*blue*/[0, 0, 255, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        this.drawBezierCurve(({x: 100, y: 100}), ({x: 120, y: 300}), ({x: 450, y: 200}), ({x: 500, y: 100}), /*green*/[0, 255, 0, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        // T
        this.drawRectangle(({x: 100, y: 300}), ({x: 200, y: 280}), /*pink*/[255, 117, 234, 255], ctx, false);
        this.drawRectangle(({x: 140, y: 280}), ({x: 160, y: 180}), /*pink*/[255, 117, 234, 255], ctx, false);
        // A
        this.drawCircle(({x: 250, y: 215}), 40, /*cyan*/[54, 242, 255, 255], ctx);
        this.drawBezierCurve(({x: 220, y: 270}), ({x: 220, y: 320}), ({x: 330, y: 320}), ({x: 285, y: 180}), /*green*/[51, 255, 99, 255], ctx);
        // N
        this.drawLine(({x: 320, y: 300}), ({x: 320, y: 180}), /*cyan*/[54, 242, 255, 255], ctx);
        this.drawBezierCurve(({x: 320, y: 280}), ({x: 330, y: 300}), ({x: 400, y: 310}), ({x: 380, y: 180}), /*green*/[51, 255, 99, 255], ctx);
        // Y
        this.drawRectangle(({x: 400, y: 180}), ({x: 480, y: 200}), /*pink*/[255, 117, 234, 255], ctx, false);
        this.drawRectangle(({x: 460, y: 200}), ({x: 480, y: 300}), /*pink*/[255, 117, 234, 255], ctx, false);
        this.drawRectangle(({x: 400, y: 230}), ({x: 460, y: 250}), /*pink*/[255, 117, 234, 255], ctx, false);
        this.drawRectangle(({x: 400, y: 250}), ({x: 420, y: 300}), /*pink*/[255, 117, 234, 255], ctx, false);
        // A
        this.drawCircle(({x: 540, y: 215}), 40, /*cyan*/[54, 242, 255, 255], ctx);
        this.drawBezierCurve(({x: 500, y: 270}), ({x: 500, y: 320}), ({x: 600, y: 320}), ({x: 580, y: 180}), /*green*/[51, 255, 99, 255], ctx);
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    // point:        bool
    drawRectangle(left_bottom, right_top, color, ctx, point) {
        let left_top = ({x: left_bottom.x, y: right_top.y});        // determine the other two points of the rectangle
        let right_bottom = ({x: right_top.x, y: left_bottom.y});

        this.drawLine(left_bottom, right_bottom, color, ctx);       // draw each line of the rectangle using provided drawLine function
        this.drawLine(right_bottom, right_top, color, ctx);
        this.drawLine(left_top, right_top, color, ctx);
        this.drawLine(left_bottom, left_top, color, ctx);
        
        if(this.show_points == true && point == false) {      // gotta draw all the points if the user wants them
            this.drawPointCircle(left_bottom.x, left_bottom.y, /*black*/[0, 0, 0, 255], ctx);
            this.drawPointCircle(left_top.x, left_top.y, /*black*/[0, 0, 0, 255], ctx);
            this.drawPointCircle(right_bottom.x, right_bottom.y, /*black*/[0, 0, 0, 255], ctx);
            this.drawPointCircle(right_top.x, right_top.y, /*black*/[0, 0, 0, 255], ctx);
        }
    }

    drawPointRec(x, y, color, ctx) {
        if(x == 0 && y == 0) {
            this.drawRectangle(({x: 0, y: 0}), ({x: 1, y: 1}), color, ctx, true);
        } else if (x == 0 && y != 0) {
            this.drawRectangle(({x: 0, y: y-1}), ({x: 1, y: y+1}), color, ctx, true);
        } else if (x != 0 && y == 0) {
            this.drawRectangle(({x: x-1, y: 0}), ({x: x+1, y: 1}), color, ctx, true);
        } else {
            this.drawRectangle(({x: x-1, y: y-1}), ({x: x+1, y: y+1}), color, ctx, true);
        }
    }

    drawPointCircle(x, y, color, ctx) {
        this.drawCircle(({x: x, y: y}), 1, color, ctx);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {                // BROKEY
        let phi_inc = (360 / this.num_curve_sections) * (3.14/180);
        console.log(phi_inc);
        let x0, y0, x1, y1, phi = 0;
        while (phi <= 6.3) {
            if(phi == 0) {
                x0 = center.x + (radius * Math.cos(phi));
                y0 = center.y + (radius * Math.sin(phi));
                phi += phi_inc;
                x1 = center.x + (radius * Math.cos(phi));
                y1 = center.y + (radius * Math.sin(phi));

                this.drawLine(({x: x0, y: y0}), ({x: x1, y: y1}), color, ctx);

                if(this.show_points == true) {      // gotta draw all the points if the user wants them
                    this.drawPointRec(x0, y0, /*black*/[0, 0, 0, 255], ctx);
                    this.drawPointRec(x1, y1, /*black*/[0, 0, 0, 255], ctx);
                }

                x0 = x1;
                y0 = y1;
                phi += phi_inc;
            } else {
                x1 = center.x + radius * Math.cos(phi);
                y1 = center.y + radius * Math.sin(phi);

                this.drawLine(({x: x0, y: y0}), ({x: x1, y: y1}), color, ctx);

                if(this.show_points == true) {      // gotta draw all the points if the user wants them
                    this.drawPointRec(x1, y1, /*black*/[0, 0, 0, 255], ctx);
                }

                x0 = x1;
                y0 = y1;
                phi += phi_inc;
            }
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let x1, y1 = 0;                         // define necessary variables
        let inc = 1 / this.num_curve_sections;  // inc the 'single slice' to t's 'whole pie' (from 0.0 to 1.0, of course)
        
        // determine x0 and y0 first since I need two points to draw a line between
        let x0 = ((Math.pow((1 - 0), 0)) * pt0.x) + (3 * (Math.pow((1 - 0), 2) * 0 * pt1.x)) + (3 * (1 - 0) * Math.pow(0, 2) * pt2.x) + (Math.pow(0, 3) * pt3.x);
        let y0 = ((Math.pow((1 - 0), 0)) * pt0.y) + (3 * (Math.pow((1 - 0), 2) * 0 * pt1.y)) + (3 * (1 - 0) * Math.pow(0, 2) * pt2.y) + (Math.pow(0, 3) * pt3.y);
        // set i to inc because we just spent our i = 0 on the above (hence why it's 0 instead of i there and also why i isn't defined until here).
        let i = inc;
        if(this.show_points == true) {      // gotta draw the control points if the user wants them
            this.drawPointRec(pt1.x, pt1.y, /*red*/[255, 0, 0, 255], ctx);
            this.drawPointRec(pt2.x, pt2.y, /*red*/[255, 0, 0, 255], ctx);
        }

        while (i <= 1.01) {
            // determine x1 and y1 using i
            x1 = ((Math.pow((1 - i), 3)) * pt0.x) + (3 * (Math.pow((1 - i), 2) * i * pt1.x)) + (3 * (1 - i) * Math.pow(i, 2) * pt2.x) + (Math.pow(i, 3) * pt3.x);
            y1 = ((Math.pow((1 - i), 3)) * pt0.y) + (3 * (Math.pow((1 - i), 2) * i * pt1.y)) + (3 * (1 - i) * Math.pow(i, 2) * pt2.y) + (Math.pow(i, 3) * pt3.y);
            // then draw the line using x0 and y0 as first point
            this.drawLine(({x: x0, y: y0}), ({x: x1, y: y1}), color, ctx);

            if(this.show_points == true) {      // gotta draw all the points if the user wants them
                this.drawPointRec(x0, y0, /*black*/[0, 0, 0, 255], ctx);
                this.drawPointRec(x1, y1, /*black*/[0, 0, 0, 255], ctx);
            }

            //the changing of the guard (and incrementing of i)
            x0 = x1;
            y0 = y1;
            i += inc;
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
