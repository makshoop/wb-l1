class Shape {
    // Конструктор базовой фигуры
    constructor() {
        this.area = 0;
        this.perimeter = 0;
        this.type = 'Shape';
    }

    // Получить площадь фигуры
    calculateArea() {
        console.log(`Площадь ${this.type}: ${Math.round(this.area)}`);
        return Math.round(this.area);
    }

    // Получить периметр фигуры
    calculatePerimeter() {
        console.log(`Периметр ${this.type}: ${Math.round(this.perimeter)}`);
        return Math.round(this.perimeter);
    }
}

// Подкласс прямоугольника, наследующий методы базовой фигуры
class Rectangle extends Shape {
    // Конструктор прямоугольника с заданными шириной и высотой
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.type = 'Rectangle';
        this.calculateArea();
        this.calculatePerimeter();
    }

    // Переопределенный метод для расчета площади прямоугольника
    calculateArea() {
        this.area = this.width * this.height;
        super.calculateArea();
    }

    // Переопределенный метод для расчета периметра прямоугольника
    calculatePerimeter() {
        this.perimeter = 2 * (this.width + this.height);
        super.calculatePerimeter();
    }
}

// Подкласс круга, наследующий методы базовой фигуры
class Circle extends Shape {
    // Конструктор круга с заданным радиусом
    constructor(radius) {
        super();
        this.radius = radius;
        this.type = 'Circle';
        this.calculateArea();
        this.calculatePerimeter();
    }

    // Переопределенный метод для расчета площади круга
    calculateArea() {
        this.area = Math.PI * this.radius * this.radius;
        super.calculateArea();
    }

    // Переопределенный метод для расчета периметра круга
    calculatePerimeter() {
        this.perimeter = 2 * Math.PI * this.radius;
        super.calculatePerimeter();
    }
}

// Подкласс треугольника, наследующий методы базовой фигуры
class Triangle extends Shape {
    // Конструктор треугольника с заданной базой, высотой и сторонами
    constructor(base, height, side1, side2, side3) {
        super();
        this.base = base;
        this.height = height;
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
        this.type = 'Triangle';
        this.calculateArea();
        this.calculatePerimeter();
    }

    // Переопределенный метод для расчета площади треугольника
    calculateArea() {
        this.area = (this.base * this.height) / 2;
        super.calculateArea();
    }

    // Переопределенный метод для расчета периметра треугольника
    calculatePerimeter() {
        this.perimeter = this.side1 + this.side2 + this.side3;
        super.calculatePerimeter();
    }
}

// Создаем экземпляры различных фигур
const rectangle = new Rectangle(1, 3);
const circle = new Circle(7);
const triangle = new Triangle(1, 3, 3, 7, 1);

//Площадь Rectangle: 3
//Периметр Rectangle: 8
//Площадь Circle: 154
//Периметр Circle: 44
//Площадь Triangle: 2
//Периметр Triangle: 11