
window.onload = function()
{
    function onDragStart(event) {

        // var x = event.pageX;
        // var y = event.pageY;
        // var loc = getLocation(x,y);
        // // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.dragging = true;
    }

    function onDragEnd() {
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    function onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
            lines.x = newPosition.x;
            lines.y = newPosition.y;
        }
    }

    var canvas = document.getElementById('canvas');
    this.console.log(canvas)
    canvas.addEventListener('mousedown', onDragStart, false);
    canvas.addEventListener('mouseup', onDragEnd, false);
    canvas.addEventListener('mousemove', onDragMove, false);
    canvas.addEventListener('mouseout', onDragEnd,false);


}
