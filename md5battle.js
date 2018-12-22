var Name          = 0;
var AP  = 1; //attack point
var DP  = 2; //defense Point
var HP  = 3; //health point
var SP  = 4; //speed point
var LP  = 5; //luck point
var Profession    = 6;
var Ability       = 7;
var HTMLColor     = 8;

player1 = document.getElementById('name_1');
player2 = document.getElementById('name_2');

var stats1 = [];
var stats2 = [];

player1.onchange = function(){
  stats1 = statsgenerate(this.value);
  this.style.color = stats1[HTMLColor];
  document.getElementById('output_stats1').style.color = stats1[HTMLColor];
  document.getElementById('output_stats1').value =
  '공격력:'+stats1[AP]+ ' / 방어력:'+stats1[DP]+' / HP:'+stats1[HP]+
  ' / 스피드'+stats1[SP]+' / 운:'+stats1[LP]+' / 직업:'+' / 능력:';
}

player2.onchange = function(){
  stats2 = statsgenerate(this.value);
  this.style.color = stats2[HTMLColor];
  document.getElementById('output_stats2').style.color = stats2[HTMLColor];
  document.getElementById('output_stats2').value =
  '공격력:'+stats2[AP]+ ' / 방어력:'+stats2[DP]+' / HP:'+stats2[HP]+
  ' / 스피드'+stats1[SP]+' / 운:'+stats2[LP]+' / 직업:'+' / 능력:';
}

function statsgenerate(name){
  var string = CryptoJS.SHA256(name).toString();
  var stats = [];

  stats[Name] = name;
  for(var i=1;i<32;i++){
    stats[i] = parseInt(string[i*2]+string[i*2+1],16);
  }

  stats[HTMLColor] = '#';
  for(var i=0;i<3;i++){
    stats[HTMLColor] += (string[HTMLColor+i*2] + string[HTMLColor+i*2+1]);
  }

  return stats;
}
document.getElementById('battle_start').onclick = function(){
  battle(stats1,stats2);
}

function battle(stats1,stats2){
  var text = document.getElementById('result');
  if(stats1.length == 0 || stats2.lengh == 0){
    text.value = '용사의 이름을 넣어주세요.\n';
    return;
  }
  text.value = '배틀을 시작합니다!\n';
  while(true){
    if(stats1[SP]>stats2[SP]){
      if(round(stats1,stats2,text)){break;}
    }else{
      if(round(stats2,stats1,text)){break;}
    }
  }
}

function round(first,second,text){
  var damage_1 = Math.floor(first[AP]/4);
  var damage_2 = Math.floor(second[AP]/4);

  second[HP] -= damage_1;
  text.value += first[Name] + '의 공격!'+damage_1.toString()+'의 데미지!\n';
  if(second[HP]<=0){
    text.value += first[Name] + '의 승리!\n';
    return true;
  }

  first[HP] -= damage_2;
  text.value += second[Name] + '의 공격!'+damage_2.toString()+'의 데미지!\n';
  if(first[HP]<=0){
    text.value += second[Name] + '의 승리!\n';
    return true;
  }

  text.value += '남은 체력 : '
  +first[Name]+'='+first[HP].toString()
  +' / '+second[Name]+'='+second[HP].toString()+'\n\n';
  return false;
}
