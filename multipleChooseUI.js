//各種枚数を初期化
//複数枚メニューの要素個数を初期化
var chooseImagePcs 		  = 0;

//削除対象URLの枚数を初期化
var deleteImagePcs 		  = 0;

//アルバム追加対象URLの枚数を初期化
var albumImagePcs 		  = 0;

//各種配列を初期化
//削除対象URL
var deleteImageToggleMenu = new Array();

//アルバム追加対象URL
var albumImageToggleMenu  = new Array();

//シェアボックス格納対象URL
var shareBoxURLs		  = new Array();


function multipleConsoleHandler(forceControl) {

//複数枚メニューの表示/非表示コントローラー。-1枚以下になった場合は0にする

	if(chooseImagePcs < 0){
		chooseImagePcs = 0;
	}else if(chooseImagePcs > 0){
		$(".multipleConsole").fadeIn();
	}else{
		$(".multipleConsole").fadeOut();
	}

	if(forceControl == "disable"){
		$(".multipleConsole").fadeOut();
		chooseImagePcs = 0;
	}
	console.log("複数枚メニューの要素の個数 : " + chooseImagePcs);
}


//削除処理

function deleteurl() {

	$(function(){

		//削除の確認 cancelがクリックされたらfalseを返す
		if(!confirm("これらの画像ファイルを削除します。よろしいですか？\n削除後の復元はできません。")){
			return false;
		}

		//選択されているURLを取得
		$(".toggle").each(function(i, elem) {
			if($(this).attr("tglswitch") == "true"){

				//[削除される]=[要素が1個減る]わけなので，最初に選んでいた複数枚メニューの要素個数から1枚除く
					chooseImagePcs --;

				// 削除対象URLの個数調査
				deleteImagePcs ++;

				//削除対象URLを配列に流し込む
				deleteImageToggleMenu.push($(this).attr("url-value"));

				 //後の配列処理に響くのでurl-valueとtglswitch属性を削除
				$(this).removeAttr("url-value");
				$(this).removeAttr("tglswitch");

				//fadeoutで要素を画面から消す
				$(this).fadeOut();
			}
		});

		console.log("------削除処理開始------");
		console.log(deleteImagePcs);
		console.log(deleteImageToggleMenu);

		if(deleteImagePcs < 1){
			alert("画像が選択されていません。");
		}

		/////////////////ここに削除処理を記述//////////////////////

		console.log("------削除処理終了------");

		//削除処理が完了 -> 各種データの初期化を行う

		//複数枚メニューをリフレッシュ
		multipleConsoleHandler("disable");

		deleteImagePcs = 0; 		// 削除対象URLの枚数を初期化
		deleteImageToggleMenu.length = 0; // 削除対象URLの配列の中身を初期化
		deleteImageToggleMenu = [];

		console.log(deleteImagePcs);
		console.log(deleteImageToggleMenu);
	});
}



//シェアボックスの処理
function sharebox() {

	$(function(){

		//選択されているURLを取得
		$(".toggle").each(function(i, elem) {
			if($(this).attr("tglswitch") == "true"){

				//シェアボックスに格納するURLを配列に流し込む
				shareBoxURLs.push($(this).attr("url-value"));

				//後の配列処理に響くのでurl-valueとtglswitch属性を削除
				//$(this).removeAttr("url-value");
				//$(this).removeAttr("tglswitch");

				//fadeoutで要素を画面から消す
				//$(this).fadeOut();
			}
		});

		console.log("------シェアボックスが呼び出されました------");

		if(shareBoxURLs < 1){
			alert("画像が選択されていません。");
		}else{
			alert("シェアボックスが呼び出されました。選択されていた画像は以下の通りです:\n\n" + shareBoxURLs);
		}

		shareBoxURLs.length = 0; // シェアボックス格納対象URLの配列の中身を初期化
		shareBoxURLs = [];

	});
}


