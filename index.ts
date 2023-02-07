// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

function test(a: number, b: number): number {
  return a + b;
}

test(3, 4);

let foo: {
  bar: number;
};

foo = {
  //foo: 4,
  bar: NaN,
};

let a: (number | null)[] = [1, 2, null, 3];

function check(x: number = 1, a: any, b?: number): boolean[] | never {
  if (typeof a === 'number' || x > 5) {
    return [true];
  }
  throw new Error('xxx');
}

try {
  check(undefined, '4', 1);
} catch (e) {
  console.error(e);
}

class Bar {
  n: number;
  constructor(h: number, public readonly x: string) {
    this.n = h;
    //this.x = x;
  }
  hello(): void {
    console.log(`hello ${this.n}`);
  }
  get name(): string {
    return 'jmeno';
  }
}

function Foo(this: any, h: number) {
  this.n = h;
  this.hello = (): void => console.log(`hello ${this.n}`);
}

const fb = new (Foo as any)(2);
fb.hello();

console.log(Bar.prototype.hello);

const b = new Bar(1, '5');
//console.log(b.x)

function toJSON(obj: object) {
  const props = Object.entries(Object.getOwnPropertyDescriptors(obj));
  const methods = Object.entries(
    Object.getOwnPropertyDescriptors(Object.getPrototypeOf(obj))
  );

  return {
    ...props.reduce(
      (o, [k, v]) => ({
        ...o,
        ...(v.hasOwnProperty('value') && { [k]: v.value }),
      }),
      {}
    ),
    ...methods.reduce(
      (o, [k, v]) => ({
        ...o,
        ...(!!v.get && { [k]: v.get() }),
      }),
      {}
    ),
  };
}

console.log(toJSON(b));
// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

export type TLayerStyle = {
  opacity: number;
  point_cloud_square?: boolean;
  point_size?: number;
  point_size_min?: number;
  point_size_max?: number;
  radius?: number;
  filled?: boolean;
  fill_color?: string;
  line_width?: number;
  stroked?: boolean;
  line_color?: string;
};

class LayerStyle {
  [x: string]: any;
  private style = {
    opacity: 1,
    radius: 1,
    point_cloud_square: false,
    point_size: 1,
    point_size_min: 0.1,
    point_size_max: 10,
    filled: false,
    fill_color: '#000000ff',
    line_width: 100,
    stroked: false,
    line_color: '#000000ff',
  };

  constructor(style: TLayerStyle) {
    for (let k in this.style) {
      const desc = Object.getOwnPropertyDescriptor(LayerStyle.prototype, k);
      const getter = desc?.get?.bind(this);
      const setter = desc?.set?.bind(this);
      Object.defineProperty(this, k, {
        get:
          getter ??
          (() => {
            return this.style[k as keyof TLayerStyle];
          }),
        set:
          setter ??
          (<K extends keyof TLayerStyle>(value: any) => {
            this.style[k as K] = value;
          }),
      });
    }
    Object.keys(style).forEach((k) => {
      this[k] = style[k as keyof TLayerStyle];
    });
  }

  set line_width(v: number) {
    this.style.line_width = v * 2;
  }
  set radius(v: number) {
    this.style.radius = v - 1;
  }
  toJSON(fn: Function) {
    return fn(this.style);
  }
}
const ls = new LayerStyle({ opacity: 1, radius: 5 });
ls.line_width = 9;
console.log(ls.line_width);
ls.point_size = 11;
console.log(ls.point_size);
ls.mukl = 1
console.log(ls.toJSON(toJSON));