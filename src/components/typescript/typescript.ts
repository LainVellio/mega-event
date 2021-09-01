const TypeScript = () => {};
const str: string = 'Hello';
const isFetching: boolean = true;

const numberArray: number[] = [1, 1, 2, 3, 5, 8, 13];
const numberArray2: Array<number> = [1, 1, 2, 3, 5, 8, 13]; // Дженерик

const contact: [string, number] = ['Дмитрий', 12345]; // Tuple

// Void
function sayMyName(name: string): void {
  console.log(name);
}
sayMyName('Дмитрий');

// Never
function throwError(message: string): never {
  throw new Error(message);
}
function infinity(): never {
  while (true) {}
}

// Type
type Login = string;
const login: Login = 'admin';

type ID = string | number;

type SomeType = string | null | undefined;

// Interface
interface Rect {
  readonly id: string;
  color?: string;
  size: {
    width: number;
    height: number;
  };
}
const rect1: Rect = {
  id: '1234',
  size: {
    width: 20,
    height: 30,
  },
  color: '#ccc',
};
const rect2: Rect = {
  id: '12345',
  size: {
    width: 10,
    height: 5,
  },
};
rect2.color = 'black';
const rect3 = {} as Rect;

// ===========================
interface RectWithArea extends Rect {
  getArea: () => number;
}
const rect5: RectWithArea = {
  id: '123',
  size: {
    width: 3,
    height: 10,
  },
  getArea(): number {
    return this.size.width * this.size.height;
  },
};

// ============================
interface IClock {
  time: Date;
  setTime(date: Date): void;
}

class Clock implements IClock {
  time: Date = new Date();
  setTime(date: Date): void {
    this.time = date;
  }
}
// ===========================
interface Styles {
  [key: string]: string;
}

const css: Styles = {
  border: '1px solid black',
  marginTop: '2px',
  borderRadius: '5px',
};
// Enum
enum Membership {
  Simple,
  Standard,
  Premium,
}
const membership = Membership.Standard; // 1
const membershipReverse = Membership[2]; // Premium

enum SocialMedia {
  VK = 'VK',
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
}
const social = SocialMedia.INSTAGRAM; //  INSTAGRAM

// Function

function add(a: number, b: number): number {
  return a + b;
}

interface MyPosition {
  x: number | undefined;
  y: number | undefined;
}

interface MyPositionWithDefault extends MyPosition {
  default: string;
}

function position(): MyPosition;
function position(a: number): MyPosition;
function position(a: number, b: number): MyPosition;
function position(a?: number, b?: number) {
  if (!a && !b) {
    return { x: undefined, y: undefined };
  }
  if (a && !b) {
    return {
      x: a,
      y: undefined,
      default: a.toString(),
    };
  }
  return { x: a, y: b };
}
console.log('Empty: ', position());
console.log('One param: ', position(42));
console.log('Two param: ', position(10, 15));

// Classes
class TypeScript2 {
  version: string;
  constructor(version: string) {
    this.version = version;
  }
  info(name: string) {
    return `[${name}]: TypesScript`;
  }
}

class Car {
  readonly model: string;
  readonly numberOfWheels: number = 4;

  constructor(theModel: string) {
    this.model = theModel;
  }
}

class Car2 {
  readonly numberOfWheels: number = 4;

  constructor(readonly model: string) {}
}

// ================================
class Animal {
  protected voice: string = '';
  public color: string = 'black';

  constructor() {
    this.go();
  }
  private go() {
    console.log('Go');
  }
}

class Cat extends Animal {
  public setVoice(voice: string): void {
    this.voice = voice; // не вызовет ошибку, потому что это protected свойство
    // this.go() выдаст ошибку, потому что это private свойство
  }
}

const cat = new Cat();
// cat.voice выдаст ошибку потому что это protected свойство
cat.setVoice('test');
console.log(cat.color);

//=====================================

abstract class Component {
  // нужны для того, чтобы от них наследоваться, но они ни во что не компилируются
  abstract render1(): void;
  abstract info(): string;
}
class AppComponent extends Component {
  render1(): void {
    console.log('Component on render');
  }
  info(): string {
    return 'This is info';
  }
}

// Guards
function strip(x: string | number) {
  if (typeof x === 'number') {
    return x.toFixed(2);
  }
  return x.trim();
}

class MyResponse {
  header = 'response header';
  result = 'response result';
}
class MyError {
  header = 'error header';
  message = 'error message';
}
function handle(res: MyResponse | MyError) {
  if (res instanceof MyResponse) {
    return { info: res.header + res.result };
  } else {
    return { info: res.header + res.message };
  }
}

// ============================================
type AlertType = 'success' | 'danger' | 'warning';
function setAlertType(type: AlertType) {}
setAlertType('success');
setAlertType('danger');
setAlertType('warning');

// Generic

const arrayOfNumbers: Array<number> = [1, 1, 2, 3, 5, 8, 13];
const arrayOfStrings: Array<string> = ['Hello', 'World'];

function reverse<T>(array: T[]): T[] {
  return array.reverse();
}

reverse(arrayOfNumbers);
reverse(arrayOfStrings); // всё работает корректно

// Operators

interface Person {
  name: string;
  age: number;
}
type PersonKeys = keyof Person; // 'name' | 'age'
let name: PersonKeys = 'name';
name = 'age';
// name = 'job' выдаст ошибку

type User = {
  _id: number;
  name: string;
  email: string;
  createAt: Date;
};
type UserKeysNoMeta1 = Exclude<keyof User, '_id' | 'createAt'>; // останутся только 'name' | 'email'
type UserKeysNoMeta2 = Pick<User, 'name' | 'email'>; // будут взяты только 'name' | 'email'
let u1: UserKeysNoMeta1 = 'name'; // u1 = '_id' выдаст ошибку, потому что мы можем задавать только 'name' | 'email'

export default TypeScript;
