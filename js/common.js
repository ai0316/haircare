(function ($) {
    'use strict';
  
  $(function () {
  
    //  スタートボタンがクリックされたら
    $('.tool-btn').on('click', function () {
      //  クリックした要素のdata属性を取得
      var target = $(this).data('box-link');
      //  上記で取得した要素と同じID名を持つ要素を取得
      var box = $('#' + target);
      //  その要素にclassを付け替える
      $(box).parent().addClass('is-inactive');
      $(box).fadeIn();
      $(this).parent().addClass('is-inactive');
    });
  
    //  「次の質問へ」がクリックされたら
    $('.box .tool-btn').on('click', function () {
      $(this).not($(this).parents('.box').fadeOut(1200));
      $(this).parents('.box').toggleClass('is-inactive');
    });
  
    //  選択肢がクリックされたら
    $('.select').on('click', function () {
      $(this).toggleClass('is-inactive');
      $(this).siblings($('.select')).not($(this)).removeClass('is-inactive');
  
      var select = $(this).parents('.box').find('.select');
      var toolBtn = $(this).parents('.box').find('.tool-btn.next');
  
      //  選択されていないとボタンをクリックできないようにする
      if (select.hasClass('is-inactive')) {
        toolBtn.removeClass('is-inactive');
      } else {
        toolBtn.addClass('is-inactive');
      }
    });
  
    // 診断結果の出し分け
    $('.tool-btn.result').on('click', function () {
  
      // それぞれの選択肢の数を数える
      var yesCnt = $('.select.yes.is-inactive').length;
      var noCnt = $('.select.no.is-inactive').length;
      var vagueCnt = $('.select.vague.is-inactive').length;
  
      // 「はい」が2つ以上の時
      if (yesCnt >= 2) {
        $('#a1').fadeIn();
      }
      // 「はい」が1つ かつ 「いいえ」が1つ または「どちらともいえない」が1つの時
      else if ((yesCnt == 1) && ((noCnt == 1) || (vagueCnt == 1))) {
        if($('#q1 .select.yes').hasClass('is-inactive')) {
          $('#a2').fadeIn();
        } else if($('#q2 .select.yes').hasClass('is-inactive')) {
          $('#a3').fadeIn();
        }
      }
      // 「いいえ」が2つ以上 または 「いいえ」が1つ かつ 「どちらともいえない」が1つの時
      else if ((noCnt >= 2) || ((noCnt == 1) && (vagueCnt == 1))){
        $('#a4').fadeIn();
      }
      // 「どちらともいえない」が2つ以上の時
      else if (vagueCnt >= 2) {
        $('#a5').fadeIn();
      }
    });
  
    //  診断を閉じる
    $('.close-btn, .tool-btn.finish').on('click', function () {
      $('.box').fadeOut("fast");
      $('.select, .btn-wrap, .box-wrap, .box').removeClass('is-inactive');
      $('.tool-btn.next').addClass('is-inactive');
    });
  
  });
  
  })(jQuery);