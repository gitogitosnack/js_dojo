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
// 2-5-1. setTimeoutタイマー関数を使用するときにも関数を変数に代入している。
    const sayHello_5 = function(){
        console.log("Hello!5 " + "もう、3秒経ったよ。えっ！Σ（・□・；）");
    }
    console.log("timer start!");
    setTimeout(sayHello_5, 3000);
    console.log("setTimeoutを待たずに後続処理を実行！");

// 2-5-2. イベント関数を使用するときにも関数を変数に代入している。
    // コールバック関数を定義
    const handleClick = () => {
        // ボタンがクリックされたときに実行される処理
        console.log("ボタンがクリックされました！コールバックが実行されました。");
    };
    // HTML要素の取得をシミュレーション
    const button = { 
        id: "myButton", 
        addEventListener: (event, callback) => {
            console.log(`イベントリスナーを登録: ${event}が発生したら、指定された関数を実行します。`);
            // 実際にはユーザーの操作を待つ
            // ... (クリックが発生) ...
            // callback(); // <-- イベント発生時に、代入された関数を実行
        }
    };
    // addEventListenerに関数（handleClick）を代入（渡す）
    button.addEventListener('click', handleClick);
    // (コンソール出力例)
    // イベントリスナーを登録: clickが発生したら、指定された関数を実行します。

// 2-5-3. データ取得処理を行うときにも関数を変数に代入している。
    // インターネットからデータを取得する処理は時間がかかるため非同期で行われます。
    const apiUrl = 'https://api.example.com/data'; 
    // データ取得に成功した後の処理を定義（コールバック）
    // arrow function=>
    const processData = (data) => {
        console.log("データの取得に成功しました。");
        console.log("受け取ったデータ:", data);
    };
    // データの取得開始
    // fetchはPromiseを返し、.then()に成功時のコールバック関数を渡す
    fetch(apiUrl)
        .then(response => response.json()) // arrow function=>
        .then(processData) // <-- データのJSON変換が完了した後、processData関数を代入（渡す）
        .catch(error => console.error("エラーが発生しました:", error));
    console.log("データ取得の指示を出しました。結果を待たずに次の処理を実行します。"); 
    // (コンソール出力例 - 実際の取得は時間がかかる)
    // データ取得の指示を出しました。結果を待たずに次の処理を実行します。
    // (数秒後 - 取得成功時)
    // データの取得に成功しました。
    // 受け取ったデータ: { /* ...取得したデータ... */ }

// 2-6. Map等のリストの加工処理で関数を代入した変数を第一級引数として実行する。
    // 2-6-1. Map
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

    // 2-6-2. filterのような配列メソッドでは、「配列の各要素に対して、どのような判定（ロジック）を行うか」をコールバック関数として渡します。これにより、メソッド自体は汎用的な「フィルタリング」処理に集中でき、ロジックは外部から代入（注入）できます。
    // filterメソッドは、JavaScriptの**配列（Array）**が持つメソッドの一つで、特定の条件を満たす要素だけを抽出して、新しい配列を作成するために使われます。
    // 株価診断アプリで「適正株価より安い銘柄」だけを抽出する処理を考えます。
    // 銘柄データ（配列の中にオブジェクト型の銘柄情報が格納されている。）
    const stockList = [
        { name: "銘柄A", currentPrice: 1200, fairValue: 1000 },
        { name: "銘柄B", currentPrice: 800, fairValue: 1000 },
        { name: "銘柄C", currentPrice: 1500, fairValue: 1400 },
        { name: "銘柄D", currentPrice: 500, fairValue: 600 }
    ];
    // 抽出ロジック（コールバック関数）を定義
    // この関数は配列の各要素に適用され、trueを返すと残る
    const isUndervalued = (stock) => {
        return stock.currentPrice < stock.fairValue;
    };
    // filterメソッドに isUndervalued 関数を代入（渡す）
    const undervaluedStocks = stockList.filter(isUndervalued);
    console.log("割安と診断された銘柄:");
    // .forEach() は、JavaScriptの配列が持つメソッドで、配列内の要素を最初から最後まで一つずつ取り出して、指定された処理を実行します。
    // .forEach()の引数として渡されているのが、アロー関数(stock => { ... })
    undervaluedStocks.forEach(stock => {
        console.log(`- ${stock.name} (現在: ${stock.currentPrice}, 適正: ${stock.fairValue})`);
    }
    );
    // (コンソール出力)
    // 割安と診断された銘柄:
    // - 銘柄B (現在: 800, 適正: 1000)
    // - 銘柄D (現在: 500, 適正: 600)

