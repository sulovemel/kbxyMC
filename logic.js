class ElfCalculator{static Characters={孤僻:[1,1.1,0.9,1,1,1],固执:[1,1.1,1,0.9,1,1],调皮:[1,1.1,1,1,0.9,1],勇敢:[1,1.1,1,1,1,0.9],坦率:[1,1,1,1,1,1],大胆:[1,0.9,1.1,1,1,1],淘气:[1,1,1.1,0.9,1,1],无虑:[1,1,1.1,1,0.9,1],悠闲:[1,1,1.1,1,1,0.9],平静:[1,1,1,1,1,1],保守:[1,0.9,1,1.1,1,1],稳重:[1,1,0.9,1.1,1,1],马虎:[1,1,1,1.1,0.9,1],冷静:[1,1,1,1.1,1,0.9],认真:[1,1,1,1,1,1],沉着:[1,0.9,1,1,1.1,1],温顺:[1,1,0.9,1,1.1,1],慎重:[1,1,1,0.9,1.1,1],狂妄:[1,1,1,1,1.1,0.9],实干:[1,1,1,1,1,1],胆小:[1,0.9,1,1,1,1.1],急躁:[1,1,0.9,1,1,1.1],开朗:[1,1,1,0.9,1,1.1],天真:[1,1,1,1,0.9,1.1],浮躁:[1,1,1,1,1,1],极限:[1,1.1,1.1,1.1,1.1,1.1],};static AptitudeAdd=[2.5,8.5,14.5,22,28.5,31];static LevelCeiling=100;static createStats(value){return{strength:value||0,attack:value||0,defence:value||0,magic:value||0,resistance:value||0,speed:value||0,}}constructor(o){this.elf_data=o.elf_data;this.name=o.name||'圣光天尊';this.level=o.level||100;this.character=o.character||'孤僻';this.aptitude=o.aptitude||ElfCalculator.createStats(5);this.learningPower=o.learningPower||ElfCalculator.createStats()}calculatePowerValue(raceValue,aptitudeValue,learningPower,level,difference,characterMultiplier){return parseInt(((raceValue*2+aptitudeValue+learningPower/4)*(level/ElfCalculator.LevelCeiling)+difference)*characterMultiplier)}computingPowerValue(){const _o=Object.assign({},ElfCalculator.createStats(0));let index=0;for(const item of Object.keys(_o)){const powerValue=this.calculatePowerValue(this.elf_data[this.name][item],ElfCalculator.AptitudeAdd[this.aptitude[item]],this.learningPower[item],this.level,item==='strength'?this.level+10:5,ElfCalculator.Characters[this.character][index++]);_o[item]=powerValue}return _o}computingPowerMaxValue(){const _o=Object.assign({},ElfCalculator.createStats(0));let index=0;for(const item of Object.keys(_o)){const powerValue=this.calculatePowerValue(this.elf_data[this.name][item],ElfCalculator.AptitudeAdd[5],255,100,item==='strength'?110:5,ElfCalculator.Characters['极限'][index++]);_o[item]=powerValue}return _o}}const EC=new ElfCalculator({elf_data,aptitude:{strength:0,attack:1,defence:2,magic:3,resistance:4,speed:5,},});const input_learningPower=document.querySelectorAll('.xw');const select_aptitude=document.querySelectorAll('.aptitude');input_learningPower.forEach(element=>{element.addEventListener('change',e=>{const _that=e.target;const val=_that.value*1;EC.learningPower[_that.dataset.type]=val;const{strength,attack,defence,magic,resistance,speed}=EC.learningPower;const xwH=strength+attack+defence+magic+resistance+speed;if(xwH>510){_that.value=val-(xwH-510)<0?0:val-(xwH-510);EC.learningPower[_that.dataset.type]=_that.value*1;popupTips('各项修为值合计不得超过510，已自动修正！')}})});document.querySelector('.btn-clear-xw').addEventListener('click',()=>{input_learningPower.forEach(el=>(el.value=''));EC.learningPower=ElfCalculator.createStats()});document.querySelector('.btn-clear-ly').addEventListener('click',()=>{document.querySelectorAll('.jade').forEach(el=>(el.value=''))});document.querySelector('.btn-clear-zz').addEventListener('click',()=>{select_aptitude.forEach(el=>{el.value='5';el.className=`aptitude option-bg5`;});EC.aptitude=ElfCalculator.createStats(5)});document.querySelector('.level').addEventListener('change',function(){EC.level=this.value*1});select_aptitude.forEach(element=>{element.addEventListener('change',function(){const type=this.dataset.type;this.className=`aptitude option-bg${this.value}`;EC.aptitude[type]=this.value*1})});document.getElementById('character').addEventListener('change',e=>{const selectedValue=e.target.value;const element={0.9:"<span style='color: green'>0.9⬇</span>",1:'1',1.1:"<span style='color: red'>1.1⬆</span>",};document.querySelectorAll('.rabbet-character').forEach((item,index)=>{item.innerHTML=element[ElfCalculator.Characters[selectedValue][index]]});EC.character=selectedValue});const results=document.getElementById('results');document.getElementById('search-box').addEventListener('input',e=>{results.innerHTML='';let searchTerm=e.target.value.trim().toLowerCase();if(searchTerm==='')return;let keys=Object.keys(EC.elf_data);keys.forEach(key=>key.toLowerCase().includes(searchTerm)&&displayResult(key))});let currentController=null;let isElf=false;const elfImg=document.querySelector('.elf-img');function removeClassShow(){document.querySelector('.overlay').classList.add('show')}function displayResult(key){const resultItem=document.createElement('div');resultItem.className='result-item';resultItem.textContent=key;resultItem.onclick=e=>{if(EC.name===key){popupTips('已选择当前妖怪！');return}const element=document.querySelector('.on');if(element){element.classList.remove('on')}e.target.classList.add('on');EC.name=key;showDetails(key,EC.elf_data[key]);friendlyLink(key,EC.elf_data[key]);const clanUrl=url_data[key]?.c?'https://newsimg.5054399.com/uploads/userup'+url_data[key].c:'';const swfUrl=`./monsterswf/${key}.svg`;showPicture(isElf?swfUrl:clanUrl,removeClassShow,img=>{elfImg.src=img.src;elfImg.dataset.url=isElf?clanUrl:swfUrl;})};results.appendChild(resultItem)}function showDetails(key,elf){document.querySelector('.elfName').innerHTML=key;document.querySelectorAll('.rabbet-race').forEach(item=>{item.innerHTML=elf[item.dataset.type]})}function loadImage(src,signal){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src;signal.addEventListener('abort',()=>{img.onload=null;img.onerror=null;reject(new DOMException('图像加载被中断','AbortError'))})})}async function showPicture(url,startFn,endFn){startFn();if(currentController){currentController.abort()}currentController=new AbortController();try{const img=await loadImage(url,currentController.signal);endFn(img)}catch(error){if(error.name==='AbortError'){popupTips('图像加载被中断！')}else{popupTips('图像加载失败！');document.querySelector('.overlay').classList.remove('show')}}}const exhibition=document.querySelector('.exhibition');exhibition.addEventListener('click',()=>{exhibition.classList.add('hidden')});elfImg.addEventListener('load',function(){document.querySelector('.overlay').classList.remove('show')});elfImg.addEventListener('error',()=>{document.querySelector('.overlay').classList.remove('show');popupTips('图片加载失败！')});elfImg.addEventListener('click',function(e){exhibition.innerHTML=`<img class="position-center"src="${this.src}"alt="elf"/>`;exhibition.classList.remove('hidden')});document.querySelector('.toggle-img-src').addEventListener('click',()=>{const src=elfImg.src;const url=elfImg.dataset.url;if(!url){popupTips('该图片不存在');return}showPicture(url,removeClassShow,img=>{elfImg.src=img.src;elfImg.dataset.url=src;isElf=!isElf})});function friendlyLink(key,elf){const url=url_data[key];let str=url?.p?`妖怪详情链接：<a target="_blank"href="https://news.4399.com${url.p}"title="来源：4399卡布西游">${key}</a>`:'';let content=elf.msg?`&nbsp;&nbsp;友情链接：<a target="_blank"href="https://www.bilibili.com/read/${elf.msg}"title="来源：浩爱，bilibili UID：18218735">${key}解析</a>`:'';document.querySelector('.msg').innerHTML=str+content}document.querySelector('.compute').addEventListener('click',()=>{const _o=EC.computingPowerValue();const jades={};let count=0;document.querySelectorAll('.jade').forEach(item=>{jades[item.dataset.type]=item.value*1;if(item.value*1>0)count++});if(count>4){return popupTips('最多只能输入4条灵玉数据！')}document.querySelectorAll('.rabbet-capacity').forEach(item=>{item.innerHTML=`<span class="${jades[item.dataset.type] === 0 ? 'limit' : 'em'}">${_o[item.dataset.type]+jades[item.dataset.type]}</span>`})});document.querySelector('.compute-max').addEventListener('click',()=>{const _o=EC.computingPowerMaxValue();const{attack,defence,magic,resistance,speed,strength}=_o;exhibition.innerHTML=`<div class="position-center"><div><span>${EC.name}&nbsp;</span>的各项极限能力值</div><div>体力：<span>${50+strength}</span></div><div>攻击：<span>${30+attack}</span></div><div>防御：<span>${30+defence}</span></div><div>法术：<span>${30+magic}</span></div><div>抗性：<span>${30+resistance}</span></div><div>速度：<span>${30+speed}</span></div><hr class="hr-space-square"/><p>PS：极限能力值是妖怪在100级、资质为蓝五星、各项修为满255、性格加成为1.1（体力为1）、且附带最高属性灵玉时计算出的数值。（体力上限50，其他属性上限30）</p></div>`;exhibition.classList.remove('hidden')});
