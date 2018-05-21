class Editor {
    private canvas : HTMLCanvasElement;
    private context : CanvasRenderingContext2D;
    private items : Items;
    private width : number;
    private height : number;
    private status : string;

    public constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.width = window.innerWidth / 2;
        this.height = window.innerHeight;
        this.items = new Items(this.context, this.width, this.height);

        this.initCanvas();
        this.initLine();
    }

    private initCanvas() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    private initLine() {
        this.context.beginPath();
        this.context.moveTo(this.width / 2, 0);
        this.context.lineTo(this.width / 2, this.height);
        this.context.lineWidth = 2;
        this.context.stroke();
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.initLine();
    }

    public years() {
        this.clearCanvas();
        this.items.renderItems('year');
        this.status = 'year';
    }

    public mouths() {
        this.clearCanvas();
        this.items.renderItems('mounth');
        this.status = 'mounth';
    }

    public days() {
        this.clearCanvas();
        this.items.renderItems('day');
        this.status = 'day';
    }

    public getStatus() :string {
        return this.status;
    }
}

class Items {
    private context : CanvasRenderingContext2D;
    private space : number;
    private r : number;
    private width : number;
    private height : number;

    public constructor(contex : CanvasRenderingContext2D, width : number, height : number) {
        this.context = contex;
        this.width = width;
        this.height = height;
        this.space = 2;
        this.r = 10;
    }

    public drawItem(index : number, text : string) {
        let y = (index * (2 * this.r)) * this.space;
        let x = this.width / 2;
        this.context.beginPath();
        this.context.arc(x, y, this.r, 0, 2 * Math.PI);
        this.context.stroke();

        this.drawText(text, x + this.r * 2, y + this.r / 2);
    }

    public drawText(text : string, x : number, y : number) {
        this.context.font = "20px Arial";
        this.context.fillText(text, x, y);
    }

    public renderItems(status : string) {
        let currentYear = new Date().getFullYear() + 1;

        if (status == 'year') {
            for (let i = 1; i <= 10; i++) {
                this.drawItem(i, (currentYear - i).toString());
            }
        } else if(status == 'mounth') {
            for (let i = 1; i <= 12; i++) {
                this.drawItem(i, i.toString());
            }
        } else if (status == 'day') {
            for (let i = 1; i <= 31; i++) {
                this.drawItem(i, i.toString());
            }
        }
    }
}