//アルバム追加処理

function addalbum() {

	$(function(){

		//選択されているURLを取得 1回目
		$(".toggle").each(function(i, elem) {
			if($(this).attr("tglswitch") == "true"){
				albumImagePcs ++;
			}
		});

		if(albumImagePcs < 2 || chooseImagePcs < 2){
			alert("2枚以上画像を選択して下さい。");
			albumImagePcs = 0; 		// アルバム追加対象URLの枚数を初期化

		}else{


			console.log("------アルバム追加処理開始------");
			console.log(albumImagePcs);
			console.log(albumImageToggleMenu);

			//選択されているURLを取得 2回目

			$(".toggle").each(function(i, elem) {
				if($(this).attr("tglswitch") == "true"){

					//[アルバムに追加される]=[要素が1個減る]わけなので，最初に選んでいた複数枚メニューの要素個数から1枚除く
   					chooseImagePcs --;

					//アルバム追加対象URLを配列に流し込む
					albumImageToggleMenu.push($(this).attr("url-value"));

					//後の配列処理に響くのでurl-valueとtglswitch属性を削除
					$(this).removeAttr("url-value");
					$(this).removeAttr("tglswitch");

					//fadeoutで要素を画面から消す
					$(this).fadeOut();
				}
			});

			/////////////////ここにアルバム追加処理を記述//////////////////////
			alert("アルバムに追加されました。");

			console.log(albumImageToggleMenu);
			console.log("------アルバム追加処理終了------");

			//アルバム追加処理が完了 -> 各種データの初期化を行う

			//複数枚メニューをリフレッシュ
			multipleConsoleHandler("disable");

			albumImagePcs = 0; 		// アルバム追加対象URLの枚数を初期化
			albumImageToggleMenu.length = 0; // アルバム追加対象URLの配列の中身を初期化
			albumImageToggleMenu = [];
		}

		console.log(albumImagePcs);
		console.log(albumImageToggleMenu);

	});
}



function chooseall() {

	//複数枚メニューの要素の個数 -> 計算が合わなくなるので一度リセット。
	//chooseImagePcs = 0;
	$(function(){
		$(".toggle").each(function(i, elem) {
			if($(this).attr("tglswitch") == "false"){
				$(this).css('background-color', '#FF00FF');
   				$(this).attr("tglswitch","true");
   				$(this).children(".checkbox").show();
   				chooseImagePcs ++;
			}

		});
	});

		//複数枚メニューをリフレッシュ
	multipleConsoleHandler();
}

function disableall() {

	$(function(){
		$(".toggle").each(function(i, elem) {
			if($(this).attr("tglswitch") == "true"){
   				$(this).css('background-color', 'cyan');
   				$(this).attr("tglswitch","false");
   				$(this).children(".checkbox").hide();
			}

		});
	});

		//複数枚メニューをリフレッシュ
	multipleConsoleHandler("disable");
}


//トグルスイッチの挙動
$(function(){
$(".checkbox").hide();
$(".multipleConsole").hide();
		$(document).on("click", ".toggle", function () {

			var uval 		= $(this).attr("url-value");
			var tglswitch 	= $(this).attr("tglswitch");
			if(tglswitch == "false"){ // OFFのとき -> ONにする

				//複数枚メニューの要素個数に1枚加える
				chooseImagePcs ++;
				$(this).css('background-color', '#FF00FF');
				$(this).attr("tglswitch","true");
				$(this).children(".checkbox").show();
				//console.log(imageToggleMenu);
			}else{					// ONのとき -> OFFにする

				//複数枚メニューの要素個数から1枚除く
				chooseImagePcs --;
				$(this).css('background-color', 'cyan');
				$(this).attr("tglswitch","false");
				$(this).children(".checkbox").hide();
				console.log(uval + " -> OFF");
			}

			//複数枚メニューをリフレッシュ
			multipleConsoleHandler();
	});
});