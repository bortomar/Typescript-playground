// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript



function test(a:number, b: number): number {
    return a + b;
}

test(3, 4);

let foo: {
    bar: number
};

foo = {
    //foo: 4,
    bar: NaN
};

let a: (number | null)[] = [ 1, 2, null, 3];

function check(x: number = 1, a: any, b?: number): (boolean[] | never) {
    if (typeof a === 'number' || x > 5) {
        return [true];
    }
    throw new Error('xxx');
}

try {
    check(undefined, '4', 1)
} catch (e) {
    console.error(e)
}

class Bar {
    n: number;
    constructor(h: number, public readonly x: string) {
        this.n = h;
        //this.x = x;
    }
    hello(): void {
        console.log(`hello ${this.n}`)

    }
    get name(): string { return 'jmeno' }
}

function Foo(this: any, h: number) {
    this.n = h;
    this.hello  = (): void => console.log(`hello ${this.n}`)
}

const fb = new (Foo as any)(2);
fb.hello()

console.log(Bar.prototype.hello)

const b = new Bar(1, '5');
//console.log(b.x)

function toJSON(obj: object) {
    const props = Object.entries(
        Object.getOwnPropertyDescriptors(obj)
    );
    const methods = Object.entries(
        Object.getOwnPropertyDescriptors(
            Object.getPrototypeOf(obj)
        )
    )

    return {
        ...props.reduce((o, [k, v]) => ({
            ...o, 
            ...(
                v.hasOwnProperty('value') 
                && { [k]: v.value }
            )
        }), {}),
        ...methods.reduce((o, [k, v]) => ({ 
            ...o, 
            ...(
                !!v.get 
                && { [k]: v.get() }
            ) 
        }), {})
    }
    
}

console.log(toJSON(b))
// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.
  