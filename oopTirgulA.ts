// class Rectangle {
//     width: number;
//     height: number;

//     constructor(width: number, height: number) {
//         this.width = width;
//         this.height = height;
//     }

//     area(): number {
//         return this.width * this.height;
//     }
// }

// class Square extends Rectangle {
//     constructor(sideLength: number) {
//         super(sideLength, sideLength);
//     }
// }


// class Shape {
//     info(): string {
//         return "This is a Shape";
//     }
// }

// class NewRectangle extends Shape {
//     info(): string {
//         return "This is a Rectangle";
//     }
// }

// class ColoredRectangle extends Rectangle {
//     constructor(width: number, height: number, private color: string) {
//         super(width, height);
//     }

//     info(): string {
//         return `This is a rectangle of color ${this.color}`;
//     }
// }

// // Example usage
// const shape = new Shape();
// console.log(shape.info()); // Outputs: "This is a Shape"

// const rectangle = new Rectangle(10, 20);
// console.log(rectangle.area()); // Outputs: 200

// const square = new Square(6);
// console.log(square.area()); // Outputs: 36

// const coloredRectangle = new ColoredRectangle(15, 25, "blue");
// console.log(coloredRectangle.info()); // Outputs: "This is a rectangle of color blue"
// console.log(coloredRectangle.area()); // Outputs: 375

// console.log(new Rectangle(5, 5).area());
// console.log(new Square(6).area());

// task6
class Shape {
    draw():void{
        console.log("drawing a shape");
    }
}
class Circle extends Shape {
    draw(): void {
        console.log('drawing a circle');
    }
}

class Triangle extends Shape {
    draw(): void {
        console.log('drawing a triangle');
    }
}

class Square extends Shape {
    draw(): void {
        console.log('drawing a square');
    }
}

function renderShapes(shapes: Shape[]): void {
    for (const shape of shapes) {
        shape.draw();
    }
}
const circle = new Circle();
const triangle = new Triangle();
const square = new Square();

const shapes: Shape[] = [circle, triangle, square];

renderShapes(shapes);
