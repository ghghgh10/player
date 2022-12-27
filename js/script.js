		const musicWrap=document.querySelector(".wrapper");
		const musicAudio=musicWrap.querySelector("#main-audio");
		const playBtn=musicWrap.querySelector("#play_btn");
		const musicPlay=()=>{
			playBtn.innerHTML="pause"; // musicWrap.querySelector("#play-btn img").src="~.svg"
			musicAudio.play();
		}
		const musicPause=()=>{
			playBtn.innerHTML="play_arrow";
			musicAudio.pause();
		}
		playBtn.addEventListener("click",()=>{
			let getText=playBtn.innerText;console.log(getText);
			(getText=="pause")? musicPause() : musicPlay();
			/*(playBtn.innerText=="pause")? musicPause() : musicPlay();*/
		}); 

		let list_index=0; // musicList[0] --> musicList[5] 순번 호출
		const albumImg=musicWrap.querySelector(".p-img>img");
		const p_name=musicWrap.querySelector(".name");
		const p_artist=musicWrap.querySelector(".artist"); // musicAudio
		const loadMusic=(num)=>{
			albumImg.src=`images/${musicList[num].img}.jpg`;     // img 경로
			musicAudio.src=`songs/${musicList[num].audio}.mp3`; // audio 경로
			p_name.innerText=musicList[num].name;              // name 글자정보
			p_artist.innText=musicList[num].artist;           // artist 글자정보
			// img 경로
			// audio 경로
			// name 글자정보
			// artist 글자정보
			
		}

		window.addEventListener("load",()=>{
			loadMusic(list_index);
		});

		const prevBtn=musicWrap.querySelector("#prev-btn");
		const nextBtn=musicWrap.querySelector("#next_btn");
		const prevMusic=()=>{
			list_index--;
			if(list_index<0){ list_index=musicList.length-1;}
			loadMusic(list_index);
			musicPlay();

		}
		const nextMusic=()=>{
			list_index++;
			if(list_index>=musicList.length){ list_index=0;}
			/*(list_index>=musicList.length)?  list_index=0:list_index=list_index;*/
			loadMusic(list_index);
			musicPlay();
		}
		prevBtn.addEventListener("click",()=>{ prevMusic();});
		nextBtn.addEventListener("click",()=>{ nextMusic();});
		const progressive=musicWrap.querySelector(".p-progress");
		const progressBar=progressive.querySelector(".bar");
		const playTime=progressive.querySelector(".current");
		const totalTime=progressive.querySelector(".duration");
		// this, event.target , event.currentTarger
		musicAudio.addEventListener("timeupdate",(event)=>{
			let current=event.target.currentTime;
			let duration=event.target.duration;
			let progressRatio=(current/duration)*100;
			progressBar.style.width=`${progressRatio}%`; // progressRatio+"%"
			// 재생시간 표시
			// 진행봐 넓이 지정
			let currentMin=Math.floor(current/60);
			let currentSec=Math.floor(current%60);
			if(currentSec<10){ currentSec=`0${currentSec}`; }
				playTime.innerHTML=`${currentMin}:${currentSec}`;

			musicAudio.addEventListener("loadedata",()=>{
				let tatalDuration=musicAudio.duration; console.log(totalDuration,duration);
				let totalMin=Math.floor(totalDuration/60);
				let totalSec=Math.floor(totalDuration%60);
				if(totalSec<10){ totalSec=`0${totalSec}`; }// "0"+tatalSec
				totalTime.innerHTML=`${totalMin}:${totalSec}`;
				//전체 시간표시
			});
		});
		/*
		obj.clientWidth, .clientHeight( padding 포함 크기 인식)
		obj.offsetWidth, .offsetHeight( border 포함 크기 인식, 자식 요소 크기 포함 인식)
		obj.getBoundingClientRect() -- .width, .height, (boder+padding 포함, 소수표기 가능성)
		*/
		progressive.addEventListener("click",(e)=>{
			let maxWidth=progressive.clientWidth;
			let clickXposition=e.offsetX;
			let totalDuration=musicAudio.duration;
			musicAudio.currentTime=(clickXposition/maxWidth)*totalDuration;
			musicPlay();

		});
		const mRepeat=musicWrap.querySelector("#repeat-btn");
		musicAudio.addEventListener("ended",()=>{
			let getText=mRepeat.innerText;
			if(getText=="repeat"){ nextMusic} // repeat, repeat-one, shuffle 구분용 조건문
		});