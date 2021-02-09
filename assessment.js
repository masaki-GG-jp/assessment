    'use strict';
    const userNameInput = document.getElementById("user-name");//hymlの12行目を動かす
    const assessmentButton = document.getElementById("assessment");//htmlの診断するボタンをいじる場所
    const resultDivided = document.getElementById("result-are");//
    const tweetDivided = document.getElementById("tweet-are");//

    /**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
    function removeAllChildren(element){
        while(element.firstChild) { //esult-areに、なにかダグがあるかぎりループ
            element.removeChild(element.firstChild);
        }
    }


    assessmentButton.onclick = function (){
        let userName = userNameInput.value;
        if (userName.length === 0) {
            //名前の入力がなかったら処理を中断
            return;
        }

        //すでにある診断結果を削除
        removeAllChildren(resultDivided);

        //result-areにh3タグで診断結果という文字を表示
        const h3 = document.createElement('h3');//h3タグを作る
        h3.innerText = '診断結果';//h3タグに'診断結果の'文字列を設定
        resultDivided.appendChild(h3);//result-areにh3変数を設定

        //診断処理を実行
        const result = assessment(userName);

        //result-areにpタグで診断結果を表示
        const p = document.createElement('p');
        p.innerText = result;
        resultDivided.appendChild(p);
    }

    //Twitterのボタン作成
    //aタグを作って属性を設定する
    removeAllChildren(tweetDivided);
    const a = document.createElement('a');
    const href = 'https://twitter.com/intent/tweet?button_hashtag='
                  +encodeURIComponent('あなたのいいところ')
                  +'&ref_src=twsrc%5Etfw';
    a.setAttribute('href',href);
    a.setAttribute('class','twitter-hashtag-button');
    a.setAttribute('data-text','result');
    a.innerText = 'Tweet #あなたのいいところ';
    
    //aタグをHTMLとして追加する
    tweetDivided.appendChild(a);

    //scriptタグを作る
    const script = document. createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');

    //
    tweetDivided.appendChild(script);

    const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];



/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

 function assessment(userName){
     //すべての文字を足算する
     var userNameNumeber = 0;

     for (let i = 0; i < userName.length; i++) {
         //userName(文字列を)数値(漢字だと5桁)に変換
         userNameNumeber += userName.charCodeAt(i);
     }

    //5桁の数値を回答結果の範囲(0~15)
    var answerNumeber = userNameNumeber % answers.length;

    //診断結果
    var result = answers[answerNumeber];
     return result.replace(/\{userName\}/g, userName); //置換
    }


    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );

    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
      );
      

 console.log(assessment('太郎'));
 console.log(assessment('次郎'));