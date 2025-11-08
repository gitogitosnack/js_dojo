// Function()
// 1. Normal use.
sayHello_0();
function sayHello_0(){
    console.log("Hello!0");
}

// 2. Substitute a function() for a variable.関数を変数に代入する際は、基本、変数をconstで宣言すべき！
// 2-1.
    function sayHello_1(){
        console.log("Hello!1");
    }
    // f1をconstで宣言している。Good！
    const f1 = sayHello_1;
    f1();

// 2-2. 匿名じゃない関数
    const f2 = function sayHello_2(){
        console.log("Hello!2");
    };
    f2();

// 2-3. 匿名関数anonymous function
    const f3 = function(){
        console.log("Hello!3");
    };
    f3();

// 2-4. 即時関数Immediately Invoked Function Expression (IIFE) 
    // 関数の呼び出しを行わず自己完結する関数。
    (function(name){
        console.log("Hello!4 " + name);
    })("Nino&Haru");

// 2-5. コールバック関数callback function
    const sayHello_5 = function(){
        console.log("Hello!5 " + "もう、3秒経ったよ。えっ！Σ（・□・；）");
    }
    console.log("timer start!");
    setTimeout(sayHello_5, 3000);
    console.log("setTimeoutを待たずに後続処理を実行！");

// 2-6. Map等のリストの加工処理で関数を代入した変数を第一級引数として実行する。
    // 変換したいデータの配列
    const prices = [1, 5, 10, 50, 100, 500, 1000, 2000, 5000, 10000];

    // 配列の各要素に適用したい処理（消費税10%を加算する関数）を定義
    // この関数がコールバック関数として map に代入/渡される
    const addTax = function(price){
        return Math.floor(price*1.10);
    };

    // mapメソッドの実行。addTax関数は、引数として代入される。
    // mapメソッドは、自分自身が持つ配列の全要素を繰り返し処理し、引数として渡されたaddTax関数を各要素に適用します。
    const pricesWithTax = prices.map(addTax);
    console.log("税抜き価格: " + prices);
    console.log("税込み価格: " + pricesWithTax);

// 2-7. 









